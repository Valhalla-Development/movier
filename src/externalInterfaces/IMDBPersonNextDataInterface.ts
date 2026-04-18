export interface PersonDetailsNextData {
    assetPrefix?: string;
    buildId?: string;
    customServer?: boolean;
    gssp?: boolean;
    isFallback?: boolean;
    page?: string;
    props?: Props;
    query?: Query;
    runtimeConfig?: RuntimeConfig;
    scriptLoader?: unknown[];
}

export interface Props {
    __N_SSP?: boolean;
    pageProps?: PageProps;
}

export interface PageProps {
    aboveTheFold?: AboveTheFold;
    fetchState?: null;
    mainColumnData?: MainColumnData;
    nameImageUploadLinkData?: NameImageUploadLinkData;
    nmconst?: string;
    urqlState?: null;
}

export interface AboveTheFold {
    __typename?: string;
    bio?: Bio;
    birthDate?: AboveTheFoldBirthDate;
    deathDate?: AboveTheFoldBirthDate | null;
    deathStatus?: string;
    disambiguator?: null;
    id?: string;
    images?: Images;
    knownFor?: KnownFor;
    meta?: Meta;
    meterRanking?: MeterRanking;
    nameText?: NameText;
    primaryImage?: PrimaryImage;
    primaryProfessions?: AboveTheFoldPrimaryProfession[];
    primaryVideos?: PrimaryVideos;
    searchIndexing?: SearchIndexing;
    subNavAwardNominations?: Images;
    subNavBio?: SubNavBio;
    subNavTrivia?: Images;
    videos?: Images;
}

export interface Bio {
    __typename?: string;
    text?: CaptionClass;
}

export interface CaptionClass {
    __typename?: TextTypename;
    plainText?: string;
}

export type TextTypename = "Markdown";

export interface AboveTheFoldBirthDate {
    __typename?: string;
    date?: Date;
    dateComponents?: DateComponents;
    displayableProperty?: DisplayableProperty;
}

export interface DateComponents {
    __typename?: string;
    day?: number;
    isBCE?: boolean;
    month?: number;
    year?: number;
}

export interface DisplayableProperty {
    __typename?: string;
    value?: CaptionClass;
}

export interface Images {
    __typename?: string;
    total?: number;
}

export interface KnownFor {
    __typename?: string;
    edges?: AkasEdge[];
}

export interface AkasEdge {
    __typename?: string;
    node?: PurpleNode;
}

export interface PurpleNode {
    __typename?: string;
    summary?: PurpleSummary;
    title?: PurpleTitle;
}

export interface PurpleSummary {
    __typename?: string;
    principalCategory?: NameText;
}

export interface NameText {
    __typename?: NameTextTypename;
    text?: string;
}

export type NameTextTypename = "CreditCategory" | "Genre" | "NameText" | "TitleText";

export interface PurpleTitle {
    __typename?: string;
    titleText?: NameText;
}

export interface Meta {
    __typename?: string;
    canonicalId?: string;
    publicationStatus?: string;
}

export interface MeterRanking {
    __typename?: string;
    currentRank?: number;
    rankChange?: RankChange;
}

export interface RankChange {
    __typename?: string;
    changeDirection?: string;
    difference?: number;
}

export interface PrimaryImage {
    __typename?: PrimaryImageTypename;
    caption?: CaptionClass;
    height?: number;
    id?: string;
    url?: string;
    width?: number;
}

export type PrimaryImageTypename = "Image";

export interface AboveTheFoldPrimaryProfession {
    __typename?: string;
    category?: NameText;
}

export interface PrimaryVideos {
    __typename?: string;
    edges?: PrimaryVideosEdge[];
}

export interface PrimaryVideosEdge {
    __typename?: string;
    node?: FluffyNode;
}

export interface FluffyNode {
    __typename?: string;
    contentType?: ContentType;
    description?: Description;
    id?: string;
    isMature?: boolean;
    name?: Description;
    previewURLs?: PreviewURL[];
    primaryTitle?: PrimaryTitle;
    runtime?: NodeRuntime;
    thumbnail?: Thumbnail;
}

export interface ContentType {
    __typename?: string;
    displayName?: DisplayName;
    id?: string;
}

export interface DisplayName {
    __typename?: string;
    value?: string;
}

export interface Description {
    __typename?: string;
    language?: string;
    value?: string;
}

