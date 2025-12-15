export type IMDBNextData = {
    props?: Props;
    page?: string;
    query?: Query;
    buildID?: string;
    assetPrefix?: string;
    runtimeConfig?: RuntimeConfig;
    isFallback?: boolean;
    dynamicIDS?: number[];
    gssp?: boolean;
    customServer?: boolean;
    scriptLoader?: unknown[];
};

type Props = {
    pageProps?: PageProps;
    nSSP?: boolean;
};

type PageProps = {
    tconst?: string;
    aboveTheFoldData?: AboveTheFoldData;
    mainColumnData?: MainColumnData;
    requestContext?: RequestContext;
    cmsContext?: CMSContext;
    translationContext?: TranslationContext;
    urqlState?: null;
    fetchState?: null;
};

type AboveTheFoldData = {
    id?: string;
    productionStatus?: ProductionStatus;
    canHaveEpisodes?: boolean;
    series?: null;
    titleText?: OriginalTitleText;
    titleType?: TitleType;
    originalTitleText?: OriginalTitleText;
    certificate?: AboveTheFoldDataCertificate;
    releaseYear?: AboveTheFoldDataReleaseYear;
    releaseDate?: ReleaseDate;
    runtime?: AboveTheFoldDataRuntime;
    canRate?: CanRate;
    ratingsSummary?: AboveTheFoldDataRatingsSummary;
    meterRanking?: MeterRanking;
    primaryImage?: NodeClass;
    images?: Credits;
    videos?: Credits;
    primaryVideos?: PrimaryVideos;
    externalLinks?: Credits;
    metacritic?: Metacritic;
    keywords?: Keywords;
    genres?: Genres;
    plot?: Plot;
    plotContributionLink?: Link;
    credits?: Credits;
    principalCredits?: PrincipalCredit[];
    reviews?: Credits;
    criticReviewsTotal?: Credits;
    triviaTotal?: Credits;
    meta?: Meta;
    castPageTitle?: CastPageTitle;
    creatorsPageTitle?: unknown[];
    directorsPageTitle?: DirectorsPageTitle[];
    countriesOfOrigin?: AboveTheFoldDataCountriesOfOrigin;
    production?: Production;
    featuredReviews?: AboveTheFoldDataFeaturedReviews;
    typename?: AboveTheFoldDataTypename;
};

type CanRate = {
    isRatable?: boolean;
    typename?: CanRateTypename;
};

type CanRateTypename = "CanRate";

type CastPageTitle = {
    edges?: CastPageTitleEdge[];
    typename?: string;
};

type CastPageTitleEdge = {
    node?: DirectorsPageTitleNode;
    typename?: PurpleTypename;
};

type DirectorsPageTitleNode = {
    name?: PurpleName;
    typename?: string;
};

type PurpleName = {
    nameText?: OriginalTitleText;
    typename?: FluffyTypename;
};

type OriginalTitleText = {
    text?: string;
    typename?: string;
};

type FluffyTypename = "Name";

type PurpleTypename = "CreditEdge";

type AboveTheFoldDataCertificate = {
    rating?: Rating;
    typename?: CertificateTypename;
};

type Rating = "PG" | "PG-13" | "R";

type CertificateTypename = "Certificate";

type AboveTheFoldDataCountriesOfOrigin = {
    countries?: PrimaryImageElement[];
    typename?: string;
};

type PrimaryImageElement = {
    id?: string;
    typename?: string;
};

type Credits = {
    total?: number;
    typename?: string;
};

type DirectorsPageTitle = {
    credits?: DirectorsPageTitleNode[];
    typename?: string;
};

type AboveTheFoldDataFeaturedReviews = {
    edges?: PurpleEdge[];
    typename?: string;
};

type PurpleEdge = {
    node?: PurpleNode;
    typename?: string;
};

type PurpleNode = {
    author?: PurpleAuthor;
    summary?: Summary;
    text?: PurpleText;
    authorRating?: number;
    submissionDate?: Date;
    typename?: string;
};

type PurpleAuthor = {
    nickName?: string;
    typename?: string;
};

type Summary = {
    originalText?: string;
    typename?: string;
};

type PurpleText = {
    originalText?: PlotText;
    typename?: string;
};

