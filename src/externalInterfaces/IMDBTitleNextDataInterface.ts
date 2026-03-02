export interface IMDBNextData {
    assetPrefix?: string;
    buildID?: string;
    customServer?: boolean;
    dynamicIDS?: number[];
    gssp?: boolean;
    isFallback?: boolean;
    page?: string;
    props?: Props;
    query?: Query;
    runtimeConfig?: RuntimeConfig;
    scriptLoader?: unknown[];
}

interface Props {
    nSSP?: boolean;
    pageProps?: PageProps;
}

interface PageProps {
    aboveTheFoldData?: AboveTheFoldData;
    cmsContext?: CMSContext;
    fetchState?: null;
    mainColumnData?: MainColumnData;
    requestContext?: RequestContext;
    tconst?: string;
    translationContext?: TranslationContext;
    urqlState?: null;
}

interface AboveTheFoldData {
    canHaveEpisodes?: boolean;
    canRate?: CanRate;
    castPageTitle?: CastPageTitle;
    certificate?: AboveTheFoldDataCertificate;
    countriesOfOrigin?: AboveTheFoldDataCountriesOfOrigin;
    creatorsPageTitle?: unknown[];
    credits?: Credits;
    criticReviewsTotal?: Credits;
    directorsPageTitle?: DirectorsPageTitle[];
    externalLinks?: Credits;
    featuredReviews?: AboveTheFoldDataFeaturedReviews;
    genres?: Genres;
    id?: string;
    images?: Credits;
    keywords?: Keywords;
    meta?: Meta;
    metacritic?: Metacritic;
    meterRanking?: MeterRanking;
    originalTitleText?: OriginalTitleText;
    plot?: Plot;
    plotContributionLink?: Link;
    primaryImage?: NodeClass;
    primaryVideos?: PrimaryVideos;
    principalCredits?: PrincipalCredit[];
    production?: Production;
    productionStatus?: ProductionStatus;
    ratingsSummary?: AboveTheFoldDataRatingsSummary;
    releaseDate?: ReleaseDate;
    releaseYear?: AboveTheFoldDataReleaseYear;
    reviews?: Credits;
    runtime?: AboveTheFoldDataRuntime;
    series?: null;
    titleText?: OriginalTitleText;
    titleType?: TitleType;
    triviaTotal?: Credits;
    typename?: AboveTheFoldDataTypename;
    videos?: Credits;
}

interface CanRate {
    isRatable?: boolean;
    typename?: CanRateTypename;
}

type CanRateTypename = "CanRate";

interface CastPageTitle {
    edges?: CastPageTitleEdge[];
    typename?: string;
}

interface CastPageTitleEdge {
    node?: DirectorsPageTitleNode;
    typename?: PurpleTypename;
}

interface DirectorsPageTitleNode {
    name?: PurpleName;
    typename?: string;
}

interface PurpleName {
    nameText?: OriginalTitleText;
    typename?: FluffyTypename;
}

interface OriginalTitleText {
    text?: string;
    typename?: string;
}

type FluffyTypename = "Name";

type PurpleTypename = "CreditEdge";

interface AboveTheFoldDataCertificate {
    rating?: Rating;
    typename?: CertificateTypename;
}

type Rating = "PG" | "PG-13" | "R";

type CertificateTypename = "Certificate";

interface AboveTheFoldDataCountriesOfOrigin {
    countries?: PrimaryImageElement[];
    typename?: string;
}

interface PrimaryImageElement {
    id?: string;
    typename?: string;
}

interface Credits {
    total?: number;
    typename?: string;
}

interface DirectorsPageTitle {
    credits?: DirectorsPageTitleNode[];
    typename?: string;
}

interface AboveTheFoldDataFeaturedReviews {
    edges?: PurpleEdge[];
    typename?: string;
}

interface PurpleEdge {
    node?: PurpleNode;
    typename?: string;
}

interface PurpleNode {
    author?: PurpleAuthor;
    authorRating?: number;
    submissionDate?: Date;
    summary?: Summary;
    text?: PurpleText;
    typename?: string;
}

interface PurpleAuthor {
    nickName?: string;
    typename?: string;
}

interface Summary {
    originalText?: string;
    typename?: string;
}

