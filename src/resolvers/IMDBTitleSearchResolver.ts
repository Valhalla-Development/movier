import { type CheerioAPI, load as loadCheerio } from "cheerio";
import { IMDB_TITLE_SEARCH_URL } from "../constants";
import type { IFoundedTitleDetails, ITitleSearchResolver } from "../interfaces";
import { Source, TitleMainType } from "../literals";
import { getRequest } from "../requestClient";
import type { SearchTitleByNameOptions } from "../titleSearcher";
import { convertIMDBPathToIMDBUrl } from "../utils/convertIMDBPathToIMDBUrl";
import { convertIMDBTitleIdToUrl } from "../utils/convertIMDBTitleIdToUrl";
import { extractIMDBIdFromUrl } from "../utils/extractIMDBIdFromUrl";
import { extractNextDataFromHTML } from "../utils/extractNextDataFromHTML";
import { formatHTMLText } from "../utils/formatHTMLText";
import { ResolverCacheManager } from "../utils/ResolverCacheManager";

export class IMDBTitleSearchResolver implements ITitleSearchResolver {
    private readonly queryName: string;
    private readonly exactMatch: boolean;
    private readonly specificType?: TitleMainType;
    private searchPageHTMLData!: string;
    private searchPageNextData?: TitleSearchNextData;

    private readonly resolverCacheManager = new ResolverCacheManager();

    // cheerio instances
    private searchPageCheerio!: CheerioAPI;

    constructor(
        queryName: string,
        { exactMatch = false, specificType }: Omit<SearchTitleByNameOptions, "sourceType"> = {}
    ) {
        this.queryName = queryName;
        this.exactMatch = exactMatch;
        this.specificType = specificType;
    }

    async getResult(): Promise<IFoundedTitleDetails[]> {
        await this.loadSearchPageHTMLData();
        const allTypesResultList = this.originalResultList;

        // do sort and filters
        const finalResult = allTypesResultList
            .filter((i) =>
                //  filter specific types
                this.specificType ? i.titleType === this.specificType : true
            )
            .sort((a, b) => b.matchScore - a.matchScore);

        return finalResult;
    }

    async loadSearchPageHTMLData() {
        const { nameWithoutYear } = this.nameWithoutYearAndRequestedYearFromQuery;
        // getting result from imdb page by http request
        const result = await getRequest(IMDB_TITLE_SEARCH_URL, {
            q: nameWithoutYear,
            exact: this.exactMatch,
            s: "tt",
            ref: "fn_tt_ex",
        });

        // parse page content for jquery like
        this.searchPageHTMLData = result.data;
        this.searchPageCheerio = loadCheerio(this.searchPageHTMLData);
        this.searchPageNextData = extractNextDataFromHTML<TitleSearchNextData>(
            this.searchPageHTMLData
        );
    }

