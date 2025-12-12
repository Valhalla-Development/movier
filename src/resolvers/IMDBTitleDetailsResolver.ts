import { camelCase } from "change-case";
import dayjs from "dayjs";
import { AwardOutcome, Genre, IMDBPathType, Language, Source, TitleMainType } from "../enums";
import type { IMDBTitleApiRawData } from "../externalInterfaces/IMDBTitleApiRawData";
import { titleDetailsQuery } from "../gql/titleDetailsQuery";
import type {
    IAwardDetails,
    IAwardsSummaryDetails,
    IBoxOfficeDetails,
    ICastDetails,
    IDatesDetails,
    IImageDetails,
    IPersonDetails,
    IProductionCompanyDetails,
    IRateDetails,
    IReleaseDateDetails,
    IRuntimeDetails,
    ISourceDetails,
    ITitleGoofItem,
    ITitleQuoteItem,
} from "./../interfaces";
import type { ITitle, ITitleDetailsResolver } from "../interfaces";
import { graphqlRequest } from "../requestClient";
import { convertIMDBTitleIdToUrl } from "../utils/convertIMDBTitleIdToUrl";
import { extractIMDBIdFromUrl } from "../utils/extractIMDBIdFromUrl";

export class IMDBTitleDetailsResolver implements ITitleDetailsResolver {
    private readonly url: string;

    private titleApiRawData!: IMDBTitleApiRawData;

    constructor(url: string) {
        this.url = url;
    }

    async getDetails(): Promise<ITitle> {
        await this.getTitleRawDetails();

        return {
            detailsLang: Language.English,
            mainSource: this.mainSource,
            allSources: [this.mainSource],
            name: this.titleApiRawData.titleText.text,
            worldWideName: this.worldWideName,
            otherNames: this.otherNames,
            titleYear: this.titleApiRawData.releaseYear?.year ?? 0,
            genres: this.genres,
            directors: this.directors,
            writers: this.writers,
            producers: this.producers,
            mainRate: this.mainRate,
            plot: this.titleApiRawData.plot?.plotText?.plainText ?? "",
            casts: this.casts,
            allRates: this.allRates,
            dates: this.dates,
            boxOffice: this.boxOffice,
            productionCompanies: this.productionCompanies,
            taglines: this.taglines,
            runtime: this.runtime,
            keywords: this.keywords,
            awards: this.awards,
            awardsSummary: this.awardsSummary,
            quotes: this.quotes,
            goofs: this.goofs,
            allImages: this.allImages,
            languages: this.languages,
            mainType: this.mainType,
            posterImage: this.posterImage,
            countriesOfOrigin: this.countriesOfOrigin,
            allReleaseDates: this.allReleaseDates,
            ageCategoryTitle: this.ageCategoryTitle,
        };
    }

    async getTitleRawDetails() {
        const titleId = extractIMDBIdFromUrl(this.url, "tt");
        const rawData = await graphqlRequest(titleDetailsQuery, {
            titleId,
        });
        this.titleApiRawData = rawData.title;
    }

    extractSourceFromId(id: string): ISourceDetails {
        const idType = id.startsWith("tt") ? IMDBPathType.Title : IMDBPathType.Name;
        return {
            sourceId: id,
            sourceType: Source.IMDB,
            sourceUrl: convertIMDBTitleIdToUrl(id, idType),
        };
    }

    getEnumItemFromString<T extends object>(
        enumObject: T,
        value: string,
        defaultValue?: T
    ): T | undefined {
        const enumValues = Object.values(enumObject);

        return enumValues.includes(camelCase(value) as unknown as T)
            ? (camelCase(value) as unknown as T)
            : defaultValue;
    }

    get mainSource(): ISourceDetails {
        return this.extractSourceFromId(extractIMDBIdFromUrl(this.url, "tt"));
    }

    get worldWideName(): string {
        return (
            this.titleApiRawData.akas.edges
                .map((i) => i.node.text)
                .find((i) => i === "world-wide") ?? this.titleApiRawData.titleText.text
        );
    }

    get otherNames(): string[] {
        return this.titleApiRawData.akas.edges
            .map((i) => i.node.text)
            .filter((i, index, arr) => arr.indexOf(i) === index);
    }

    get genres(): Genre[] {
        return (this.titleApiRawData.genres?.genres
            .map((i) => this.getEnumItemFromString(Genre, i.text) as Genre | undefined)
            .filter(Boolean) ?? []) as Genre[];
    }

    get directors(): IPersonDetails[] {
        return this.titleApiRawData.directors.edges.map((i) => ({
            name: i.node.name?.nameText.text ?? "",
            source: this.extractSourceFromId(i.node.name?.id ?? ""),
            extraInfo: i.node.category?.text ?? "",
        }));
    }

