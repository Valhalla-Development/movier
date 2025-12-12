export type PersonDetailsNextData = {
    props?: Props;
    page?: string;
    query?: Query;
    buildId?: string;
    assetPrefix?: string;
    runtimeConfig?: RuntimeConfig;
    isFallback?: boolean;
    gssp?: boolean;
    customServer?: boolean;
    scriptLoader?: unknown[];
};

export type Props = {
    pageProps?: PageProps;
    __N_SSP?: boolean;
};

export type PageProps = {
    nmconst?: string;
    aboveTheFold?: AboveTheFold;
    mainColumnData?: MainColumnData;
    nameImageUploadLinkData?: NameImageUploadLinkData;
    urqlState?: null;
    fetchState?: null;
};

export type AboveTheFold = {
    id?: string;
    nameText?: NameText;
    searchIndexing?: SearchIndexing;
    disambiguator?: null;
    knownFor?: KnownFor;
    images?: Images;
    primaryImage?: PrimaryImage;
    meta?: Meta;
    bio?: Bio;
    primaryProfessions?: AboveTheFoldPrimaryProfession[];
    birthDate?: AboveTheFoldBirthDate;
    deathDate?: null;
    deathStatus?: string;
    meterRanking?: MeterRanking;
    subNavBio?: SubNavBio;
    subNavTrivia?: Images;
    subNavAwardNominations?: Images;
    videos?: Images;
    primaryVideos?: PrimaryVideos;
    __typename?: string;
};

export type Bio = {
    text?: CaptionClass;
    __typename?: string;
};

export type CaptionClass = {
    plainText?: string;
    __typename?: TextTypename;
};

export type TextTypename = "Markdown";

export type AboveTheFoldBirthDate = {
    displayableProperty?: DisplayableProperty;
    date?: Date;
    dateComponents?: DateComponents;
    __typename?: string;
};

export type DateComponents = {
    day?: number;
    month?: number;
    year?: number;
    isBCE?: boolean;
    __typename?: string;
};

export type DisplayableProperty = {
    value?: CaptionClass;
    __typename?: string;
};

export type Images = {
    total?: number;
    __typename?: string;
};

export type KnownFor = {
    edges?: AkasEdge[];
    __typename?: string;
};

export type AkasEdge = {
    node?: PurpleNode;
    __typename?: string;
};

export type PurpleNode = {
    title?: PurpleTitle;
    summary?: PurpleSummary;
    __typename?: string;
};

export type PurpleSummary = {
    principalCategory?: NameText;
    __typename?: string;
};

export type NameText = {
    text?: string;
    __typename?: NameTextTypename;
};

export type NameTextTypename = "CreditCategory" | "Genre" | "NameText" | "TitleText";

export type PurpleTitle = {
    titleText?: NameText;
    __typename?: string;
};

export type Meta = {
    canonicalId?: string;
    publicationStatus?: string;
    __typename?: string;
};

export type MeterRanking = {
    currentRank?: number;
    rankChange?: RankChange;
    __typename?: string;
};

export type RankChange = {
    changeDirection?: string;
    difference?: number;
    __typename?: string;
};

export type PrimaryImage = {
    id?: string;
    url?: string;
    height?: number;
    width?: number;
    caption?: CaptionClass;
    __typename?: PrimaryImageTypename;
};

export type PrimaryImageTypename = "Image";

export type AboveTheFoldPrimaryProfession = {
    category?: NameText;
    __typename?: string;
};

export type PrimaryVideos = {
    edges?: PrimaryVideosEdge[];
    __typename?: string;
};

export type PrimaryVideosEdge = {
    node?: FluffyNode;
    __typename?: string;
};

export type FluffyNode = {
    id?: string;
    isMature?: boolean;
    thumbnail?: Thumbnail;
    runtime?: NodeRuntime;
    description?: Description;
    name?: Description;
    previewURLs?: PreviewURL[];
    contentType?: ContentType;
    primaryTitle?: PrimaryTitle;
    __typename?: string;
};

export type ContentType = {
    id?: string;
    displayName?: DisplayName;
    __typename?: string;
};

export type DisplayName = {
    value?: string;
    __typename?: string;
};

export type Description = {
    value?: string;
    language?: string;
    __typename?: string;
};