interface PurpleText {
    originalText?: PlotText;
    typename?: string;
}

interface PlotText {
    plainText?: string;
    typename?: PlotTextTypename;
}

type PlotTextTypename = "Markdown";

interface Genres {
    genres?: CurrentProductionStage[];
    typename?: GenresTypename;
}

interface CurrentProductionStage {
    attributes?: unknown[];
    event?: PrimaryImageElement;
    id?: string;
    text?: string;
    typename?: string;
}

type GenresTypename = "Genres";

interface Keywords {
    edges?: KeywordsEdge[];
    total?: number;
    typename?: string;
}

interface KeywordsEdge {
    node?: OriginalTitleText;
    typename?: string;
}

interface Meta {
    canonicalID?: string;
    publicationStatus?: string;
    typename?: string;
}

interface Metacritic {
    metascore?: Metascore;
    typename?: string;
}

interface Metascore {
    score?: number;
    typename?: string;
}

interface MeterRanking {
    currentRank?: number;
    rankChange?: RankChange;
    typename?: string;
}

interface RankChange {
    changeDirection?: string;
    difference?: number;
    typename?: string;
}

interface Plot {
    language?: PrimaryImageElement;
    plotText?: PlotText;
    typename?: string;
}

interface Link {
    typename?: string;
    url?: string;
}

interface NodeClass {
    caption?: PlotText;
    height?: number;
    id?: string;
    typename?: PrimaryImageTypename;
    url?: string;
    width?: number;
}

type PrimaryImageTypename = "Image" | "Thumbnail";

interface PrimaryVideos {
    edges?: PrimaryVideosEdge[];
    typename?: string;
}

interface PrimaryVideosEdge {
    node?: FluffyNode;
    typename?: TentacledTypename;
}

interface FluffyNode {
    contentType?: PurpleContentType;
    description?: Description;
    id?: string;
    isMature?: boolean;
    name?: Description;
    playbackURLs?: URL[];
    previewURLs?: URL[];
    runtime?: PurpleRuntime;
    thumbnail?: NodeClass;
    typename?: StickyTypename;
}

interface PurpleContentType {
    displayName?: NameClass;
    id?: string;
    typename?: ContentTypeTypename;
}

interface NameClass {
    typename?: DisplayNameTypename;
    value?: string;
}

type DisplayNameTypename = "LocalizedString";

type ContentTypeTypename = "VideoContentType";

interface Description {
    language?: string;
    typename?: DisplayNameTypename;
    value?: string;
}

interface URL {
    displayName?: Description;
    mimeType?: string;
    typename?: string;
    url?: string;
}

interface PurpleRuntime {
    typename?: IndigoTypename;
    value?: number;
}

type IndigoTypename = "VideoRuntime";

type StickyTypename = "Video";

type TentacledTypename = "VideoEdge";

interface PrincipalCredit {
    category?: CurrentProductionStage;
    credits?: Credit[];
    totalCredits?: number;
    typename?: string;
}

interface Credit {
    attributes?: null;
    name?: FluffyName;
    typename?: string;
}

interface FluffyName {
    id?: string;
    nameText?: OriginalTitleText;
    primaryImage?: NodeClass | null;
    typename?: FluffyTypename;
}

interface Production {
    edges?: ProductionEdge[];
    typename?: string;
}

interface ProductionEdge {
    node?: TentacledNode;
    typename?: string;
}

interface TentacledNode {
    company?: Company;
    typename?: string;
}

interface Company {
    companyText?: OriginalTitleText;
    id?: string;
    typename?: string;
}

interface ProductionStatus {
    currentProductionStage?: CurrentProductionStage;
    productionStatusHistory?: ProductionStatusHistory[];
    restriction?: null;
    typename?: string;
}

interface ProductionStatusHistory {
    status?: CurrentProductionStage;
    typename?: ProductionStatusHistoryTypename;
}

type ProductionStatusHistoryTypename = "ProductionStatusHistory";

interface AboveTheFoldDataRatingsSummary {
    aggregateRating?: number | null;
    typename?: RatingsSummaryTypename;
    voteCount?: number;
}

type RatingsSummaryTypename = "RatingsSummary";

interface ReleaseDate {
    country?: CurrentProductionStage;
    day?: number;
    month?: number;
    typename?: string;
    year?: number;
}

