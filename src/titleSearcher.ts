import type { IFoundedTitleDetails, ITitleSearchResolver } from "./interfaces";
import type { TitleMainType } from "./literals";
import { TMDBTitleSearchResolver } from "./resolvers/TMDBTitleSearchResolver";

export type SearchTitleByNameOptions = {
    exactMatch?: boolean;
    specificType?: TitleMainType;
    tmdbReadAccessToken?: string;
};

export async function searchTitleByName(
    queryName: string,
    { exactMatch = false, specificType, tmdbReadAccessToken }: SearchTitleByNameOptions = {}
): Promise<IFoundedTitleDetails[]> {
    if (!tmdbReadAccessToken?.trim()) {
        const errorMessage =
            "TMDB Read Access Token is required for title search. Create one at https://www.themoviedb.org/settings/api and pass it via { tmdbReadAccessToken }.";
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    const resolver: ITitleSearchResolver = new TMDBTitleSearchResolver(queryName, {
        exactMatch,
        specificType,
        tmdbReadAccessToken,
    });

    // get details from resolver
    return await resolver.getResult();
}