    get nameWithoutYearAndRequestedYearFromQuery(): {
        nameWithoutYear: string;
        requestedYear: number | null;
    } {
        const cacheDataManager = this.resolverCacheManager.load(
            "getNameWithoutYearAndRequestedYearFromQuery"
        );
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as {
                nameWithoutYear: string;
                requestedYear: number | null;
            };
        }
        const queryName = this.queryName;
        const nameExecDetails = /^(.{1,150})\s(\d{4})\s*$/.exec(queryName);
        let nameWithoutYear: string,
            requestedYear: number | null = null;
        nameWithoutYear = queryName;
        if (Array.isArray(nameExecDetails)) {
            nameWithoutYear = nameExecDetails[1];
            requestedYear = Number(nameExecDetails[2]);
        }
        return { nameWithoutYear, requestedYear };
    }

    get originalResultList(): IFoundedTitleDetails[] {
        const nextDataResults = this.originalResultListFromNextData;
        if (nextDataResults?.length) {
            return nextDataResults;
        }
        const $ = this.searchPageCheerio;
        const isType1 = !!$("[data-testid='find-results-section-title']")
            .first()
            .find(".find-title-result").length;
        if (isType1) {
            return this.originalResultListType1;
        }
        return this.originalResultListType2;
    }

    get originalResultListFromNextData(): IFoundedTitleDetails[] {
        const cacheDataManager = this.resolverCacheManager.load("originalResultListFromNextData");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IFoundedTitleDetails[];
        }
        const results = this.searchPageNextData?.props?.pageProps?.titleResults?.results;
        if (!(Array.isArray(results) && results.length)) {
            return [];
        }
        const { nameWithoutYear, requestedYear } = this.nameWithoutYearAndRequestedYearFromQuery;
        const mappedResults = results
            .map((result, index) =>
                this.convertNextDataResultToFoundedDetails(
                    result,
                    index,
                    nameWithoutYear,
                    requestedYear
                )
            )
            .filter(Boolean) as IFoundedTitleDetails[];
        if (!mappedResults.length) {
            return [];
        }
        return cacheDataManager.cacheAndReturnData(mappedResults.slice(0, 25));
    }

    get originalResultListType1(): IFoundedTitleDetails[] {
        const moviesList: IFoundedTitleDetails[] = [];
        const { nameWithoutYear, requestedYear } = this.nameWithoutYearAndRequestedYearFromQuery;
        const $ = this.searchPageCheerio;
        const queryName = this.queryName;

        // find rows of result (jquery like) and push it with proper format to result list
        $("[data-testid='find-results-section-title']")
            .first()
            .find(".find-title-result")
            .each(function (index) {
                // exclude vars from result row
                const $this = $(this);
                const name = formatHTMLText(
                    $this.find(".ipc-metadata-list-summary-item__t").text()
                );
                const aka = index === 0 ? queryName : "";
                const desc = formatHTMLText(
                    $this.find(".ipc-metadata-list-summary-item__tl").text()
                );
                let titleType = TitleMainType.Movie;
                if (/.*episode.*\s*$/i.test(desc)) {
                    titleType = TitleMainType.SeriesEpisode;
                } else if (/.*series.*\s*$/i.test(desc)) {
                    titleType = TitleMainType.Series;
                }
                const titleYear = Number(
                    /-(\d{4})/.exec(desc)?.[1] || /(\d{4})/.exec(desc)?.[1] || ""
                );
                const url = convertIMDBPathToIMDBUrl($this.find("a").first().attr("href"));

                // calculate match score - for sorting results
                let matchScore = 0;
                if (index < 4) {
                    matchScore += 6 - index * 2;
                }
                if (name === nameWithoutYear || aka === nameWithoutYear) {
                    matchScore += 4;
                }
                if (titleYear && requestedYear === titleYear) {
                    matchScore += 4;
                }
                if ([TitleMainType.Movie, TitleMainType.Series].includes(titleType)) {
                    matchScore += 3;
                }

                // push to the final list
                moviesList.push({
                    source: {
                        sourceId: extractIMDBIdFromUrl(url, "tt"),
                        sourceType: Source.IMDB,
                        sourceUrl: url,
                    },
                    name,
                    aka,
                    titleYear,
                    url,
                    titleType,
                    matchScore,
                    thumbnailImageUrl: $this.find("img.ipc-image").first().attr("src") ?? "",
                });
            });

        return moviesList.slice(0, 25);
    }

    get originalResultListType2(): IFoundedTitleDetails[] {
        const moviesList: IFoundedTitleDetails[] = [];
        const { nameWithoutYear, requestedYear } = this.nameWithoutYearAndRequestedYearFromQuery;
        const $ = this.searchPageCheerio;

        // find rows of result (jquery like) and push it with proper format to result list
        $("table.findList")
            .first()
            .find("tr")
            .each(function (index) {
                // exclude vars from result row
                const $this = $(this);
                const $movieTexts = $this.find("td:eq(1)");
                const text = formatHTMLText($movieTexts.text());
                const name = formatHTMLText($movieTexts.find("a").text());
                const aka = formatHTMLText(/aka\s"(.+)"/.exec(text)?.[1]);
                let titleType = TitleMainType.Movie;
                if (/(.*episode.*)\s*$/i.test(text)) {
                    titleType = TitleMainType.SeriesEpisode;
                } else if (/(.*series.*)\s*$/i.test(text)) {
                    titleType = TitleMainType.Series;
                }
                const titleYear = Number(/(\d{4})/.exec(text)?.[1] || "");
                const url = convertIMDBPathToIMDBUrl($movieTexts.find("a").attr("href"));

                // calculate match score - for sorting results
                let matchScore = 0;
                if (index < 4) {
                    matchScore += 6 - index * 2;
                }
                if (name === nameWithoutYear || aka === nameWithoutYear) {
                    matchScore += 4;
                }
                if (titleYear && requestedYear === titleYear) {
                    matchScore += 4;
                }
                if ([TitleMainType.Movie, TitleMainType.Series].includes(titleType)) {
                    matchScore += 3;
                }

                // push to the final list
                moviesList.push({
                    source: {
                        sourceId: extractIMDBIdFromUrl(url, "tt"),
                        sourceType: Source.IMDB,
                        sourceUrl: url,
                    },
                    name,
                    aka,
                    titleYear,
                    url,
                    titleType,
                    matchScore,
                    thumbnailImageUrl: $this.find("td").eq(0).find("img").first().attr("src") ?? "",
                });
            });

        return moviesList.slice(0, 25);
    }

    private convertNextDataResultToFoundedDetails(
        result: TitleSearchNextDataResult,
        index: number,
        nameWithoutYear: string,
        requestedYear: number | null
    ): IFoundedTitleDetails | undefined {
        const listItem = result.listItem;
        if (!listItem) {
            return;
        }
        const titleId = listItem.titleId ?? result.index ?? "";
        if (!titleId) {
            return;
        }
        const url = convertIMDBTitleIdToUrl(titleId);
        const displayName = formatHTMLText(listItem.titleText ?? listItem.originalTitleText ?? "");
        const akaText = formatHTMLText(listItem.originalTitleText ?? "");
        const aka = akaText !== displayName ? akaText : "";
        const releaseYear = listItem.releaseYear ?? listItem.releaseDate?.year;
        const titleYear = releaseYear ?? 0;
        let matchScore = Math.max(1, 20 - index);
        const normalizedName = nameWithoutYear.toLowerCase();
        if (displayName.toLowerCase() === normalizedName || aka.toLowerCase() === normalizedName) {
            matchScore += 4;
        }
        if (releaseYear && requestedYear === releaseYear) {
            matchScore += 4;
        }
        const titleType = this.mapTitleTypeIdToEnum(listItem.titleType?.id);
        if ([TitleMainType.Movie, TitleMainType.Series].includes(titleType)) {
            matchScore += 3;
        }
        return {
            source: {
                sourceId: titleId,
                sourceType: Source.IMDB,
                sourceUrl: url,
            },
            name: displayName,
            aka,
            titleYear,
            url,
            titleType,
            matchScore,
            thumbnailImageUrl: listItem.primaryImage?.url ?? "",
        };
    }

    private mapTitleTypeIdToEnum(titleTypeId?: string): TitleMainType {
        switch (titleTypeId) {
            case "tvSeries":
                return TitleMainType.Series;
            case "tvEpisode":
                return TitleMainType.SeriesEpisode;
            case "tvSpecial":
                return TitleMainType.TVSpecial;
            case "tvShort":
                return TitleMainType.TVShort;
            case "tvMovie":
                return TitleMainType.TVMovie;
            case "video":
                return TitleMainType.Video;
            default:
                return TitleMainType.Movie;
        }
    }
}

type TitleSearchNextData = {
    props?: {
        pageProps?: {
            titleResults?: {
                results?: TitleSearchNextDataResult[];
            };
        };
    };
};

type TitleSearchNextDataResult = {
    index?: string;
    listItem?: {
        titleId?: string;
        titleText?: string;
        originalTitleText?: string;
        releaseYear?: number;
        releaseDate?: {
            year?: number;
        };
        titleType?: {
            id?: string;
        };
        primaryImage?: {
            url?: string;
        };
    };
};