interface AboveTheFoldDataReleaseYear {
    endYear?: null;
    typename?: ReleaseYearTypename;
    year?: number;
}

type ReleaseYearTypename = "YearRange";

interface AboveTheFoldDataRuntime {
    seconds?: number;
    typename?: IndecentTypename;
}

type IndecentTypename = "Runtime";

interface TitleType {
    id?: string;
    isEpisode?: boolean;
    isSeries?: boolean;
    text?: string;
    typename?: string;
}

type AboveTheFoldDataTypename = "Title";

interface CMSContext {
    isDebug?: boolean;
    transformedPlacements?: TransformedPlacements;
}

interface TransformedPlacements {
    right3?: TransformedPlacementsRight3;
    right5?: TransformedPlacementsRight5;
}

interface TransformedPlacementsRight3 {
    arguments?: ContextClass;
    componentName?: string;
    symphonyMetadata?: SymphonyMetadata;
    transformedArguments?: TransformedArguments;
}

interface ContextClass {
    blurbContent?: string;
    blurbPosition?: string;
    generatedPrefix?: string;
    heading?: string;
    slotName?: string;
    targetURL?: string;
    the03_ImageImageID?: string;
    the03_ImageSize?: string;
    the03_ImageTargetURL?: string;
    urlLabel?: string;
    widgetref?: string;
    widgetType?: string;
}

interface SymphonyMetadata {
    contentID?: string;
    creativeID?: string;
    customerID?: string;
    marketplaceID?: string;
    merchantID?: string;
    msoGroupName?: null;
    msoSlotOrder?: null;
    placementID?: string;
    requestID?: string;
    sessionID?: string;
}

interface TransformedArguments {
    blurbContent?: string;
    blurbPosition?: string;
    callToActionText?: string;
    callToActionURL?: string;
    description?: string;
    displayTitle?: string;
    errors?: Error[];
    generatedPrefix?: string;
    heading?: string;
    iconName?: string;
    linkedImages?: LinkedImage[];
    overlayCaption?: string;
    refTag?: string;
    slotName?: string;
    targetURL?: string;
    the01_ImageImageID?: string;
    the01_ImageImageIDOverride?: string;
    the01_ImageRelatedListID?: string;
    the01_ImageSize?: string;
    the03_ImageImageID?: string;
    the03_ImageSize?: string;
    the03_ImageTargetURL?: string;
    urlLabel?: string;
    widgetref?: string;
    widgetType?: string;
}

interface Error {
    code?: string;
    context?: ContextClass;
}

interface LinkedImage {
    imageModel?: ImageModel;
    link?: string;
}

interface ImageModel {
    caption?: string;
    maxHeight?: number;
    maxWidth?: number;
    url?: string;
}

interface TransformedPlacementsRight5 {
    arguments?: Right5_Arguments;
    componentName?: string;
    queryTypeFlags?: QueryTypeFlags;
    symphonyMetadata?: SymphonyMetadata;
    transformedArguments?: TransformedArguments;
}

interface Right5_Arguments {
    blurbContent?: string;
    blurbPosition?: string;
    generatedPrefix?: string;
    heading?: string;
    slotName?: string;
    targetURL?: string;
    the01_ImageImageID?: string;
    the01_ImageImageIDOverride?: string;
    the01_ImageRelatedListID?: string;
    the01_ImageSize?: string;
    urlLabel?: string;
    widgetref?: string;
    widgetType?: string;
}

interface QueryTypeFlags {
    video?: boolean;
}