type PlotText = {
    plainText?: string;
    typename?: PlotTextTypename;
};

type PlotTextTypename = "Markdown";

type Genres = {
    genres?: CurrentProductionStage[];
    typename?: GenresTypename;
};

type CurrentProductionStage = {
    text?: string;
    id?: string;
    typename?: string;
    event?: PrimaryImageElement;
    attributes?: unknown[];
};

type GenresTypename = "Genres";

type Keywords = {
    total?: number;
    edges?: KeywordsEdge[];
    typename?: string;
};

type KeywordsEdge = {
    node?: OriginalTitleText;
    typename?: string;
};

type Meta = {
    canonicalID?: string;
    publicationStatus?: string;
    typename?: string;
};

type Metacritic = {
    metascore?: Metascore;
    typename?: string;
};

type Metascore = {
    score?: number;
    typename?: string;
};

type MeterRanking = {
    currentRank?: number;
    rankChange?: RankChange;
    typename?: string;
};

type RankChange = {
    changeDirection?: string;
    difference?: number;
    typename?: string;
};

type Plot = {
    plotText?: PlotText;
    language?: PrimaryImageElement;
    typename?: string;
};

type Link = {
    url?: string;
    typename?: string;
};

type NodeClass = {
    id?: string;
    width?: number;
    height?: number;
    url?: string;
    caption?: PlotText;
    typename?: PrimaryImageTypename;
};

type PrimaryImageTypename = "Image" | "Thumbnail";

type PrimaryVideos = {
    edges?: PrimaryVideosEdge[];
    typename?: string;
};

type PrimaryVideosEdge = {
    node?: FluffyNode;
    typename?: TentacledTypename;
};

type FluffyNode = {
    id?: string;
    isMature?: boolean;
    contentType?: PurpleContentType;
    thumbnail?: NodeClass;
    runtime?: PurpleRuntime;
    description?: Description;
    name?: Description;
    playbackURLs?: URL[];
    previewURLs?: URL[];
    typename?: StickyTypename;
};

type PurpleContentType = {
    id?: string;
    displayName?: NameClass;
    typename?: ContentTypeTypename;
};

type NameClass = {
    value?: string;
    typename?: DisplayNameTypename;
};

type DisplayNameTypename = "LocalizedString";

type ContentTypeTypename = "VideoContentType";

type Description = {
    value?: string;
    language?: string;
    typename?: DisplayNameTypename;
};

type URL = {
    displayName?: Description;
    mimeType?: string;
    url?: string;
    typename?: string;
};

type PurpleRuntime = {
    value?: number;
    typename?: IndigoTypename;
};

type IndigoTypename = "VideoRuntime";

type StickyTypename = "Video";

type TentacledTypename = "VideoEdge";

type PrincipalCredit = {
    totalCredits?: number;
    category?: CurrentProductionStage;
    credits?: Credit[];
    typename?: string;
};

type Credit = {
    name?: FluffyName;
    attributes?: null;
    typename?: string;
};

type FluffyName = {
    nameText?: OriginalTitleText;
    id?: string;
    typename?: FluffyTypename;
    primaryImage?: NodeClass | null;
};

type Production = {
    edges?: ProductionEdge[];
    typename?: string;
};

type ProductionEdge = {
    node?: TentacledNode;
    typename?: string;
};

type TentacledNode = {
    company?: Company;
    typename?: string;
};

type Company = {
    id?: string;
    companyText?: OriginalTitleText;
    typename?: string;
};

type ProductionStatus = {
    currentProductionStage?: CurrentProductionStage;
    productionStatusHistory?: ProductionStatusHistory[];
    restriction?: null;
    typename?: string;
};

type ProductionStatusHistory = {
    status?: CurrentProductionStage;
    typename?: ProductionStatusHistoryTypename;
};

type ProductionStatusHistoryTypename = "ProductionStatusHistory";

type AboveTheFoldDataRatingsSummary = {
    aggregateRating?: number | null;
    voteCount?: number;
    typename?: RatingsSummaryTypename;
};

type RatingsSummaryTypename = "RatingsSummary";

type ReleaseDate = {
    day?: number;
    month?: number;
    year?: number;
    typename?: string;
    country?: CurrentProductionStage;
};

