export interface PersonApiDetailsInterface {
    name?: Name;
}

export interface Name {
    age?: {
        text: string;
    };
    bio?: {
        text?: {
            plainText: string;
        };
    };
    birthDate?: {
        dateComponents?: {
            day?: number;
            month?: number;
            year?: number;
        };
    };
    birthLocation?: {
        text?: string;
    };
    credits?: Credits;
    deathCause?: {
        text: string;
    };
    deathDate?: {
        dateComponents?: {
            day?: number;
            month?: number;
            year?: number;
        };
    };
    deathLocation?: {
        text?: string;
    };
    height?: {
        measurement: {
            value: string;
        };
    };
    nameText?: {
        text?: string;
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
}

export interface Credits {
    edges?: CreditsEdge[];
    pageInfo?: PageInfo;
    total?: number;
}

export interface CreditsEdge {
    node?: PurpleNode;
}

export interface PurpleNode {
    attributes?: Category[] | null;
    category?: Category;
    characters?: Character[];
    episodeCredits?: EpisodeCredits;
    title?: FluffyTitle;
}

export interface Category {
    text?: string;
}

export interface Character {
    name?: string;
}

export interface EpisodeCredits {
    edges?: EpisodeCreditsEdge[];
    total?: number;
    yearRange?: YearRange | null;
}

export interface EpisodeCreditsEdge {
    node?: FluffyNode;
}

export interface FluffyNode {
    title?: PurpleTitle;
}

export interface PurpleTitle {
    id?: string;
    originalTitleText?: Category;
    releaseYear?: ReleaseYear | null;
    series?: Series;
}

export interface ReleaseYear {
    year?: number;
}

export interface Series {
    displayableEpisodeNumber?: DisplayableEpisodeNumber;
}

export interface DisplayableEpisodeNumber {
    displayableSeason?: Category;
    episodeNumber?: Category;
}

export interface YearRange {
    endYear?: number | null;
    year?: number;
}

export interface FluffyTitle {
    genres?: Genres;
    id?: string;
    originalTitleText?: Category;
    primaryImage?: PrimaryImage | null;
    productionStatus?: ProductionStatus;
    releaseYear?: YearRange | null;
}

export interface Genres {
    genres?: Category[];
}

export interface PrimaryImage {
    caption?: Caption;
    height?: number;
    url?: string;
    width?: number;
}

export interface Caption {
    plainText?: string;
}

export interface ProductionStatus {
    currentProductionStage?: CurrentProductionStage;
}

export interface CurrentProductionStage {
    id?: ID;
}

export type ID = "post_production" | "pre_production" | "released";

export interface PageInfo {
    hasNextPage?: boolean;
}