interface MainColumnData {
    akas?: Akas;
    alternateVersions?: AlternateVersions;
    canHaveEpisodes?: boolean;
    canRate?: CanRate;
    cast?: Cast;
    certificate?: MainColumnDataCertificate;
    companies?: Credits;
    connections?: Connections;
    contributionQuestions?: ContributionQuestions;
    countriesOfOrigin?: MainColumnDataCountriesOfOrigin;
    crazyCredits?: CrazyCredits;
    creators?: unknown[];
    detailsExternalLinks?: DetailsExternalLinks;
    directors?: Director[];
    episodes?: null;
    faqs?: Faqs;
    faqsTotal?: Credits;
    featuredReviews?: MainColumnDataFeaturedReviews;
    filmingLocations?: Keywords;
    genres?: Genres;
    goofs?: CrazyCredits;
    goofsTotal?: Credits;
    id?: string;
    iframeAddReviewLink?: Link;
    imageUploadLink?: Link;
    isAdult?: boolean;
    lifetimeGross?: Gross;
    moreLikeThisTitles?: MoreLikeThisTitles;
    news?: News;
    nominations?: Credits;
    openingWeekendGross?: OpeningWeekendGross;
    originalTitleText?: OriginalTitleText;
    outlines?: Outlines;
    parentsGuide?: ParentsGuide;
    prestigiousAwardSummary?: PrestigiousAwardSummary;
    primaryImage?: PrimaryImageElement;
    principalCast?: PrincipalCast[];
    production?: Production;
    productionBudget?: ProductionBudget;
    productionStatus?: ProductionStatus;
    quotes?: Quotes;
    quotesTotal?: Credits;
    ratingsSummary?: MainColumnDataRatingsSummary;
    releaseDate?: ReleaseDate;
    releaseYear?: AssociatedTitleReleaseYear;
    reviews?: Credits;
    runtime?: AboveTheFoldDataRuntime;
    series?: null;
    soundtrack?: Soundtrack;
    spokenLanguages?: SpokenLanguages;
    storylineKeywords?: StorylineKeywords;
    summaries?: Summaries;
    synopses?: Outlines;
    taglines?: Keywords;
    technicalSpecifications?: TechnicalSpecifications;
    titleMainImages?: TitleMainImages;
    titleText?: OriginalTitleText;
    titleType?: PrimaryImageElement;
    trivia?: Trivia;
    triviaTotal?: Credits;
    typename?: AboveTheFoldDataTypename;
    videoStrip?: VideoStrip;
    videos?: Credits;
    wins?: Credits;
    worldwideGross?: Gross;
    writers?: Director[];
}

interface Akas {
    edges?: KeywordsEdge[];
    typename?: string;
}

interface AlternateVersions {
    edges?: AlternateVersionsEdge[];
    total?: number;
    typename?: string;
}

interface AlternateVersionsEdge {
    node?: StickyNode;
    typename?: string;
}

interface StickyNode {
    text?: TextElement;
    typename?: string;
}

interface TextElement {
    plaidHTML?: string;
    typename?: PlotTextTypename;
}

interface Cast {
    edges?: CastEdge[];
    typename?: string;
}

interface CastEdge {
    node?: PrincipalCastNode;
    typename?: PurpleTypename;
}

interface PrincipalCastNode {
    attributes?: OriginalTitleText[] | null;
    characters?: NodeCharacter[];
    episodeCredits?: EpisodeCredits;
    name?: FluffyName;
    typename?: CreditTypename;
}

interface NodeCharacter {
    name?: string;
    typename?: CharacterTypename;
}

type CharacterTypename = "Character";

interface EpisodeCredits {
    total?: number;
    typename?: EpisodeCreditsTypename;
    yearRange?: {
        year: number;
        endYear: number;
    };
}

type EpisodeCreditsTypename = "EpisodeCastConnection";

type CreditTypename = "Cast";

interface MainColumnDataCertificate {
    rating?: Rating;
    ratingReason?: string;
    ratingsBody?: PrimaryImageElement;
    typename?: CertificateTypename;
}

interface Connections {
    edges?: ConnectionsEdge[];
    typename?: string;
}

interface ConnectionsEdge {
    node?: IndigoNode;
    typename?: string;
}

interface IndigoNode {
    associatedTitle?: AssociatedTitle;
    category?: OriginalTitleText;
    typename?: string;
}

interface AssociatedTitle {
    id?: string;
    originalTitleText?: OriginalTitleText;
    releaseYear?: AssociatedTitleReleaseYear;
    series?: AssociatedTitleSeries;
    titleText?: OriginalTitleText;
    typename?: AboveTheFoldDataTypename;
}

interface AssociatedTitleReleaseYear {
    typename?: ReleaseYearTypename;
    year?: number;
}

interface AssociatedTitleSeries {
    series?: SeriesSeries;
    typename?: string;
}