type AboveTheFoldDataReleaseYear = {
    year?: number;
    endYear?: null;
    typename?: ReleaseYearTypename;
};

type ReleaseYearTypename = "YearRange";

type AboveTheFoldDataRuntime = {
    seconds?: number;
    typename?: IndecentTypename;
};

type IndecentTypename = "Runtime";

type TitleType = {
    text?: string;
    id?: string;
    isSeries?: boolean;
    isEpisode?: boolean;
    typename?: string;
};

type AboveTheFoldDataTypename = "Title";

type CMSContext = {
    transformedPlacements?: TransformedPlacements;
    isDebug?: boolean;
};

type TransformedPlacements = {
    right3?: TransformedPlacementsRight3;
    right5?: TransformedPlacementsRight5;
};

type TransformedPlacementsRight3 = {
    componentName?: string;
    arguments?: ContextClass;
    symphonyMetadata?: SymphonyMetadata;
    transformedArguments?: TransformedArguments;
};

type ContextClass = {
    the03_ImageTargetURL?: string;
    urlLabel?: string;
    the03_ImageSize?: string;
    heading?: string;
    blurbContent?: string;
    blurbPosition?: string;
    widgetref?: string;
    widgetType?: string;
    targetURL?: string;
    the03_ImageImageID?: string;
    generatedPrefix?: string;
    slotName?: string;
};

type SymphonyMetadata = {
    requestID?: string;
    marketplaceID?: string;
    merchantID?: string;
    customerID?: string;
    sessionID?: string;
    contentID?: string;
    creativeID?: string;
    placementID?: string;
    msoGroupName?: null;
    msoSlotOrder?: null;
};

type TransformedArguments = {
    the03_ImageTargetURL?: string;
    urlLabel?: string;
    the03_ImageSize?: string;
    heading?: string;
    blurbContent?: string;
    blurbPosition?: string;
    widgetref?: string;
    widgetType?: string;
    targetURL?: string;
    the03_ImageImageID?: string;
    generatedPrefix?: string;
    slotName?: string;
    refTag?: string;
    errors?: Error[];
    displayTitle?: string;
    iconName?: string;
    description?: string;
    overlayCaption?: string;
    callToActionText?: string;
    callToActionURL?: string;
    linkedImages?: LinkedImage[];
    the01_ImageSize?: string;
    the01_ImageImageID?: string;
    the01_ImageImageIDOverride?: string;
    the01_ImageRelatedListID?: string;
};

type Error = {
    code?: string;
    context?: ContextClass;
};

type LinkedImage = {
    imageModel?: ImageModel;
    link?: string;
};

type ImageModel = {
    url?: string;
    caption?: string;
    maxHeight?: number;
    maxWidth?: number;
};

type TransformedPlacementsRight5 = {
    componentName?: string;
    arguments?: Right5_Arguments;
    symphonyMetadata?: SymphonyMetadata;
    transformedArguments?: TransformedArguments;
    queryTypeFlags?: QueryTypeFlags;
};

type Right5_Arguments = {
    urlLabel?: string;
    the01_ImageSize?: string;
    the01_ImageImageID?: string;
    heading?: string;
    blurbContent?: string;
    blurbPosition?: string;
    the01_ImageImageIDOverride?: string;
    the01_ImageRelatedListID?: string;
    widgetref?: string;
    widgetType?: string;
    targetURL?: string;
    generatedPrefix?: string;
    slotName?: string;
};

type QueryTypeFlags = {
    video?: boolean;
};

