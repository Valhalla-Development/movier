import type { IFoundedPersonDetails, IPersonSearchResolver } from "./interfaces";
import { TMDBPersonSearchResolver } from "./resolvers/TMDBPersonSearchResolver";

export type SearchPersonByNameOptions = {
    exactMatch?: boolean;
    tmdbReadAccessToken?: string;
};

export async function searchPersonByName(
    queryName: string,
    { exactMatch = false, tmdbReadAccessToken }: SearchPersonByNameOptions = {}
): Promise<IFoundedPersonDetails[]> {
    if (!tmdbReadAccessToken?.trim()) {
        const errorMessage =
            "TMDB Read Access Token is required for person search. Create one at https://www.themoviedb.org/settings/api and pass it via { tmdbReadAccessToken }.";
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    const resolver: IPersonSearchResolver = new TMDBPersonSearchResolver(queryName, {
        exactMatch,
        tmdbReadAccessToken,
    });

    // get details from resolver
    return await resolver.getResult();
}