interface SeriesSeries {
    originalTitleText?: OriginalTitleText;
    titleText?: OriginalTitleText;
    typename?: AboveTheFoldDataTypename;
}

interface ContributionQuestions {
    contributionLink?: Link;
    edges?: unknown[];
    typename?: string;
}

interface MainColumnDataCountriesOfOrigin {
    countries?: CurrentProductionStage[];
    typename?: string;
}

interface CrazyCredits {
    edges?: AlternateVersionsEdge[];
    typename?: string;
}

interface DetailsExternalLinks {
    edges?: DetailsExternalLinksEdge[];
    total?: number;
    typename?: string;
}

interface DetailsExternalLinksEdge {
    node?: IndecentNode;
    typename?: string;
}

interface IndecentNode {
    externalLinkRegion?: null;
    label?: string;
    typename?: string;
    url?: string;
}

interface Director {
    category?: OriginalTitleText;
    credits?: Credit[];
    totalCredits?: number;
    typename?: string;
}

interface Faqs {
    edges?: FaqsEdge[];
    typename?: string;
}

interface FaqsEdge {
    node?: HilariousNode;
    typename?: string;
}

interface HilariousNode {
    id?: string;
    question?: PlotText;
    typename?: string;
}

interface MainColumnDataFeaturedReviews {
    edges?: FluffyEdge[];
    typename?: string;
}

interface FluffyEdge {
    node?: AmbitiousNode;
    typename?: string;
}

interface AmbitiousNode {
    author?: FluffyAuthor;
    authorRating?: number;
    helpfulness?: Helpfulness;
    id?: string;
    submissionDate?: Date;
    summary?: Summary;
    text?: FluffyText;
    typename?: string;
}

interface FluffyAuthor {
    nickName?: string;
    typename?: string;
    userID?: string;
}

interface Helpfulness {
    downVotes?: number;
    typename?: string;
    upVotes?: number;
}

interface FluffyText {
    originalText?: TextElement;
    typename?: string;
}

interface Gross {
    total?: Total;
    typename?: string;
}

interface Total {
    amount?: number;
    currency?: string;
    typename?: string;
}

interface MoreLikeThisTitles {
    edges?: MoreLikeThisTitlesEdge[];
    typename?: string;
}

interface MoreLikeThisTitlesEdge {
    node?: CunningNode;
    typename?: HilariousTypename;
}

interface CunningNode {
    canHaveEpisodes?: boolean;
    canRate?: CanRate;
    certificate?: AboveTheFoldDataCertificate | null;
    id?: string;
    originalTitleText?: OriginalTitleText;
    primaryImage?: NodeClass;
    primaryWatchOption?: PrimaryWatchOption | null;
    ratingsSummary?: AboveTheFoldDataRatingsSummary;
    releaseYear?: AboveTheFoldDataReleaseYear;
    runtime?: AboveTheFoldDataRuntime | null;
    titleCardGenres?: TitleCardGenres;
    titleText?: OriginalTitleText;
    titleType?: CurrentProductionStage;
    typename?: AboveTheFoldDataTypename;
}

interface PrimaryWatchOption {
    additionalWatchOptionsCount?: number;
    typename?: PrimaryWatchOptionTypename;
}

type PrimaryWatchOptionTypename = "PrimaryWatchOption";

interface TitleCardGenres {
    genres?: OriginalTitleText[];
    typename?: GenresTypename;
}

type HilariousTypename = "MoreLikeThisEdge";

interface News {
    edges?: NewsEdge[];
    typename?: string;
}

interface NewsEdge {
    node?: MagentaNode;
    typename?: string;
}

interface MagentaNode {
    articleTitle?: PlotText;
    date?: Date;
    id?: string;
    image?: NodeClass;
    source?: Source;
    typename?: string;
}

interface Source {
    homepage?: Homepage;
    typename?: string;
}

interface Homepage {
    label?: string;
    typename?: string;
}

interface OpeningWeekendGross {
    gross?: Gross;
    typename?: string;
    weekendEndDate?: Date;
}

interface Outlines {
    edges?: OutlinesEdge[];
    typename?: string;
}

interface OutlinesEdge {
    node?: FriskyNode;
    typename?: string;
}

interface FriskyNode {
    plotText?: TextElement;
    typename?: string;
}

