import type { AwardOutcome, Genre, Language, Source, TitleMainType } from "./literals";

export type ITitle = {
    detailsLang: Language;
    mainSource: ISourceDetails;
    allSources: ISourceDetails[];
    name: string;
    worldWideName: string;
    otherNames: string[];
    titleYear: number;
    genres: Genre[];
    directors: IPersonDetails[];
    writers: IPersonDetails[];
    mainType: TitleMainType;
    plot: string;
    casts: ICastDetails[];
    producers: IPersonDetails[];
    mainRate: IRateDetails;
    allRates: IRateDetails[];
    dates: IDatesDetails;
    allReleaseDates: IReleaseDateDetails[];
    ageCategoryTitle: string;
    languages: string[];
    countriesOfOrigin: string[];
    posterImage: IImageDetails;
    allImages: IImageDetails[];
    boxOffice?: IBoxOfficeDetails;
    productionCompanies: IProductionCompanyDetails[];
    taglines: string[];
    runtime: IRuntimeDetails;
    keywords: string[];
    awards: IAwardDetails[];
    awardsSummary: IAwardsSummaryDetails;
    quotes: ITitleQuoteItem[];
    goofs: ITitleGoofItem[];
};

export type ITitleKey = keyof ITitle;

export type ITitleDetailsResolverOptions = {
    select?: Partial<{
        [key in ITitleKey]: boolean;
    }>;
};

export type ITitleLocale = {
    detailsLang: Language;
    mainSource: ISourceDetails;
    name: string;
    otherNames: string[];
    plot: string;
};

export type ISourceDetails = {
    sourceId: string;
    sourceType: Source;
    sourceUrl: string;
};

export type IPersonDetails = {
    source?: ISourceDetails;
    name: string;
    extraInfo?: string;
};

export type IRoleDetails = {
    source?: ISourceDetails;
    name: string;
};

export interface ICastDetails extends IPersonDetails {
    roles: IRoleDetails[];
    otherNames?: string[];
    episodeCredits?: EpisodeCreditsDetails;
    thumbnailImageUrl?: string;
}

export type EpisodeCreditsDetails = {
    totalEpisodes: number;
    startYear: number;
    endYear: number;
};

export type IRateAndVotesCount = {
    rate: number;
    votesCount: number;
};

export type IAgesRateAndVotesCount = {
    allAges?: IRateAndVotesCount;
    under18?: IRateAndVotesCount;
    between18And29?: IRateAndVotesCount;
    between30And44?: IRateAndVotesCount;
    over44?: IRateAndVotesCount;
};

export interface IRateDetailsForSpecificAge extends IRateAndVotesCount {
    percent?: number;
}

export interface IRateDetails extends IRateAndVotesCount {
    rateSource: Source;
    assortedByGender?: {
        allGenders?: IAgesRateAndVotesCount;
        male?: IAgesRateAndVotesCount;
        female?: IAgesRateAndVotesCount;
    };
    assortedByRate?: IRateDetailsForSpecificAge[];
}

export type IDatesDetails = {
    titleYear: number;
    startYear: number;
    startCountry: string;
    startExtraInfo?: string;
    endYear?: number;
    startDate: Date;
    isEnded?: boolean;
};

export type IReleaseDateDetails = {
    country: string;
    date: Date;
    extraInfo?: string;
};

export type IBoxOfficeDetails = {
    budget: number;
    worldwide: number;
    mainCountries: {
        countries: string[];
        amount: number;
    };
    opening: {
        countries: string[];
        amount: number;
        date: Date;
    };
};

export type IProductionCompanyDetails = {
    name: string;
    extraInfo?: string;
};

export type IImageDetails = {
    type: string;
    title: string;
    sourceType: Source;
    url: string;
    isThumbnail: boolean;
    names?: IPersonDetails[];
    size?: {
        width: number;
        height: number;
    };
    thumbnails?: IImageDetails[];
};

export type IFoundedTitleDetails = {
    source: ISourceDetails;
    name: string;
    titleYear: number;
    aka: string;
    url: string;
    titleType: TitleMainType;
    matchScore: number;
    thumbnailImageUrl: string;
};

export type IFoundedPersonDetails = {
    source: ISourceDetails;
    name: string;
    url: string;
    matchScore: number;
    thumbnailImageUrl: string;
};

export type IRuntimeDetails = {
    title: string;
    seconds: number;
};

export type IAwardDetails = {
    mainEvent: string;
    eventYear: number;
    subEvent: string;
    awardTitle: string;
    outcome: AwardOutcome;
    details?: string;
};

export type IAwardsSummaryDetails = {
    eventName: string;
    awardName: string;
    totalNominations: number;
    wins: number;
};

export type ITitleDetailsResolver = {
    getDetails(opts?: ITitleDetailsResolverOptions): Promise<ITitle | undefined>;
};

export type ITitleSearchResolver = {
    getResult(): Promise<IFoundedTitleDetails[]>;
};
export type IPersonSearchResolver = {
    getResult(): Promise<IFoundedPersonDetails[]>;
};

export type IPersonDetailsResolver = {
    getDetails(): Promise<IPerson | undefined>;
};

export type IPerson = {
    detailsLang: Language;
    mainSource: ISourceDetails;
    name: string;
    birthDate?: Date;
    birthPlace?: string;
    miniBio: string[];
    knownFor: IKnownForItem[];
    filmography: IFilmographyItem[];
    personalDetails: IPersonalDetailItem[];
    profileImage?: IImageDetails;
    allImages: IImageDetails[];
    deathDate?: Date;
    deathPlace?: string;
};

export type IKnownForItem = {
    source: ISourceDetails;
    posterImage: IImageDetails;
    name: string;
    role: string;
    startYear: number;
    endYear: number;
};

export type IFilmographyItem = {
    source: ISourceDetails;
    name: string;
    type: TitleMainType;
    startYear: number;
    endYear: number;
    productionStatus: string;
    roles: string[];
    category: string; // TODO: make an enum for this
};

export type IPersonalDetailItem = {
    title: string;
    details: string;
    relatedSources: ISourceDetails[];
};

export type ITitleQuoteItem = {
    isSpoiler: boolean;
    lines: ITitleQuoteLineItemDetails[];
};

export type ITitleQuoteLineItemDetails = {
    characters: IQuoteCharacterDetails[];
    line?: string;
    stageDirection?: string;
};

export type IQuoteCharacterDetails = {
    name: string;
    playerName: string;
    playerSource: ISourceDetails;
};

export type ITitleGoofItem = {
    groupName: string;
    isSpoiler: boolean;
    details: string;
};
