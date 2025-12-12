import { type Cheerio, type CheerioAPI, type Element, load as loadCheerio } from "cheerio";
import dayjs from "dayjs";
import type { PersonApiDetailsInterface } from "../externalInterfaces/IMDBPersonApiDetailsInterface";
import type { PersonDetailsNextData } from "../externalInterfaces/IMDBPersonNextDataInterface";
import { personDetailsQuery } from "../gql/personDetailsQuery";
import type {
    IFilmographyItem,
    IImageDetails,
    IKnownForItem,
    IPerson,
    IPersonalDetailItem,
    IPersonDetailsResolver,
    ISourceDetails,
} from "../interfaces";
import { IMDBPathType, ImageType, Language, Source, TitleMainType } from "../literals";
import { getRequest, graphqlRequest } from "../requestClient";
import { convertIMDBPathToIMDBUrl } from "../utils/convertIMDBPathToIMDBUrl";
import { convertIMDBTitleIdToUrl } from "../utils/convertIMDBTitleIdToUrl";
import { extractIMDBIdFromUrl } from "../utils/extractIMDBIdFromUrl";
import { extractNextDataFromHTML } from "../utils/extractNextDataFromHTML";
import { formatHTMLText } from "../utils/formatHTMLText";
import { getIMDBFullSizeImageFromThumbnailUrl } from "../utils/getIMDBFullSizeImageFromThumbnailUrl";
import { ResolverCacheManager } from "../utils/ResolverCacheManager";

export class IMDBPersonDetailsResolver implements IPersonDetailsResolver {
    private readonly url: string;
    private readonly resolverCacheManager = new ResolverCacheManager();
    private mediaIndexNextData?: MediaIndexNextData;

    // cheerio loaded instances
    private mainPageCheerio!: CheerioAPI;
    private mediaIndexPageCheerio!: CheerioAPI;

    private mainPageNextData: PersonDetailsNextData = {};
    private personApiDetails: PersonApiDetailsInterface = {};

    constructor(url: string) {
        this.url = url;
    }

    async getDetails(): Promise<IPerson | undefined> {
        await Promise.all([
            this.getMainPageHTMLData(),
            this.getPersonDetailsFromApi(),
            this.getMediaIndexPageHTMLData(),
        ]);
        return this.generateReturnDetailsData();
    }

    async getMainPageHTMLData() {
        const apiResult = await getRequest(this.url);
        this.mainPageHTMLData = apiResult.data;
        this.mainPageCheerio = loadCheerio(apiResult.data);
        const nextDataString = this.mainPageCheerio("#__NEXT_DATA__")?.html()?.trim() || "{}";

        this.mainPageNextData = JSON.parse(nextDataString);
    }

    async getMediaIndexPageHTMLData() {
        const url = this.addToPathOfUrl(this.url, "/mediaindex");
        const apiResult = await getRequest(url);
        this.mediaIndexPageHTMLData = apiResult.data;
        this.mediaIndexPageCheerio = loadCheerio(apiResult.data);
        this.mediaIndexNextData = extractNextDataFromHTML<MediaIndexNextData>(apiResult.data);
    }

    async getPersonDetailsFromApi() {
        const apiResult = await graphqlRequest(personDetailsQuery, {
            id: this.sourceId,
        });
        this.personApiDetails = apiResult as PersonApiDetailsInterface;
    }

    addToPathOfUrl(
        originalPath: string,
        joinPath: string,
        query: { [key: string]: string } = {}
    ): string {
        const urlInstance = new URL(originalPath);
        urlInstance.pathname = urlInstance.pathname.replace(/\/$/, "") + joinPath;
        for (const key of Object.keys(query)) {
            urlInstance.searchParams.set(key, query[key]);
        }
        return urlInstance.href;
    }

