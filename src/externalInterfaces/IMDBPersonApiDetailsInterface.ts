export type PersonApiDetailsInterface = {
    name?: Name;
};

export type Name = {
    credits?: Credits;
    bio?: {
        text?: {
            plainText: string;
        };
    };
    age?: {
        text: string;
    };
    deathCause?: {
        text: string;
    };
    height?: {
        measurement: {
            value: string;
        };
    };
    nickNames?: {
        text: string;
    }[];
    primaryImage?: {
        url?: string;
        caption?: {
            plainText: string;
        };
    };
};

export type Credits = {
    total?: number;
    edges?: CreditsEdge[];
    pageInfo?: PageInfo;
};

export type CreditsEdge = {
    node?: PurpleNode;
};

export type PurpleNode = {
    title?: FluffyTitle;
    category?: Category;
    characters?: Character[];
    episodeCredits?: EpisodeCredits;
    attributes?: Category[] | null;
};

export type Category = {
    text?: string;
};

export type Character = {
    name?: string;
};

export type EpisodeCredits = {
    total?: number;
    yearRange?: YearRange | null;
    edges?: EpisodeCreditsEdge[];
};

export type EpisodeCreditsEdge = {
    node?: FluffyNode;
};

export type FluffyNode = {
    title?: PurpleTitle;
};

export type PurpleTitle = {
    id?: string;
    originalTitleText?: Category;
    releaseYear?: ReleaseYear | null;
    series?: Series;
};

export type ReleaseYear = {
    year?: number;
};

export type Series = {
    displayableEpisodeNumber?: DisplayableEpisodeNumber;
};

export type DisplayableEpisodeNumber = {
    displayableSeason?: Category;
    episodeNumber?: Category;
};

export type YearRange = {
    year?: number;
    endYear?: number | null;
};

export type FluffyTitle = {
    id?: string;
    originalTitleText?: Category;
    primaryImage?: PrimaryImage | null;
    releaseYear?: YearRange | null;
    genres?: Genres;
    productionStatus?: ProductionStatus;
};

export type Genres = {
    genres?: Category[];
};

export type PrimaryImage = {
    url?: string;
    width?: number;
    height?: number;
    caption?: Caption;
};

export type Caption = {
    plainText?: string;
};

export type ProductionStatus = {
    currentProductionStage?: CurrentProductionStage;
};

export type CurrentProductionStage = {
    id?: ID;
};

export enum ID {
    PostProduction = "post_production",
    PreProduction = "pre_production",
    Released = "released",
}

export type PageInfo = {
    hasNextPage?: boolean;
};
