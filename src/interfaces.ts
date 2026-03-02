import type { AwardOutcome, Genre, Language, Source, TitleMainType } from "./literals";

export interface ITrailerDetails {
    contentType?: string;
    description?: string;
    id?: string;
    name?: string;
    playbackUrls?: string[];
    runtimeSeconds?: number;
    sourceUrl?: string;
    thumbnailUrl?: string;
}

export interface ITitle {
    ageCategoryTitle: string;
    allImages: IImageDetails[];
    allRates: IRateDetails[];
    allReleaseDates: IReleaseDateDetails[];
    allSources: ISourceDetails[];
    awards: IAwardDetails[];
    awardsSummary: IAwardsSummaryDetails;
    boxOffice?: IBoxOfficeDetails;
    casts: ICastDetails[];
    countriesOfOrigin: string[];
    dates: IDatesDetails;
    detailsLang: Language;
    directors: IPersonDetails[];
    genres: Genre[];
    goofs: ITitleGoofItem[];
    keywords: string[];
    languages: string[];
    mainRate: IRateDetails;
    mainSource: ISourceDetails;
    mainType: TitleMainType;
    name: string;
    otherNames: string[];
    plot: string;
    posterImage: IImageDetails;
    producers: IPersonDetails[];
    productionCompanies: IProductionCompanyDetails[];
    quotes: ITitleQuoteItem[];
    runtime: IRuntimeDetails;
    taglines: string[];
    titleYear: number;
    trailers: ITrailerDetails[];
    worldWideName: string;
    writers: IPersonDetails[];
}

export type ITitleKey = keyof ITitle;

export interface ITitleDetailsResolverOptions {
    select?: Partial<{
        [key in ITitleKey]: boolean;
    }>;
    tmdbReadAccessToken?: string;
}

export interface ITitleLocale {
    detailsLang: Language;
    mainSource: ISourceDetails;
    name: string;
    otherNames: string[];
    plot: string;
}

export interface ISourceDetails {
    sourceId: string;
    sourceType: Source;
    sourceUrl: string;
}

export interface IPersonDetails {
    extraInfo?: string;
    name: string;
    source?: ISourceDetails;
}

export interface IRoleDetails {
    name: string;
    source?: ISourceDetails;
}

export interface ICastDetails extends IPersonDetails {
    episodeCredits?: EpisodeCreditsDetails;
    otherNames?: string[];
    roles: IRoleDetails[];
    thumbnailImageUrl?: string;
}

export interface EpisodeCreditsDetails {
    endYear: number;
    startYear: number;
    totalEpisodes: number;
}

export interface IRateAndVotesCount {
    rate: number;
    votesCount: number;
}

export interface IAgesRateAndVotesCount {
    allAges?: IRateAndVotesCount;
    between18And29?: IRateAndVotesCount;
    between30And44?: IRateAndVotesCount;
    over44?: IRateAndVotesCount;
    under18?: IRateAndVotesCount;
}

export interface IRateDetailsForSpecificAge extends IRateAndVotesCount {
    percent?: number;
}

export interface IRateDetails extends IRateAndVotesCount {
    assortedByGender?: {
        allGenders?: IAgesRateAndVotesCount;
        male?: IAgesRateAndVotesCount;
        female?: IAgesRateAndVotesCount;
    };
    assortedByRate?: IRateDetailsForSpecificAge[];
    rateSource: Source;
}

export interface IDatesDetails {
    endYear?: number;
    isEnded?: boolean;
    startCountry: string;
    startDate: Date;
    startExtraInfo?: string;
    startYear: number;
    titleYear: number;
}

export interface IReleaseDateDetails {
    country: string;
    date: Date;
    extraInfo?: string;
}

export interface IBoxOfficeDetails {
    budget: number;
    mainCountries: {
        countries: string[];
        amount: number;
    };
    opening: {
        countries: string[];
        amount: number;
        date: Date;
    };
    worldwide: number;
}

export interface IProductionCompanyDetails {
    extraInfo?: string;
    name: string;
}

export interface IImageDetails {
    isThumbnail: boolean;
    names?: IPersonDetails[];
    size?: {
        width: number;
        height: number;
    };
    sourceType: Source;
    thumbnails?: IImageDetails[];
    title: string;
    type: string;
    url: string;
}

export interface IFoundedTitleDetails {
    aka: string;
    matchScore: number;
    name: string;
    source: ISourceDetails;
    thumbnailImageUrl: string;
    titleType: TitleMainType;
    titleYear: number;
    url: string;
}

export interface IFoundedPersonDetails {
    matchScore: number;
    name: string;
    source: ISourceDetails;
    thumbnailImageUrl: string;
    url: string;
}

export interface IRuntimeDetails {
    seconds: number;
    title: string;
}

export interface IAwardDetails {
    awardTitle: string;
    details?: string;
    eventYear: number;
    mainEvent: string;
    outcome: AwardOutcome;
    subEvent: string;
}

export interface IAwardsSummaryDetails {
    awardName: string;
    eventName: string;
    totalNominations: number;
    wins: number;
}

export interface ITitleDetailsResolver {
    getDetails(opts?: ITitleDetailsResolverOptions): Promise<ITitle | undefined>;
}

export interface ITitleSearchResolver {
    getResult(): Promise<IFoundedTitleDetails[]>;
}
export interface IPersonSearchResolver {
    getResult(): Promise<IFoundedPersonDetails[]>;
}

export interface IPersonDetailsResolver {
    getDetails(): Promise<IPerson | undefined>;
}

export interface IPerson {
    allImages: IImageDetails[];
    birthDate?: Date;
    birthPlace?: string;
    deathDate?: Date;
    deathPlace?: string;
    detailsLang: Language;
    filmography: IFilmographyItem[];
    knownFor: IKnownForItem[];
    mainSource: ISourceDetails;
    miniBio: string[];
    name: string;
    personalDetails: IPersonalDetailItem[];
    profileImage?: IImageDetails;
}

export interface IKnownForItem {
    endYear: number;
    name: string;
    posterImage: IImageDetails;
    role: string;
    source: ISourceDetails;
    startYear: number;
}

export interface IFilmographyItem {
    category: string; // TODO: make an enum for this
    endYear: number;
    name: string;
    productionStatus: string;
    roles: string[];
    source: ISourceDetails;
    startYear: number;
    type: TitleMainType;
}

export interface IPersonalDetailItem {
    details: string;
    relatedSources: ISourceDetails[];
    title: string;
}

export interface ITitleQuoteItem {
    isSpoiler: boolean;
    lines: ITitleQuoteLineItemDetails[];
}

export interface ITitleQuoteLineItemDetails {
    characters: IQuoteCharacterDetails[];
    line?: string;
    stageDirection?: string;
}

export interface IQuoteCharacterDetails {
    name: string;
    playerName: string;
    playerSource: ISourceDetails;
}

export interface ITitleGoofItem {
    details: string;
    groupName: string;
    isSpoiler: boolean;
}