export interface PreviewURL {
    __typename?: string;
    displayName?: Description;
    mimeType?: string;
    url?: string;
}

export interface PrimaryTitle {
    __typename?: string;
    originalTitleText?: NameText;
    releaseYear?: ReleaseYear;
    titleText?: NameText;
    titleType?: PrimaryTitleTitleType;
}

export interface ReleaseYear {
    __typename?: ReleaseYearTypename;
    endYear?: number | null;
    year?: number;
}

export type ReleaseYearTypename = "YearRange";

export interface PrimaryTitleTitleType {
    __typename?: string;
    canHaveEpisodes?: boolean;
}

export interface NodeRuntime {
    __typename?: string;
    value?: number;
}

export interface Thumbnail {
    __typename?: string;
    height?: number;
    url?: string;
    width?: number;
}

export interface SearchIndexing {
    __typename?: string;
    disableIndexing?: boolean;
}

export interface SubNavBio {
    __typename?: string;
    id?: string;
}

export interface MainColumnData {
    __typename?: string;
    akas?: KnownFor;
    birthDate?: MainColumnDataBirthDate;
    birthLocation?: BirthLocation;
    children?: Children;
    deathCause?: null;
    deathDate?: MainColumnDataBirthDate;
    deathLocation?: BirthLocation;
    demographicData?: null;
    height?: Height;
    id?: string;
    images?: Children;
    imageUploadLink?: null;
    knownFor?: PurpleKnownFor;
    nameFilmBiography?: Images;
    namePortrayal?: Images;
    namePrintBiography?: Images;
    nameText?: NameText;
    nickNames?: Height[];
    nominations?: Images;
    others?: Others;
    otherWorks?: Children;
    parents?: Others;
    personalDetailsExternalLinks?: Children;
    personalDetailsSpouses?: null;
    prestigiousAwardSummary?: PrestigiousAwardSummary;
    primaryImage?: PrimaryImage;
    primaryProfessions?: MainColumnDataPrimaryProfession[];
    publicityArticle?: Images;
    publicityInterview?: Images;
    publicityListings?: Images;
    publicityMagazineCover?: Images;
    publicityPictorial?: Images;
    quotes?: Quotes;
    quotesTotal?: Images;
    titleSalaries?: TitleSalaries;
    titleSalariesTotal?: Images;
    trademarks?: Quotes;
    trademarksTotal?: Images;
    trivia?: Quotes;
    triviaTotal?: Images;
    wins?: Images;
}

export interface MainColumnDataBirthDate {
    __typename?: string;
    dateComponents?: DateComponents;
    displayableProperty?: DisplayableProperty;
}

export interface BirthLocation {
    __typename?: string;
    displayableProperty?: DisplayableProperty;
    text?: string;
}

export interface Children {
    __typename?: string;
    edges?: ChildrenEdge[];
    pageInfo?: PageInfo;
    total?: number;
}

export interface ChildrenEdge {
    __typename?: string;
    node?: TentacledNode;
}

export interface TentacledNode {
    __typename?: string;
    caption?: CaptionClass;
    category?: null;
    displayableProperty?: DisplayableProperty;
    height?: number;
    id?: string;
    label?: string;
    season?: string;
    text?: BodyClass;
    url?: string;
    width?: number;
    year?: string;
}

export interface BodyClass {
    __typename?: TextTypename;
}

export interface PageInfo {
    __typename?: string;
    endCursor?: null | string;
    hasNextPage?: boolean;
}

export interface Height {
    __typename?: string;
    displayableProperty?: DisplayableProperty;
}

export interface PurpleKnownFor {
    __typename?: string;
    edges?: PurpleEdge[];
}

export interface PurpleEdge {
    __typename?: string;
    node?: StickyNode;
}

export interface StickyNode {
    __typename?: string;
    credit?: Credit;
    summary?: FluffySummary;
    title?: FluffyTitle;
}

export interface Credit {
    __typename?: string;
    attributes?: null;
    category?: Award;
    characters?: Character[];
    episodeCredits?: EpisodeCredits;
}

export interface Award {
    __typename?: AwardTypename;
    event?: SubNavBio;
    id?: string;
    text?: string;
}

export type AwardTypename =
    | "AwardDetails"
    | "CreditCategory"
    | "NameRelationType"
    | "ProductionStage";