type MainColumnData = {
    id?: string;
    wins?: Credits;
    nominations?: Credits;
    prestigiousAwardSummary?: PrestigiousAwardSummary;
    ratingsSummary?: MainColumnDataRatingsSummary;
    episodes?: null;
    videos?: Credits;
    videoStrip?: VideoStrip;
    titleMainImages?: TitleMainImages;
    productionStatus?: ProductionStatus;
    primaryImage?: PrimaryImageElement;
    imageUploadLink?: Link;
    titleType?: PrimaryImageElement;
    canHaveEpisodes?: boolean;
    cast?: Cast;
    principalCast?: PrincipalCast[];
    creators?: unknown[];
    directors?: Director[];
    writers?: Director[];
    isAdult?: boolean;
    moreLikeThisTitles?: MoreLikeThisTitles;
    summaries?: Summaries;
    outlines?: Outlines;
    synopses?: Outlines;
    storylineKeywords?: StorylineKeywords;
    taglines?: Keywords;
    genres?: Genres;
    certificate?: MainColumnDataCertificate;
    parentsGuide?: ParentsGuide;
    triviaTotal?: Credits;
    trivia?: Trivia;
    goofsTotal?: Credits;
    goofs?: CrazyCredits;
    quotesTotal?: Credits;
    quotes?: Quotes;
    crazyCredits?: CrazyCredits;
    alternateVersions?: AlternateVersions;
    connections?: Connections;
    soundtrack?: Soundtrack;
    titleText?: OriginalTitleText;
    originalTitleText?: OriginalTitleText;
    releaseYear?: AssociatedTitleReleaseYear;
    reviews?: Credits;
    featuredReviews?: MainColumnDataFeaturedReviews;
    canRate?: CanRate;
    iframeAddReviewLink?: Link;
    faqsTotal?: Credits;
    faqs?: Faqs;
    releaseDate?: ReleaseDate;
    countriesOfOrigin?: MainColumnDataCountriesOfOrigin;
    detailsExternalLinks?: DetailsExternalLinks;
    spokenLanguages?: SpokenLanguages;
    akas?: Akas;
    filmingLocations?: Keywords;
    production?: Production;
    companies?: Credits;
    productionBudget?: ProductionBudget;
    lifetimeGross?: Gross;
    openingWeekendGross?: OpeningWeekendGross;
    worldwideGross?: Gross;
    technicalSpecifications?: TechnicalSpecifications;
    runtime?: AboveTheFoldDataRuntime;
    series?: null;
    news?: News;
    contributionQuestions?: ContributionQuestions;
    typename?: AboveTheFoldDataTypename;
};

type Akas = {
    edges?: KeywordsEdge[];
    typename?: string;
};

type AlternateVersions = {
    total?: number;
    edges?: AlternateVersionsEdge[];
    typename?: string;
};

type AlternateVersionsEdge = {
    node?: StickyNode;
    typename?: string;
};

type StickyNode = {
    text?: TextElement;
    typename?: string;
};

type TextElement = {
    plaidHTML?: string;
    typename?: PlotTextTypename;
};

type Cast = {
    edges?: CastEdge[];
    typename?: string;
};

type CastEdge = {
    node?: PrincipalCastNode;
    typename?: PurpleTypename;
};

type PrincipalCastNode = {
    name?: FluffyName;
    attributes?: OriginalTitleText[] | null;
    characters?: NodeCharacter[];
    episodeCredits?: EpisodeCredits;
    typename?: CreditTypename;
};

type NodeCharacter = {
    name?: string;
    typename?: CharacterTypename;
};

type CharacterTypename = "Character";

type EpisodeCredits = {
    total?: number;
    yearRange?: {
        year: number;
        endYear: number;
    };
    typename?: EpisodeCreditsTypename;
};

type EpisodeCreditsTypename = "EpisodeCastConnection";

type CreditTypename = "Cast";

type MainColumnDataCertificate = {
    rating?: Rating;
    ratingReason?: string;
    ratingsBody?: PrimaryImageElement;
    typename?: CertificateTypename;
};

type Connections = {
    edges?: ConnectionsEdge[];
    typename?: string;
};

type ConnectionsEdge = {
    node?: IndigoNode;
    typename?: string;
};

type IndigoNode = {
    associatedTitle?: AssociatedTitle;
    category?: OriginalTitleText;
    typename?: string;
};

type AssociatedTitle = {
    id?: string;
    releaseYear?: AssociatedTitleReleaseYear;
    titleText?: OriginalTitleText;
    originalTitleText?: OriginalTitleText;
    series?: AssociatedTitleSeries;
    typename?: AboveTheFoldDataTypename;
};

type AssociatedTitleReleaseYear = {
    year?: number;
    typename?: ReleaseYearTypename;
};

type AssociatedTitleSeries = {
    series?: SeriesSeries;
    typename?: string;
};

type SeriesSeries = {
    titleText?: OriginalTitleText;
    originalTitleText?: OriginalTitleText;
    typename?: AboveTheFoldDataTypename;
};