interface ParentsGuide {
    guideItems?: Credits;
    typename?: string;
}

interface PrestigiousAwardSummary {
    award?: CurrentProductionStage;
    nominations?: number;
    typename?: string;
    wins?: number;
}

interface PrincipalCast {
    credits?: PrincipalCastNode[];
    typename?: string;
}

interface ProductionBudget {
    budget?: Total;
    typename?: string;
}

interface Quotes {
    edges?: QuotesEdge[];
    typename?: string;
}

interface QuotesEdge {
    node?: MischievousNode;
    typename?: string;
}

interface MischievousNode {
    lines?: Line[];
    typename?: string;
}

interface Line {
    characters?: LineCharacter[];
    stageDirection?: null;
    text?: string;
    typename?: string;
}

interface LineCharacter {
    character?: string;
    name?: PrimaryImageElement;
    typename?: string;
}

interface MainColumnDataRatingsSummary {
    topRanking?: TopRanking;
    typename?: RatingsSummaryTypename;
}

interface TopRanking {
    id?: string;
    rank?: number;
    text?: NameClass;
    typename?: string;
}

interface Soundtrack {
    edges?: SoundtrackEdge[];
    typename?: string;
}

interface SoundtrackEdge {
    node?: BraggadociousNode;
    typename?: string;
}

interface BraggadociousNode {
    comments?: TextElement[];
    text?: string;
    typename?: string;
}

interface SpokenLanguages {
    spokenLanguages?: CurrentProductionStage[];
    typename?: string;
}

interface StorylineKeywords {
    edges?: StorylineKeywordsEdge[];
    total?: number;
    typename?: string;
}

interface StorylineKeywordsEdge {
    node?: Node1;
    typename?: string;
}

interface Node1 {
    legacyID?: string;
    text?: string;
    typename?: string;
}

interface Summaries {
    edges?: SummariesEdge[];
    typename?: string;
}

interface SummariesEdge {
    node?: Node2;
    typename?: string;
}

interface Node2 {
    author?: string;
    plotText?: TextElement;
    typename?: string;
}

interface TechnicalSpecifications {
    aspectRatios?: AspectRatios;
    colorations?: Colorations;
    soundMixes?: SoundMixes;
    typename?: string;
}

interface AspectRatios {
    items?: AspectRatiosItem[];
    typename?: string;
}

interface AspectRatiosItem {
    aspectRatio?: string;
    attributes?: unknown[];
    typename?: string;
}

interface Colorations {
    items?: ColorationsItem[];
    typename?: string;
}

interface ColorationsItem {
    attributes?: unknown[];
    conceptID?: string;
    text?: string;
    typename?: string;
}

interface SoundMixes {
    items?: CurrentProductionStage[];
    typename?: string;
}

interface TitleMainImages {
    edges?: TitleMainImagesEdge[];
    total?: number;
    typename?: string;
}

interface TitleMainImagesEdge {
    node?: NodeClass;
    typename?: AmbitiousTypename;
}

type AmbitiousTypename = "ImageEdge";

interface Trivia {
    edges?: TriviaEdge[];
    typename?: string;
}

interface TriviaEdge {
    node?: Node3;
    typename?: string;
}

interface Node3 {
    relatedNames?: null;
    text?: TextElement;
    trademark?: null;
    typename?: string;
}

interface VideoStrip {
    edges?: VideoStripEdge[];
    typename?: string;
}

interface VideoStripEdge {
    node?: Node4;
    typename?: TentacledTypename;
}

interface Node4 {
    contentType?: FluffyContentType;
    id?: string;
    name?: NameClass;
    runtime?: PurpleRuntime;
    thumbnail?: NodeClass;
    typename?: StickyTypename;
}

interface FluffyContentType {
    displayName?: NameClass;
    typename?: ContentTypeTypename;
}

interface RequestContext {
    headers?: Headers;
    isInternal?: boolean;
    pageConst?: string;
    pageType?: string;
    refTagPrefix?: string;
    requestID?: string;
    sidecar?: Sidecar;
    subPageType?: string;
    timestamp?: Date;
}