export interface Character {
    __typename?: string;
    name?: string;
}

export interface EpisodeCredits {
    __typename?: string;
    displayableSeasons?: Children;
    displayableYears?: Children;
    total?: number;
    yearRange?: ReleaseYear | null;
}

export interface FluffySummary {
    __typename?: string;
    attributes?: null;
    episodeCount?: number | null;
    principalCategory?: Award;
    principalCharacters?: Character[];
    principalJobs?: null;
    yearRange?: ReleaseYear;
}

export interface FluffyTitle {
    __typename?: string;
    canRate?: CanRate;
    certificate?: Certificate;
    episodes?: Episodes | null;
    genres?: Genres;
    id?: string;
    latestTrailer?: SubNavBio;
    originalTitleText?: NameText;
    primaryImage?: PrimaryImage;
    productionStatus?: ProductionStatus;
    ratingsSummary?: RatingsSummary;
    releaseYear?: ReleaseYear;
    runtime?: TitleRuntime;
    series?: null;
    titleText?: NameText;
    titleType?: TitleTitleType;
}

export interface CanRate {
    __typename?: string;
    isRatable?: boolean;
}

export interface Certificate {
    __typename?: string;
    rating?: string;
}

export interface Episodes {
    __typename?: string;
    displayableSeasons?: Children;
    displayableYears?: Children;
}

export interface Genres {
    __typename?: string;
    genres?: NameText[];
}

export interface ProductionStatus {
    __typename?: string;
    currentProductionStage?: Award;
}

export interface RatingsSummary {
    __typename?: string;
    aggregateRating?: number;
    voteCount?: number;
}

export interface TitleRuntime {
    __typename?: string;
    seconds?: number;
}

export interface TitleTitleType {
    __typename?: string;
    canHaveEpisodes?: boolean;
    displayableProperty?: DisplayableProperty;
    id?: string;
    text?: string;
}

export interface Others {
    __typename?: string;
    edges?: OthersEdge[];
    pageInfo?: PageInfo;
    total?: number;
}

export interface OthersEdge {
    __typename?: string;
    node?: IndigoNode;
}

export interface IndigoNode {
    __typename?: string;
    relationName?: RelationName;
    relationshipType?: Award;
}

export interface RelationName {
    __typename?: string;
    displayableProperty?: DisplayableProperty;
    name?: SubNavBio | null;
}

export interface PrestigiousAwardSummary {
    __typename?: string;
    award?: Award;
    nominations?: number;
    wins?: number;
}

export interface MainColumnDataPrimaryProfession {
    __typename?: string;
    category?: Award;
}

export interface Quotes {
    __typename?: string;
    edges?: QuotesEdge[];
}

export interface QuotesEdge {
    __typename?: string;
    node?: IndecentNode;
}

export interface IndecentNode {
    __typename?: string;
    displayableArticle?: DisplayableArticle;
}

export interface DisplayableArticle {
    __typename?: string;
    body?: BodyClass;
}

export interface TitleSalaries {
    __typename?: string;
    edges?: TitleSalariesEdge[];
}

export interface TitleSalariesEdge {
    __typename?: string;
    node?: HilariousNode;
}

export interface HilariousNode {
    __typename?: string;
    displayableProperty?: DisplayableProperty;
    title?: TentacledTitle;
}

export interface TentacledTitle {
    __typename?: string;
    id?: string;
    originalTitleText?: NameText;
    releaseYear?: PurpleReleaseYear;
    titleText?: NameText;
}

export interface PurpleReleaseYear {
    __typename?: ReleaseYearTypename;
    year?: number;
}

export interface NameImageUploadLinkData {
    __typename?: string;
    id?: string;
    imageUploadLink?: null;
}

export interface Query {
    nmconst?: string;
    opfInternalRedirectIsNewUser?: string;
    opfInternalRedirectSessionId?: string;
    opfInternalRedirectSessionToken?: string;
    opfInternalRedirectSourceHost?: string;
    opfInternalRedirectUbid?: string;
    ref_?: string;
}

export interface RuntimeConfig {
    adsPublicSiteHost?: string;
    cachedGraphQLEndpoint?: string;
    env?: string;
    graphQLEndpoint?: string;
    graphQLTimeout?: string;
    sidecarHost?: string;
    stage?: string;
    vpcGraphQLEndpoint?: string;
}