export type PreviewURL = {
    displayName?: Description;
    mimeType?: string;
    url?: string;
    __typename?: string;
};

export type PrimaryTitle = {
    originalTitleText?: NameText;
    titleText?: NameText;
    releaseYear?: ReleaseYear;
    titleType?: PrimaryTitleTitleType;
    __typename?: string;
};

export type ReleaseYear = {
    year?: number;
    endYear?: number | null;
    __typename?: ReleaseYearTypename;
};

export type ReleaseYearTypename = "YearRange";

export type PrimaryTitleTitleType = {
    canHaveEpisodes?: boolean;
    __typename?: string;
};

export type NodeRuntime = {
    value?: number;
    __typename?: string;
};

export type Thumbnail = {
    url?: string;
    height?: number;
    width?: number;
    __typename?: string;
};

export type SearchIndexing = {
    disableIndexing?: boolean;
    __typename?: string;
};

export type SubNavBio = {
    id?: string;
    __typename?: string;
};

export type MainColumnData = {
    id?: string;
    wins?: Images;
    nominations?: Images;
    prestigiousAwardSummary?: PrestigiousAwardSummary;
    images?: Children;
    primaryImage?: PrimaryImage;
    imageUploadLink?: null;
    nameText?: NameText;
    knownFor?: PurpleKnownFor;
    primaryProfessions?: MainColumnDataPrimaryProfession[];
    height?: Height;
    birthDate?: MainColumnDataBirthDate;
    birthLocation?: BirthLocation;
    deathDate?: MainColumnDataBirthDate;
    deathLocation?: BirthLocation;
    deathCause?: null;
    akas?: KnownFor;
    otherWorks?: Children;
    personalDetailsSpouses?: null;
    parents?: Others;
    children?: Children;
    others?: Others;
    personalDetailsExternalLinks?: Children;
    publicityListings?: Images;
    nameFilmBiography?: Images;
    namePrintBiography?: Images;
    namePortrayal?: Images;
    publicityInterview?: Images;
    publicityArticle?: Images;
    publicityPictorial?: Images;
    publicityMagazineCover?: Images;
    demographicData?: null;
    triviaTotal?: Images;
    trivia?: Quotes;
    quotesTotal?: Images;
    quotes?: Quotes;
    trademarksTotal?: Images;
    trademarks?: Quotes;
    nickNames?: Height[];
    titleSalariesTotal?: Images;
    titleSalaries?: TitleSalaries;
    __typename?: string;
};

export type MainColumnDataBirthDate = {
    dateComponents?: DateComponents;
    displayableProperty?: DisplayableProperty;
    __typename?: string;
};

export type BirthLocation = {
    text?: string;
    displayableProperty?: DisplayableProperty;
    __typename?: string;
};

export type Children = {
    total?: number;
    pageInfo?: PageInfo;
    edges?: ChildrenEdge[];
    __typename?: string;
};

export type ChildrenEdge = {
    node?: TentacledNode;
    __typename?: string;
};

export type TentacledNode = {
    id?: string;
    url?: string;
    caption?: CaptionClass;
    height?: number;
    width?: number;
    __typename?: string;
    season?: string;
    displayableProperty?: DisplayableProperty;
    year?: string;
    category?: null;
    text?: BodyClass;
    label?: string;
};

export type BodyClass = {
    __typename?: TextTypename;
};

export type PageInfo = {
    hasNextPage?: boolean;
    endCursor?: null | string;
    __typename?: string;
};

export type Height = {
    displayableProperty?: DisplayableProperty;
    __typename?: string;
};

export type PurpleKnownFor = {
    edges?: PurpleEdge[];
    __typename?: string;
};

export type PurpleEdge = {
    node?: StickyNode;
    __typename?: string;
};

export type StickyNode = {
    summary?: FluffySummary;
    credit?: Credit;
    title?: FluffyTitle;
    __typename?: string;
};

export type Credit = {
    attributes?: null;
    category?: Award;
    characters?: Character[];
    episodeCredits?: EpisodeCredits;
    __typename?: string;
};

export type Award = {
    id?: string;
    text?: string;
    __typename?: AwardTypename;
    event?: SubNavBio;
};

export type AwardTypename =
    | "AwardDetails"
    | "CreditCategory"
    | "NameRelationType"
    | "ProductionStage";

export type Character = {
    name?: string;
    __typename?: string;
};