interface Headers {
    accept?: string;
    acceptEncoding?: string;
    acceptLanguage?: string;
    cookie?: string;
    host?: string;
    originalXForwardedFor?: string;
    secChUa?: string;
    secChUaMobile?: string;
    secChUaPlatform?: string;
    secFetchDest?: string;
    secFetchMode?: string;
    secFetchSite?: string;
    secFetchUser?: string;
    upgradeInsecureRequests?: string;
    userAgent?: string;
    xAmazonFrontier?: string;
    xAmazonInternalIPClass?: string;
    xAmazonInternalIPLocation?: string;
    xAmazonUrlspace?: string;
    xAmazonWtmTagAtcEnable?: string;
    xAmznCiHTTPVersion?: string;
    xAmznHeaderCount?: string;
    xAmznTraceID?: string;
    xAmzRid?: string;
    xAutobahnHeaderOrder?: string;
    xAutobahnVia?: string;
    xForwardedFor?: string;
    xForwardedHost?: string;
    xForwardedPort?: string;
    xForwardedProto?: string;
    xForwardedServer?: string;
    xOriginalMethod?: string;
    xOriginalScheme?: string;
    xOriginalURI?: string;
}

interface Sidecar {
    account?: Account;
    ads?: Ads;
    isFreediveEligible?: boolean;
    isReferenceViewPreferred?: boolean;
    localizationResponse?: LocalizationResponse;
    placementMap?: PlacementMap;
    sessionID?: string;
    weblabs?: Weblabs;
}

interface Account {
    isLoggedIn?: boolean;
    userName?: string;
}

interface Ads {
    adSlotsInfo?: string;
    sisPixelMarkup?: string;
}

interface LocalizationResponse {
    geolocationCountryCode?: string;
    isFullLocalizationEnabled?: boolean;
    isLanguageSelectorEnabled?: boolean;
    isOriginalTitlePreferenceSet?: boolean;
    languageForTranslations?: string;
    latitude?: string;
    longitude?: string;
    userCountryCode?: string;
    userLanguage?: string;
}

interface PlacementMap {
    right3?: PlacementMapRight3;
    right5?: PlacementMapRight5;
}

interface PlacementMapRight3 {
    arguments?: ContextClass;
    componentName?: string;
    symphonyMetadata?: SymphonyMetadata;
}

interface PlacementMapRight5 {
    arguments?: Right5_Arguments;
    componentName?: string;
    symphonyMetadata?: SymphonyMetadata;
}

interface Weblabs {
    imdb418056?: IMDB418056_Class;
    imdbAdsLatencyExperiment419202?: IMDB418056_Class;
    imdbAdsWebMediaInterop395798?: IMDBADSWEBMEDIAINTEROP395798_Class;
    imdbBranchKeySelection373673?: IMDB418056_Class;
    imdbHeroSubnavOrientation418229?: IMDB418056_Class;
    imdbNextClientSideNavigation323089?: IMDB418056_Class;
    imdbNextTitleMainHeroVideoPlayback369575?: IMDB418056_Class;
    imdbNextTitleMainInlineVideoPlaylisting382226?: IMDB418056_Class;
    imdbNextWebp421674?: IMDBADSWEBMEDIAINTEROP395798_Class;
    imdbPersistedQueries417749?: IMDBADSWEBMEDIAINTEROP395798_Class;
    imdbTrustarcGdprCookieCompliance274700?: IMDB418056_Class;
    imdbWebBranchIntegration380339?: IMDBADSWEBMEDIAINTEROP395798_Class;
    imdbZukoVpcEndpointSwap427660?: IMDBADSWEBMEDIAINTEROP395798_Class;
}

interface IMDB418056_Class {
    c?: boolean;
}

interface IMDBADSWEBMEDIAINTEROP395798_Class {
    t1?: boolean;
}

interface TranslationContext {
    i18n?: I18N;
}

interface I18N {
    locale?: string;
    translations?: Translations;
}

interface Translations {
    default?: Default;
    resources?: { [key: string]: string };
}

interface Default {
    resources?: { [key: string]: string };
}

interface Query {
    tconst?: string;
}

interface RuntimeConfig {
    adsPublicSiteHost?: string;
    cachedGraphQLEndpoint?: string;
    env?: string;
    graphQLEndpoint?: string;
    graphQLTimeout?: string;
    sidecarHost?: string;
    stage?: string;
    vpcGraphQLEndpoint?: string;
}
