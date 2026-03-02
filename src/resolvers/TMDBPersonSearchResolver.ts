import { TMDB_IMAGE_BASE_URL } from "../constants";
import type { IFoundedPersonDetails, IPersonSearchResolver } from "../interfaces";
import { IMDBPathType, Source } from "../literals";
import type { SearchPersonByNameOptions } from "../personSearcher";
import { tmdbGetRequest } from "../requestClient";
import { convertIMDBTitleIdToUrl } from "../utils/convertIMDBTitleIdToUrl";
import { formatHTMLText } from "../utils/formatHTMLText";

export class TMDBPersonSearchResolver implements IPersonSearchResolver {
    private readonly queryName: string;
    private readonly exactMatch: boolean;
    private readonly tmdbReadAccessToken: string;

    constructor(
        queryName: string,
        {
            exactMatch = false,
            tmdbReadAccessToken = "",
        }: Omit<SearchPersonByNameOptions, never> = {}
    ) {
        this.queryName = queryName;
        this.exactMatch = exactMatch;
        this.tmdbReadAccessToken = tmdbReadAccessToken;
    }

    async getResult(): Promise<IFoundedPersonDetails[]> {
        const response = await tmdbGetRequest<TMDBPersonSearchResponse>(
            "/search/person",
            this.tmdbReadAccessToken,
            {
                query: this.queryName,
                page: 1,
            }
        );
        const filtered = (response.results ?? [])
            .filter((item) => {
                if (!this.exactMatch) {
                    return true;
                }
                return (
                    formatHTMLText(item.name ?? "").toLowerCase() === this.queryName.toLowerCase()
                );
            })
            .slice(0, 25);

        const mapped = await Promise.all(
            filtered.map(async (item, index) => {
                const externalIds = await tmdbGetRequest<TMDBExternalIdsResponse>(
                    `/person/${item.id}/external_ids`,
                    this.tmdbReadAccessToken
                );
                const imdbId = externalIds.imdb_id ?? undefined;
                if (!imdbId) {
                    return;
                }
                const url = convertIMDBTitleIdToUrl(imdbId, IMDBPathType.Name);
                return {
                    matchScore:
                        Math.max(1, 20 - index) + Math.min(10, Math.round(item.popularity ?? 0)),
                    name: formatHTMLText(item.name ?? ""),
                    source: {
                        sourceType: Source.IMDB,
                        sourceUrl: url,
                        sourceId: imdbId,
                    },
                    thumbnailImageUrl: item.profile_path
                        ? `${TMDB_IMAGE_BASE_URL}${item.profile_path}`
                        : "",
                    url,
                } as IFoundedPersonDetails;
            })
        );

        return mapped
            .filter((item): item is IFoundedPersonDetails => Boolean(item))
            .sort((a, b) => b.matchScore - a.matchScore);
    }
}

interface TMDBPersonSearchResponse {
    results?: TMDBPersonSearchResult[];
}

interface TMDBPersonSearchResult {
    id: number;
    name?: string;
    popularity?: number;
    profile_path?: string | null;
}

interface TMDBExternalIdsResponse {
    imdb_id?: string | null;
}