export type EpisodeCredits = {
    total?: number;
    yearRange?: ReleaseYear | null;
    displayableYears?: Children;
    displayableSeasons?: Children;
    __typename?: string;
};

export type FluffySummary = {
    attributes?: null;
    episodeCount?: number | null;
    principalCategory?: Award;
    principalCharacters?: Character[];
    principalJobs?: null;
    yearRange?: ReleaseYear;
    __typename?: string;
};

export type FluffyTitle = {
    id?: string;
    canRate?: CanRate;
    certificate?: Certificate;
    originalTitleText?: NameText;
    titleText?: NameText;
    titleType?: TitleTitleType;
    primaryImage?: PrimaryImage;
    ratingsSummary?: RatingsSummary;
    latestTrailer?: SubNavBio;
    releaseYear?: ReleaseYear;
    runtime?: TitleRuntime;
    series?: null;
    episodes?: Episodes | null;
    genres?: Genres;
    productionStatus?: ProductionStatus;
    __typename?: string;
};

export type CanRate = {
    isRatable?: boolean;
    __typename?: string;
};

export type Certificate = {
    rating?: string;
    __typename?: string;
};

export type Episodes = {
    displayableSeasons?: Children;
    displayableYears?: Children;
    __typename?: string;
};

export type Genres = {
    genres?: NameText[];
    __typename?: string;
};

export type ProductionStatus = {
    currentProductionStage?: Award;
    __typename?: string;
};

export type RatingsSummary = {
    aggregateRating?: number;
    voteCount?: number;
    __typename?: string;
};

export type TitleRuntime = {
    seconds?: number;
    __typename?: string;
};

export type TitleTitleType = {
    canHaveEpisodes?: boolean;
    displayableProperty?: DisplayableProperty;
    text?: string;
    id?: string;
    __typename?: string;
};

export type Others = {
    total?: number;
    pageInfo?: PageInfo;
    edges?: OthersEdge[];
    __typename?: string;
};

export type OthersEdge = {
    node?: IndigoNode;
    __typename?: string;
};

export type IndigoNode = {
    relationshipType?: Award;
    relationName?: RelationName;
    __typename?: string;
};

export type RelationName = {
    name?: SubNavBio | null;
    displayableProperty?: DisplayableProperty;
    __typename?: string;
};

export type PrestigiousAwardSummary = {
    nominations?: number;
    wins?: number;
    award?: Award;
    __typename?: string;
};

export type MainColumnDataPrimaryProfession = {
    category?: Award;
    __typename?: string;
};

export type Quotes = {
    edges?: QuotesEdge[];
    __typename?: string;
};

export type QuotesEdge = {
    node?: IndecentNode;
    __typename?: string;
};

export type IndecentNode = {
    displayableArticle?: DisplayableArticle;
    __typename?: string;
};

export type DisplayableArticle = {
    body?: BodyClass;
    __typename?: string;
};

export type TitleSalaries = {
    edges?: TitleSalariesEdge[];
    __typename?: string;
};

export type TitleSalariesEdge = {
    node?: HilariousNode;
    __typename?: string;
};

export type HilariousNode = {
    title?: TentacledTitle;
    displayableProperty?: DisplayableProperty;
    __typename?: string;
};

export type TentacledTitle = {
    id?: string;
    titleText?: NameText;
    originalTitleText?: NameText;
    releaseYear?: PurpleReleaseYear;
    __typename?: string;
};

export type PurpleReleaseYear = {
    year?: number;
    __typename?: ReleaseYearTypename;
};

export type NameImageUploadLinkData = {
    id?: string;
    imageUploadLink?: null;
    __typename?: string;
};

export type Query = {
    ref_?: string;
    opfInternalRedirectIsNewUser?: string;
    opfInternalRedirectSessionId?: string;
    opfInternalRedirectSessionToken?: string;
    opfInternalRedirectUbid?: string;
    opfInternalRedirectSourceHost?: string;
    nmconst?: string;
};

export type RuntimeConfig = {
    sidecarHost?: string;
    env?: string;
    stage?: string;
    cachedGraphQLEndpoint?: string;
    graphQLEndpoint?: string;
    vpcGraphQLEndpoint?: string;
    graphQLTimeout?: string;
    adsPublicSiteHost?: string;
};