type ContributionQuestions = {
    contributionLink?: Link;
    edges?: unknown[];
    typename?: string;
};

type MainColumnDataCountriesOfOrigin = {
    countries?: CurrentProductionStage[];
    typename?: string;
};

type CrazyCredits = {
    edges?: AlternateVersionsEdge[];
    typename?: string;
};

type DetailsExternalLinks = {
    edges?: DetailsExternalLinksEdge[];
    total?: number;
    typename?: string;
};

type DetailsExternalLinksEdge = {
    node?: IndecentNode;
    typename?: string;
};

type IndecentNode = {
    url?: string;
    label?: string;
    externalLinkRegion?: null;
    typename?: string;
};

type Director = {
    totalCredits?: number;
    category?: OriginalTitleText;
    credits?: Credit[];
    typename?: string;
};

type Faqs = {
    edges?: FaqsEdge[];
    typename?: string;
};

type FaqsEdge = {
    node?: HilariousNode;
    typename?: string;
};

type HilariousNode = {
    id?: string;
    question?: PlotText;
    typename?: string;
};

type MainColumnDataFeaturedReviews = {
    edges?: FluffyEdge[];
    typename?: string;
};

type FluffyEdge = {
    node?: AmbitiousNode;
    typename?: string;
};

type AmbitiousNode = {
    id?: string;
    author?: FluffyAuthor;
    summary?: Summary;
    text?: FluffyText;
    authorRating?: number;
    submissionDate?: Date;
    helpfulness?: Helpfulness;
    typename?: string;
};

type FluffyAuthor = {
    nickName?: string;
    userID?: string;
    typename?: string;
};

type Helpfulness = {
    upVotes?: number;
    downVotes?: number;
    typename?: string;
};

type FluffyText = {
    originalText?: TextElement;
    typename?: string;
};

type Gross = {
    total?: Total;
    typename?: string;
};

type Total = {
    amount?: number;
    currency?: string;
    typename?: string;
};

type MoreLikeThisTitles = {
    edges?: MoreLikeThisTitlesEdge[];
    typename?: string;
};

type MoreLikeThisTitlesEdge = {
    node?: CunningNode;
    typename?: HilariousTypename;
};

type CunningNode = {
    id?: string;
    titleText?: OriginalTitleText;
    titleType?: CurrentProductionStage;
    originalTitleText?: OriginalTitleText;
    primaryImage?: NodeClass;
    releaseYear?: AboveTheFoldDataReleaseYear;
    ratingsSummary?: AboveTheFoldDataRatingsSummary;
    runtime?: AboveTheFoldDataRuntime | null;
    certificate?: AboveTheFoldDataCertificate | null;
    canRate?: CanRate;
    titleCardGenres?: TitleCardGenres;
    canHaveEpisodes?: boolean;
    primaryWatchOption?: PrimaryWatchOption | null;
    typename?: AboveTheFoldDataTypename;
};

type PrimaryWatchOption = {
    additionalWatchOptionsCount?: number;
    typename?: PrimaryWatchOptionTypename;
};

type PrimaryWatchOptionTypename = "PrimaryWatchOption";

type TitleCardGenres = {
    genres?: OriginalTitleText[];
    typename?: GenresTypename;
};

type HilariousTypename = "MoreLikeThisEdge";

type News = {
    edges?: NewsEdge[];
    typename?: string;
};

type NewsEdge = {
    node?: MagentaNode;
    typename?: string;
};

type MagentaNode = {
    id?: string;
    articleTitle?: PlotText;
    date?: Date;
    image?: NodeClass;
    source?: Source;
    typename?: string;
};

type Source = {
    homepage?: Homepage;
    typename?: string;
};

type Homepage = {
    label?: string;
    typename?: string;
};

type OpeningWeekendGross = {
    gross?: Gross;
    weekendEndDate?: Date;
    typename?: string;
};

type Outlines = {
    edges?: OutlinesEdge[];
    typename?: string;
};

type OutlinesEdge = {
    node?: FriskyNode;
    typename?: string;
};

type FriskyNode = {
    plotText?: TextElement;
    typename?: string;
};

type ParentsGuide = {
    guideItems?: Credits;
    typename?: string;
};