    generateReturnDetailsData(): IPerson | undefined {
        const result: IPerson = {
            detailsLang: Language.English,
            mainSource: this.mainSourceDetails,
            name: this.name,
            miniBio: this.miniBio,
            knownFor: this.knownFor,
            filmography: this.filmography,
            profileImage: this.profileImage,
            allImages: this.allImages,
            personalDetails: this.personalDetails,
            birthDate: this.birthDate,
            birthPlace: this.birthPlace,
            deathDate: this.deathDate,
            deathPlace: this.deathPlace,
        };
        return result;
    }

    get mainSourceDetails(): ISourceDetails {
        const cacheDataManager = this.resolverCacheManager.load("mainSourceDetails");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as ISourceDetails;
        }
        return cacheDataManager.cacheAndReturnData({
            sourceId: this.sourceId,
            sourceType: Source.IMDB,
            sourceUrl: this.url,
        });
    }

    get sourceId(): string {
        const cacheDataManager = this.resolverCacheManager.load("sourceId");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as string;
        }
        return cacheDataManager.cacheAndReturnData(extractIMDBIdFromUrl(this.url, "nm"));
    }

    get name(): string {
        const cacheDataManager = this.resolverCacheManager.load("name");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as string;
        }
        const name = formatHTMLText(
            this.mainPageNextData.props?.pageProps?.aboveTheFold?.nameText?.text
        );

        return cacheDataManager.cacheAndReturnData(name);
    }

    get miniBio(): string[] {
        const cacheDataManager = this.resolverCacheManager.load("miniBio");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as string[];
        }
        const miniBioFullText = this.personApiDetails.name?.bio?.text?.plainText ?? "";
        const miniBioParts = miniBioFullText.split("\n").filter(Boolean);

        return cacheDataManager.cacheAndReturnData(miniBioParts);
    }

    get knownFor(): IKnownForItem[] {
        const cacheDataManager = this.resolverCacheManager.load("knownFor");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IKnownForItem[];
        }

        const knownForItems: IKnownForItem[] = [];
        const $ = this.mainPageCheerio;
        const knownForContainerElements = $("[data-testid='nm_flmg_kwn_for'] .ipc-list-card--span");
        knownForContainerElements.each((_i, el) => {
            const years = $(el)
                .find(
                    ".ipc-primary-image-list-card__content-bottom .ipc-primary-image-list-card__secondary-text"
                )
                .text()
                .trim()
                .split(" ")[0]
                .split("–")
                .map(Number);
            const thumbnailImgEl = $(el).find("img").first();
            knownForItems.push({
                name: formatHTMLText(
                    $(el).find(".ipc-primary-image-list-card__title").first().text()
                ),
                role: formatHTMLText(
                    $(el)
                        .find(
                            ".ipc-primary-image-list-card__content-mid-bottom .ipc-primary-image-list-card__secondary-text"
                        )
                        .first()
                        .text()
                ),
                startYear: years[0],
                endYear: years[1] ?? years[0],
                posterImage: this.extractImageFullDetailsFromImgElement(thumbnailImgEl),
                source: this.extractSourceDetailsFromAElement(
                    $(el).find("a.ipc-lockup-overlay").first(),
                    "tt"
                ),
            });
        });

        return cacheDataManager.cacheAndReturnData(knownForItems);
    }

    extractImageFullDetailsFromImgElement(
        thumbnailImgEl: Cheerio<Element>,
        type = ImageType.Poster
    ): IImageDetails {
        const thumbnailUrl = thumbnailImgEl.attr("src");

        return {
            isThumbnail: false,
            sourceType: Source.IMDB,
            title: thumbnailImgEl.attr("alt") ?? "",
            type,
            url: getIMDBFullSizeImageFromThumbnailUrl(thumbnailUrl),
            thumbnails: [
                {
                    isThumbnail: true,
                    sourceType: Source.IMDB,
                    title: thumbnailImgEl.attr("alt") ?? "",
                    type,
                    url: thumbnailUrl ?? "",
                    size: {
                        width: Number(thumbnailImgEl.attr("width")) || 0,
                        height: Number(thumbnailImgEl.attr("height")) || 0,
                    },
                },
            ],
        };
    }

    extractSourceDetailsFromAElement(
        aElement: Cheerio<Element>,
        sourceIdPrefix: string
    ): ISourceDetails {
        const sourceUrl = convertIMDBPathToIMDBUrl(aElement.attr("href"));
        return {
            sourceType: Source.IMDB,
            sourceUrl,
            sourceId: extractIMDBIdFromUrl(sourceUrl, sourceIdPrefix),
        };
    }

    get filmography(): IFilmographyItem[] {
        const cacheDataManager = this.resolverCacheManager.load("filmography");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IFilmographyItem[];
        }

        let filmographyItems: IFilmographyItem[] = [];
        filmographyItems =
            this.personApiDetails?.name?.credits?.edges?.map((credit): IFilmographyItem => {
                const startYear =
                    credit.node?.episodeCredits?.yearRange?.year ??
                    credit.node?.title?.releaseYear?.year ??
                    0;
                return {
                    category: credit.node?.category?.text?.toLocaleLowerCase() ?? "",
                    endYear: credit.node?.episodeCredits?.yearRange?.endYear ?? startYear,
                    name: credit.node?.title?.originalTitleText?.text ?? "",
                    productionStatus:
                        credit.node?.title?.productionStatus?.currentProductionStage?.id ?? "",
                    roles: credit.node?.characters?.map((i) => i.name ?? "") ?? [],
                    source: {
                        sourceId: credit.node?.title?.id ?? "",
                        sourceType: Source.IMDB,
                        sourceUrl: convertIMDBTitleIdToUrl(
                            credit.node?.title?.id ?? "",
                            IMDBPathType.Title
                        ),
                    },
                    startYear,
                    type: TitleMainType.Movie,
                };
            }) ?? [];

        return cacheDataManager.cacheAndReturnData(filmographyItems);
    }

    get profileImage(): IImageDetails | undefined {
        const cacheDataManager = this.resolverCacheManager.load("profileImage");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IImageDetails;
        }

        const primaryImage = this.personApiDetails.name?.primaryImage;
        const imageDetails = {
            isThumbnail: false,
            sourceType: Source.IMDB,
            title: primaryImage?.caption?.plainText ?? "",
            type: ImageType.Poster,
            url: primaryImage?.url ?? "",
            thumbnails: [],
        };

        return cacheDataManager.cacheAndReturnData(imageDetails);
    }

    get allImages(): IImageDetails[] {
        const cacheDataManager = this.resolverCacheManager.load("allImages");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IImageDetails[];
        }
        const imagesFromNextData = this.getImagesFromMediaIndexNextData();
        if (imagesFromNextData.length) {
            return cacheDataManager.cacheAndReturnData(imagesFromNextData);
        }
        const $ = this.mediaIndexPageCheerio;
        const images: IImageDetails[] = [];
        $(".image-item-wrapper img.ipc-image").each((_i, el) => {
            images.push(this.extractImageFullDetailsFromImgElement($(el), ImageType.Other));
        });

        return cacheDataManager.cacheAndReturnData(images);
    }

    private getImagesFromMediaIndexNextData(): IImageDetails[] {
        const edges =
            this.mediaIndexNextData?.props?.pageProps?.contentData?.data?.name?.all_images?.edges;
        if (!(Array.isArray(edges) && edges.length)) {
            return [];
        }
        return edges
            .map((edge) => edge.node)
            .filter((node): node is MediaIndexImageNode => !!node?.url)
            .map((node) => this.createImageDetailsFromMediaIndexNode(node));
    }

    private createImageDetailsFromMediaIndexNode(node: MediaIndexImageNode): IImageDetails {
        const title = node.caption?.plainText ?? "";
        const size =
            node.width && node.height
                ? {
                      width: node.width,
                      height: node.height,
                  }
                : undefined;
        const thumbnail: IImageDetails = {
            isThumbnail: true,
            sourceType: Source.IMDB,
            title,
            type: ImageType.Other,
            url: node.url,
            size,
        };
        return {
            isThumbnail: false,
            sourceType: Source.IMDB,
            title,
            type: ImageType.Other,
            url: node.url,
            size,
            thumbnails: [thumbnail],
        };
    }

    get personalDetails(): IPersonalDetailItem[] {
        const cacheDataManager = this.resolverCacheManager.load("personalDetails");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IPersonalDetailItem[];
        }
        const rawPersonalDetails: IPersonalDetailItem[] = [];

        rawPersonalDetails.push({
            title: "age",
            details: this.personApiDetails.name?.age?.text ?? "",
            relatedSources: [],
        });
        rawPersonalDetails.push({
            title: "deathCause",
            details: this.personApiDetails.name?.deathCause?.text ?? "",
            relatedSources: [],
        });
        rawPersonalDetails.push({
            title: "height",
            details: this.personApiDetails.name?.height?.measurement?.value ?? "",
            relatedSources: [],
        });
        rawPersonalDetails.push({
            title: "height",
            details: this.personApiDetails.name?.nickNames?.map((i) => i.text).join(",") ?? "",
            relatedSources: [],
        });

        const personDetails = rawPersonalDetails.filter((i) => i.details);

        return cacheDataManager.cacheAndReturnData(personDetails);
    }

    get birthDate(): Date | undefined {
        const cacheDataManager = this.resolverCacheManager.load("birthDate");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as Date;
        }
        const birthDateRaw =
            this.mainPageNextData?.props?.pageProps?.mainColumnData?.birthDate?.dateComponents;
        const birthDate = dayjs(
            `${birthDateRaw?.year}-${birthDateRaw?.month}-${birthDateRaw?.day}`,
            "YYYY-M-D"
        ).toDate();
        return cacheDataManager.cacheAndReturnData(birthDate);
    }

    get birthPlace(): string | undefined {
        const cacheDataManager = this.resolverCacheManager.load("birthPlace");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as string;
        }
        const birthPlace =
            this.mainPageNextData?.props?.pageProps?.mainColumnData?.birthLocation?.text ?? "";
        return birthPlace.length
            ? cacheDataManager.cacheAndReturnData(formatHTMLText(birthPlace))
            : undefined;
    }

    get deathDate(): Date | undefined {
        const cacheDataManager = this.resolverCacheManager.load("deathDate");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as Date;
        }
        const deathDateRaw =
            this.mainPageNextData?.props?.pageProps?.mainColumnData?.deathDate?.dateComponents;
        return deathDateRaw
            ? cacheDataManager.cacheAndReturnData(
                  dayjs(
                      `${deathDateRaw.year}-${deathDateRaw.month}-${deathDateRaw.day}`,
                      "YYYY-M-D"
                  ).toDate()
              )
            : undefined;
    }

    get deathPlace(): string | undefined {
        const cacheDataManager = this.resolverCacheManager.load("deathPlace");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as string;
        }
        const deathLocation =
            this.mainPageNextData?.props?.pageProps?.mainColumnData?.deathLocation?.text ?? "";
        return deathLocation.length
            ? cacheDataManager.cacheAndReturnData(formatHTMLText(deathLocation))
            : undefined;
    }
}

type MediaIndexNextData = {
    props?: {
        pageProps?: {
            contentData?: {
                data?: {
                    name?: {
                        all_images?: {
                            edges?: {
                                node?: MediaIndexImageNode;
                            }[];
                        };
                    };
                };
            };
        };
    };
};

type MediaIndexImageNode = {
    url: string;
    caption?: {
        plainText?: string;
    };
    width?: number;
    height?: number;
};
