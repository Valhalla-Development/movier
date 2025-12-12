import { Source, type TitleMainType } from "./enums";
import type { IFoundedTitleDetails, ITitleSearchResolver } from "./interfaces";
import { IMDBTitleSearchResolver } from "./resolvers/IMDBTitleSearchResolver";

export type SearchTitleByNameOptions = {
    exactMatch?: boolean;
    specificType?: TitleMainType;
    sourceType?: Source;
};

export async function searchTitleByName(
    queryName: string,
    { exactMatch = false, specificType, sourceType = Source.IMDB }: SearchTitleByNameOptions = {}
): Promise<IFoundedTitleDetails[]> {
    //  select the resolver
    let resolver: ITitleSearchResolver;
    switch (sourceType) {
        default:
            resolver = new IMDBTitleSearchResolver(queryName, {
                exactMatch,
                specificType,
            });
    }

    // get details from resolver
    return await resolver.getResult();
}