type PrestigiousAwardSummary = {
    nominations?: number;
    wins?: number;
    award?: CurrentProductionStage;
    typename?: string;
};

type PrincipalCast = {
    credits?: PrincipalCastNode[];
    typename?: string;
};

type ProductionBudget = {
    budget?: Total;
    typename?: string;
};

type Quotes = {
    edges?: QuotesEdge[];
    typename?: string;
};

type QuotesEdge = {
    node?: MischievousNode;
    typename?: string;
};

type MischievousNode = {
    lines?: Line[];
    typename?: string;
};

type Line = {
    characters?: LineCharacter[];
    text?: string;
    stageDirection?: null;
    typename?: string;
};

type LineCharacter = {
    character?: string;
    name?: PrimaryImageElement;
    typename?: string;
};

type MainColumnDataRatingsSummary = {
    topRanking?: TopRanking;
    typename?: RatingsSummaryTypename;
};

type TopRanking = {
    id?: string;
    text?: NameClass;
    rank?: number;
    typename?: string;
};

type Soundtrack = {
    edges?: SoundtrackEdge[];
    typename?: string;
};

type SoundtrackEdge = {
    node?: BraggadociousNode;
    typename?: string;
};

type BraggadociousNode = {
    text?: string;
    comments?: TextElement[];
    typename?: string;
};

type SpokenLanguages = {
    spokenLanguages?: CurrentProductionStage[];
    typename?: string;
};

type StorylineKeywords = {
    edges?: StorylineKeywordsEdge[];
    total?: number;
    typename?: string;
};

type StorylineKeywordsEdge = {
    node?: Node1;
    typename?: string;
};

type Node1 = {
    legacyID?: string;
    text?: string;
    typename?: string;
};

type Summaries = {
    edges?: SummariesEdge[];
    typename?: string;
};

type SummariesEdge = {
    node?: Node2;
    typename?: string;
};

type Node2 = {
    plotText?: TextElement;
    author?: string;
    typename?: string;
};

type TechnicalSpecifications = {
    soundMixes?: SoundMixes;
    aspectRatios?: AspectRatios;
    colorations?: Colorations;
    typename?: string;
};

type AspectRatios = {
    items?: AspectRatiosItem[];
    typename?: string;
};

type AspectRatiosItem = {
    aspectRatio?: string;
    attributes?: unknown[];
    typename?: string;
};

type Colorations = {
    items?: ColorationsItem[];
    typename?: string;
};

type ColorationsItem = {
    conceptID?: string;
    text?: string;
    attributes?: unknown[];
    typename?: string;
};

type SoundMixes = {
    items?: CurrentProductionStage[];
    typename?: string;
};

type TitleMainImages = {
    total?: number;
    edges?: TitleMainImagesEdge[];
    typename?: string;
};

type TitleMainImagesEdge = {
    node?: NodeClass;
    typename?: AmbitiousTypename;
};

type AmbitiousTypename = "ImageEdge";

type Trivia = {
    edges?: TriviaEdge[];
    typename?: string;
};

type TriviaEdge = {
    node?: Node3;
    typename?: string;
};

type Node3 = {
    text?: TextElement;
    trademark?: null;
    relatedNames?: null;
    typename?: string;
};

type VideoStrip = {
    edges?: VideoStripEdge[];
    typename?: string;
};

type VideoStripEdge = {
    node?: Node4;
    typename?: TentacledTypename;
};

type Node4 = {
    id?: string;
    contentType?: FluffyContentType;
    name?: NameClass;
    runtime?: PurpleRuntime;
    thumbnail?: NodeClass;
    typename?: StickyTypename;
};

type FluffyContentType = {
    displayName?: NameClass;
    typename?: ContentTypeTypename;
};

type RequestContext = {
    timestamp?: Date;
    sidecar?: Sidecar;
    pageType?: string;
    subPageType?: string;
    pageConst?: string;
    refTagPrefix?: string;
    headers?: Headers;
    requestID?: string;
    isInternal?: boolean;
};