    get writers(): IPersonDetails[] {
        return this.titleApiRawData.writers.edges.map((i) => ({
            name: i.node.name?.nameText.text ?? "",
            source: this.extractSourceFromId(i.node.name?.id ?? ""),
            extraInfo: i.node.category?.text ?? "",
        }));
    }

    get producers(): IPersonDetails[] {
        return this.titleApiRawData.producers.edges.map((i) => ({
            name: i.node.name?.nameText.text ?? "",
            source: this.extractSourceFromId(i.node.name?.id ?? ""),
            extraInfo: i.node.category?.text ?? "",
        }));
    }

    get mainRate(): IRateDetails {
        return {
            rate: this.titleApiRawData.ratingsSummary?.aggregateRating ?? 0,
            rateSource: Source.IMDB,
            votesCount: this.titleApiRawData.ratingsSummary?.voteCount ?? 0,
        };
    }

    get casts(): ICastDetails[] {
        const titleStartYear = this.titleApiRawData.releaseYear?.year ?? 0;
        return (
            this.titleApiRawData.casts.edges
                .map((i) => i.node)
                .map((castNode) => {
                    const rawStartYear = castNode.episodeCredits?.yearRange?.year ?? 0;
                    const normalizedStartYear =
                        rawStartYear && titleStartYear
                            ? Math.max(rawStartYear, titleStartYear)
                            : rawStartYear || titleStartYear || 0;
                    const endYear =
                        castNode.episodeCredits?.yearRange?.endYear ?? normalizedStartYear;
                    return {
                        name: castNode.name?.nameText.text ?? "",
                        roles:
                            castNode.characters?.map((character) => ({
                                name: character.name ?? "",
                            })) ?? [],
                        ...(castNode.episodeCredits && {
                            episodeCredits: {
                                endYear,
                                startYear: normalizedStartYear,
                                totalEpisodes: castNode.episodeCredits.total ?? 0,
                            },
                        }),
                        extraInfo: castNode.category?.text ?? "",
                        otherNames:
                            castNode.name?.akas.edges.map((akaEdge) => akaEdge.node.text) ?? [],
                        source: this.extractSourceFromId(castNode.name?.id ?? ""),
                        // thumbnailImageUrl TODO: add the image
                    };
                }) ?? []
        );
    }

    get dates(): IDatesDetails {
        const releaseDateData = this.titleApiRawData.releaseDate;
        const releaseDate = new Date(
            releaseDateData?.year ?? 0,
            (releaseDateData?.month ?? 1) - 1,
            releaseDateData?.day ?? 0
        );
        return {
            startCountry: releaseDateData?.country?.text ?? "",
            startDate: releaseDate,
            titleYear: this.titleApiRawData.releaseYear?.year ?? 0,
            endYear: this.titleApiRawData.releaseYear?.endYear,
            isEnded:
                !!this.titleApiRawData.titleType?.isSeries &&
                !!this.titleApiRawData.releaseYear?.endYear,
            startYear: this.titleApiRawData.releaseYear?.year ?? 0,
        };
    }

    get boxOffice(): IBoxOfficeDetails {
        return {
            budget: this.titleApiRawData.productionBudget?.budget?.amount ?? 0,
            mainCountries: {
                amount: this.titleApiRawData.rankedLifetimeGross?.total?.amount ?? 0,
                countries: [], //TODO:
            },
            opening: {
                amount: this.titleApiRawData.openingWeekendGross?.gross?.total?.amount ?? 0,
                countries: [],
                date: dayjs(
                    this.titleApiRawData.openingWeekendGross?.weekendEndDate,
                    "YYYY-MM-DD"
                ).toDate(),
            },
            worldwide: this.titleApiRawData.lifetimeGross?.total?.amount ?? 0,
        };
    }

    get productionCompanies(): IProductionCompanyDetails[] {
        return (
            this.titleApiRawData.companyCredits?.edges
                .map((i) => i.node)
                .map((i) => ({
                    name: i.company?.companyText?.text ?? "",
                    extraInfo: i.category?.text,
                })) ?? []
        );
    }

    get taglines(): string[] {
        return this.titleApiRawData.taglines?.edges.map((i) => i.node).map((i) => i.text) ?? [];
    }

    get runtime(): IRuntimeDetails {
        return {
            seconds: this.titleApiRawData.runtime?.seconds ?? 0,
            title: this.titleApiRawData.runtime?.displayableProperty?.value.plainText ?? "",
        };
    }

    get awardsSummary(): IAwardsSummaryDetails {
        return {
            eventName: this.titleApiRawData.prestigiousAwardSummary?.award?.event?.text ?? "",
            awardName: this.titleApiRawData.prestigiousAwardSummary?.award?.text ?? "",
            totalNominations: this.titleApiRawData.prestigiousAwardSummary?.nominations ?? 0,
            wins: this.titleApiRawData.prestigiousAwardSummary?.wins ?? 0,
        };
    }

