import { TMDB_IMAGE_BASE_URL } from "../constants";
import type { IFoundedTitleDetails, ITitleSearchResolver } from "../interfaces";
import { Source, TitleMainType } from "../literals";
import { tmdbGetRequest } from "../requestClient";
import type { SearchTitleByNameOptions } from "../titleSearcher";
import { convertIMDBTitleIdToUrl } from "../utils/convertIMDBTitleIdToUrl";
import { formatHTMLText } from "../utils/formatHTMLText";

export class TMDBTitleSearchResolver implements ITitleSearchResolver {
    private readonly queryName: string;
    private readonly exactMatch: boolean;
    private readonly specificType?: TitleMainType;
    private readonly tmdbReadAccessToken: string;

    constructor(
        queryName: string,
        {
            exactMatch = false,
            specificType,
            tmdbReadAccessToken = "",
        }: Omit<SearchTitleByNameOptions, never> = {}
    ) {
        this.queryName = queryName;
        this.exactMatch = exactMatch;
        this.specificType = specificType;
        this.tmdbReadAccessToken = tmdbReadAccessToken;
    }

    async getResult(): Promise<IFoundedTitleDetails[]> {
        const { nameWithoutYear, requestedYear } = this.nameWithoutYearAndRequestedYearFromQuery;
        const searchResponse = await tmdbGetRequest<TMDBMultiSearchResponse>(
            "/search/multi",
            this.tmdbReadAccessToken,
            {
                query: nameWithoutYear,
                page: 1,
            }
        );
        const searchItems = (searchResponse.results ?? [])
            .filter((item) => item.media_type === "movie" || item.media_type === "tv")
            .filter((item) => {
                if (!this.exactMatch) {
                    return true;
                }
                const itemName = formatHTMLText(item.title ?? item.name ?? "").toLowerCase();
                return itemName === nameWithoutYear.toLowerCase();
            })
            .filter((item) => {
                if (!this.specificType) {
                    return true;
                }
                const mappedType =
                    item.media_type === "tv" ? TitleMainType.Series : TitleMainType.Movie;
                return mappedType === this.specificType;
            })
            .slice(0, 25);

        const resolved = await Promise.all(
            searchItems.map(async (item, index) => {
                const imdbId = await this.getIMDBIdForResult(item);
                if (!imdbId) {
                    return;
                }
                const name = formatHTMLText(item.title ?? item.name ?? "");
                const akaText = formatHTMLText(item.original_title ?? item.original_name ?? "");
                const aka = akaText !== name ? akaText : "";
                const titleType =
                    item.media_type === "tv" ? TitleMainType.Series : TitleMainType.Movie;
                const titleYear = this.extractYear(item.release_date ?? item.first_air_date);
                const url = convertIMDBTitleIdToUrl(imdbId);
                return {
                    source: {
                        sourceId: imdbId,
                        sourceType: Source.IMDB,
                        sourceUrl: url,
                    },
                    name,
                    aka,
                    titleYear,
                    url,
                    titleType,
                    matchScore: this.calculateMatchScore({
                        index,
                        popularity: item.popularity ?? 0,
                        requestedYear,
                        itemYear: titleYear,
                        titleType,
                    }),
                    thumbnailImageUrl: item.poster_path
                        ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
                        : "",
                } as IFoundedTitleDetails;
            })
        );

        return resolved
            .filter((item): item is IFoundedTitleDetails => Boolean(item))
            .sort((a, b) => b.matchScore - a.matchScore);
    }

    private get nameWithoutYearAndRequestedYearFromQuery(): {
        nameWithoutYear: string;
        requestedYear: number | null;
    } {
        const match = /^(.{1,150})\s(\d{4})\s*$/.exec(this.queryName);
        if (!match) {
            return { nameWithoutYear: this.queryName, requestedYear: null };
        }
        return {
            nameWithoutYear: match[1],
            requestedYear: Number(match[2]),
        };
    }

    private extractYear(date?: string): number {
        const year = Number(/^(\d{4})/.exec(date ?? "")?.[1] ?? "0");
        return Number.isFinite(year) ? year : 0;
    }

    private calculateMatchScore({
        index,
        popularity,
        requestedYear,
        itemYear,
        titleType,
    }: {
        index: number;
        popularity: number;
        requestedYear: number | null;
        itemYear: number;
        titleType: TitleMainType;
    }): number {
        let score = Math.max(1, 20 - index);
        if (requestedYear && itemYear === requestedYear) {
            score += 4;
        }
        if (titleType === TitleMainType.Movie || titleType === TitleMainType.Series) {
            score += 3;
        }
        score += Math.min(10, Math.max(0, Math.round(popularity / 10)));
        return score;
    }

    private async getIMDBIdForResult(result: TMDBMultiSearchResult): Promise<string | undefined> {
        if (result.media_type === "movie") {
            const movieExternalIds = await tmdbGetRequest<TMDBExternalIdsResponse>(
                `/movie/${result.id}/external_ids`,
                this.tmdbReadAccessToken
            );
            return movieExternalIds.imdb_id ?? undefined;
        }
        if (result.media_type === "tv") {
            const tvExternalIds = await tmdbGetRequest<TMDBExternalIdsResponse>(
                `/tv/${result.id}/external_ids`,
                this.tmdbReadAccessToken
            );
            return tvExternalIds.imdb_id ?? undefined;
        }
        return;
    }
}

interface TMDBMultiSearchResponse {
    results?: TMDBMultiSearchResult[];
}

interface TMDBMultiSearchResult {
    first_air_date?: string;
    id: number;
    media_type?: "movie" | "tv" | "person";
    name?: string;
    original_name?: string;
    original_title?: string;
    popularity?: number;
    poster_path?: string | null;
    release_date?: string;
    title?: string;
}

interface TMDBExternalIdsResponse {
    imdb_id?: string | null;
}