type Headers = {
    xForwardedFor?: string;
    xForwardedProto?: string;
    xForwardedPort?: string;
    host?: string;
    xAmznTraceID?: string;
    xForwardedHost?: string;
    xForwardedServer?: string;
    userAgent?: string;
    xAmzRid?: string;
    xAutobahnVia?: string;
    xAutobahnHeaderOrder?: string;
    xAmznCiHTTPVersion?: string;
    xOriginalURI?: string;
    xOriginalMethod?: string;
    xOriginalScheme?: string;
    originalXForwardedFor?: string;
    cookie?: string;
    acceptLanguage?: string;
    accept?: string;
    acceptEncoding?: string;
    xAmznHeaderCount?: string;
    secChUa?: string;
    secChUaMobile?: string;
    secChUaPlatform?: string;
    upgradeInsecureRequests?: string;
    secFetchSite?: string;
    secFetchMode?: string;
    secFetchUser?: string;
    secFetchDest?: string;
    xAmazonFrontier?: string;
    xAmazonWtmTagAtcEnable?: string;
    xAmazonUrlspace?: string;
    xAmazonInternalIPLocation?: string;
    xAmazonInternalIPClass?: string;
};

type Sidecar = {
    account?: Account;
    isFreediveEligible?: boolean;
    placementMap?: PlacementMap;
    weblabs?: Weblabs;
    ads?: Ads;
    localizationResponse?: LocalizationResponse;
    isReferenceViewPreferred?: boolean;
    sessionID?: string;
};

type Account = {
    userName?: string;
    isLoggedIn?: boolean;
};

type Ads = {
    sisPixelMarkup?: string;
    adSlotsInfo?: string;
};

type LocalizationResponse = {
    userCountryCode?: string;
    userLanguage?: string;
    languageForTranslations?: string;
    geolocationCountryCode?: string;
    latitude?: string;
    longitude?: string;
    isOriginalTitlePreferenceSet?: boolean;
    isFullLocalizationEnabled?: boolean;
    isLanguageSelectorEnabled?: boolean;
};

type PlacementMap = {
    right3?: PlacementMapRight3;
    right5?: PlacementMapRight5;
};

type PlacementMapRight3 = {
    componentName?: string;
    arguments?: ContextClass;
    symphonyMetadata?: SymphonyMetadata;
};

type PlacementMapRight5 = {
    componentName?: string;
    arguments?: Right5_Arguments;
    symphonyMetadata?: SymphonyMetadata;
};

type Weblabs = {
    imdbAdsLatencyExperiment419202?: IMDB418056_Class;
    imdbNextTitleMainHeroVideoPlayback369575?: IMDB418056_Class;
    imdbNextTitleMainInlineVideoPlaylisting382226?: IMDB418056_Class;
    imdbAdsWebMediaInterop395798?: IMDBADSWEBMEDIAINTEROP395798_Class;
    imdbNextWebp421674?: IMDBADSWEBMEDIAINTEROP395798_Class;
    imdbWebBranchIntegration380339?: IMDBADSWEBMEDIAINTEROP395798_Class;
    imdbNextClientSideNavigation323089?: IMDB418056_Class;
    imdb418056?: IMDB418056_Class;
    imdbPersistedQueries417749?: IMDBADSWEBMEDIAINTEROP395798_Class;
    imdbBranchKeySelection373673?: IMDB418056_Class;
    imdbTrustarcGdprCookieCompliance274700?: IMDB418056_Class;
    imdbHeroSubnavOrientation418229?: IMDB418056_Class;
    imdbZukoVpcEndpointSwap427660?: IMDBADSWEBMEDIAINTEROP395798_Class;
};

type IMDB418056_Class = {
    c?: boolean;
};

type IMDBADSWEBMEDIAINTEROP395798_Class = {
    t1?: boolean;
};

type TranslationContext = {
    i18n?: I18N;
};

type I18N = {
    translations?: Translations;
    locale?: string;
};

type Translations = {
    resources?: { [key: string]: string };
    default?: Default;
};

type Default = {
    resources?: { [key: string]: string };
};

type Query = {
    tconst?: string;
};

type RuntimeConfig = {
    sidecarHost?: string;
    env?: string;
    stage?: string;
    cachedGraphQLEndpoint?: string;
    graphQLEndpoint?: string;
    vpcGraphQLEndpoint?: string;
    graphQLTimeout?: string;
    adsPublicSiteHost?: string;
};