    get goofs(): ITitleGoofItem[] {
        return (
            this.titleApiRawData.goofs?.edges
                .map((i) => i.node)
                .map((i) => ({
                    details: i.text?.plainText ?? "",
                    groupName: i.category?.text ?? "",
                    isSpoiler: i.isSpoiler ?? false,
                })) ?? []
        );
    }

    get quotes(): ITitleQuoteItem[] {
        return this.titleApiRawData.quotes?.edges
            .map((edge) => edge.node)
            .map((quote) => ({
                isSpoiler: quote.isSpoiler ?? false,
                lines: quote.lines?.map((line) => ({
                    characters:
                        line.characters?.map((character) => ({
                            name: character.character ?? "",
                            playerName: character.name?.nameText.text ?? "",
                            playerSource: this.extractSourceFromId(character.name?.id ?? ""),
                        })) ?? [],
                    line: line.text,
                    stageDirection: line.stageDirection,
                })),
            }));
    }

    get awards(): IAwardDetails[] {
        return (
            this.titleApiRawData.awardNominations?.edges
                .map((i) => i.node)
                .map((i) => ({
                    mainEvent: i.award?.event?.text ?? "",
                    eventYear: i.award?.year ?? 0,
                    subEvent: i.award?.eventEditionId ?? "",
                    awardTitle: i.award?.text ?? "",
                    outcome: i.isWinner ? AwardOutcome.Winner : AwardOutcome.Nominee,
                    details: i.award?.text ?? "",
                })) ?? []
        );
    }

    get keywords(): string[] {
        return this.titleApiRawData.keywords.edges.map((i) => i.node).map((i) => i.text);
    }

    get allImages(): IImageDetails[] {
        return [
            ...(this.titleApiRawData.posterImages?.edges ?? []),
            ...(this.titleApiRawData.stillFrameImages?.edges ?? []),
        ]
            .map((edge) => edge.node)
            .map((imageNode) => ({
                isThumbnail: false,
                sourceType: Source.IMDB,
                title: imageNode.caption?.plainText ?? "",
                type: imageNode.type ?? "",
                url: imageNode.url ?? "",
                names: imageNode.names?.map((nameEntry) => ({
                    source: this.extractSourceFromId(nameEntry.id ?? ""),
                    name: nameEntry.nameText?.text ?? "",
                })),
                ...(!!imageNode.width &&
                    !!imageNode.height && {
                        size: {
                            width: imageNode.width,
                            height: imageNode.height,
                        },
                    }),
            }));
    }

    get languages(): string[] {
        return this.titleApiRawData.spokenLanguages?.spokenLanguages?.map((i) => i.text) || [];
    }

    get mainType(): TitleMainType {
        let titleTypeId = this.titleApiRawData.titleType?.id;
        if (titleTypeId === "tvSeries") {
            titleTypeId = "series";
        }
        return (this.getEnumItemFromString(TitleMainType, titleTypeId ?? "") ??
            TitleMainType.Movie) as TitleMainType;
    }

    get posterImage(): IImageDetails {
        const pImage = this.titleApiRawData.primaryImage;
        return {
            isThumbnail: false,
            sourceType: Source.IMDB,
            title: pImage?.caption?.plainText ?? "",
            type: pImage?.type ?? "",
            url: pImage?.url ?? "",
            names: pImage?.names?.map((i) => ({
                name: i.nameText.text,
                source: this.extractSourceFromId(i.id),
            })),
            ...(!!pImage?.width &&
                !!pImage?.height && {
                    size: {
                        width: pImage?.width,
                        height: pImage?.height,
                    },
                }),
            thumbnails: [],
        };
    }

    get countriesOfOrigin(): string[] {
        return this.titleApiRawData.countriesOfOrigin?.countries?.map((i) => i.text) ?? [];
    }

    get allReleaseDates(): IReleaseDateDetails[] {
        return this.titleApiRawData.releaseDates.edges
            .map((i) => i.node)
            .map((i) => ({
                country: i.country?.text ?? "",
                date: new Date(i.year ?? 0, i.month ?? 0, i.day ?? 0, 0, 0, 0, 0),
            }));
    }

    get ageCategoryTitle(): string {
        return this.titleApiRawData?.certificate?.rating ?? "";
    }

    get allRates(): IRateDetails[] {
        const metacriticRate = this.titleApiRawData.metacritic;

        return [
            this.mainRate,
            ...(metacriticRate
                ? [
                      {
                          rate: metacriticRate.metascore?.score ?? 0,
                          votesCount: metacriticRate.metascore?.reviewCount ?? 0,
                          rateSource: Source.MetaCritics,
                      },
                  ]
                : []),
        ];
    }
}
