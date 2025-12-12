export const Source = {
    IMDB: "IMDB",
    MetaCritics: "metaCritics",
    Unknown: "unknown",
} as const;
export type Source = (typeof Source)[keyof typeof Source];

export const Genre = {
    Action: "action",
    Adventure: "adventure",
    Animation: "animation",
    Biography: "biography",
    Comedy: "comedy",
    Crime: "crime",
    Documentary: "documentary",
    Drama: "drama",
    Family: "family",
    Fantasy: "fantasy",
    FilmNoir: "filmNoir",
    GameShow: "gameShow",
    History: "history",
    Horror: "horror",
    Music: "music",
    Musical: "musical",
    Mystery: "mystery",
    News: "news",
    RealityTV: "realityTv",
    Romance: "romance",
    SciFi: "sciFi",
    Short: "short",
    Sport: "sport",
    TalkShow: "talkShow",
    Thriller: "thriller",
    War: "war",
    Western: "western",
} as const;
export type Genre = (typeof Genre)[keyof typeof Genre];

export const TitleMainType = {
    Movie: "movie",
    Series: "series",
    SeriesEpisode: "seriesEpisode",
    TVSpecial: "tvSpecial",
    TVShort: "tvShort",
    TVMovie: "tvMovie",
    Video: "video",
} as const;
export type TitleMainType = (typeof TitleMainType)[keyof typeof TitleMainType];

export const Language = {
    Persian: "persian",
    English: "english",
} as const;
export type Language = (typeof Language)[keyof typeof Language];

export const AwardOutcome = {
    Winner: "winner",
    Nominee: "nominee",
} as const;
export type AwardOutcome = (typeof AwardOutcome)[keyof typeof AwardOutcome];

export const ImageType = {
    Poster: "poster",
    StillFrame: "stillFrame",
    Event: "event",
    VideoImage: "videoImage",
    ProfileImage: "profileImage",
    Other: "other",
} as const;
export type ImageType = (typeof ImageType)[keyof typeof ImageType];

export const IMDBPathType = {
    Title: "title",
    Name: "name",
} as const;
export type IMDBPathType = (typeof IMDBPathType)[keyof typeof IMDBPathType];
