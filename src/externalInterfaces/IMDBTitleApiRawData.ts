export interface IMDBTitleApiRawData {
    akas: {
        edges: {
            node: {
                country?: {
                    text: string;
                };
                text: string;
            };
        }[];
    };
    awardNominations?: {
        edges: {
            node: {
                award?: {
                    category?: {
                        text: string;
                    };
                    event?: {
                        text: string;
                    };
                    eventEditionId?: string;
                    text?: string;
                    year?: number;
                };
                id: string;
                forEpisodes?: {
                    titleText: {
                        text: string;
                    };
                }[];
                forSongTitles?: string[];
                isWinner?: boolean;
            };
        }[];
    };
    casts: {
        edges: {
            node: {
                category?: {
                    text: string;
                };
                name?: {
                    id: string;
                    nameText: {
                        text: string;
                    };
                    akas: {
                        edges: {
                            node: {
                                text: string;
                            };
                        }[];
                    };
                };

                characters?: {
                    name?: string;
                }[];
                episodeCredits?: {
                    total?: number;
                    yearRange?: {
                        year?: number;
                        endYear?: number;
                    };
                };
            };
        }[];
    };
    certificate?: {
        rating?: string;
    };
    companyCredits?: {
        edges: {
            node: {
                category?: {
                    text: string;
                };
                company?: {
                    id: string;
                    companyText?: {
                        text: string;
                    };
                };
            };
        }[];
    };
    countriesOfOrigin?: {
        countries?: {
            text: string;
        }[];
    };
    directors: {
        edges: {
            node: {
                category?: {
                    text: string;
                };
                name?: {
                    id: string;
                    nameText: {
                        text: string;
                    };
                };
            };
        }[];
    };
    genres?: {
        genres: {
            text: string;
        }[];
    };
    goofs?: {
        edges: {
            node: {
                text?: {
                    plainText: string;
                };
                category?: {
                    text: string;
                };
                isSpoiler?: boolean;
            };
        }[];
    };
    id: string;
    keywords: {
        edges: {
            node: {
                text: string;
            };
        }[];
    };
    lifetimeGross?: {
        total?: {
            currency?: string;
            amount?: number;
        };
    };
    meta?: {
        publicationStatus?: string;
    };
    metacritic?: {
        metascore?: {
            score?: number;
            reviewCount?: number;
        };
        url?: string;
    };
    openingWeekendGross?: {
        gross?: {
            total?: {
                currency?: string;
                amount?: number;
            };
        };
        theaterCount?: number;
        weekendEndDate?: string;
        weekendStartDate?: string;
    };
    originalTitleText?: {
        text: string;
    };
    plot?: {
        plotText?: {
            plainText: string;
        };
    };
    posterImages?: {
        edges: {
            node: {
                caption?: {
                    plainText: string;
                };
                height?: number;
                width?: number;
                id: string;
                type?: string;
                url?: string;
                names?: {
                    nameText: {
                        text: string;
                    };
                    id: string;
                }[];
            };
        }[];
    };
    prestigiousAwardSummary?: {
        award?: {
            category?: {
                text: string;
            };
            event?: {
                text: string;
            };
            eventEditionId?: string;
            text?: string;
            year?: number;
        };
        nominations?: number;
        wins?: number;
    };
    primaryImage?: {
        caption?: {
            plainText: string;
        };
        height?: number;
        width?: number;
        id: string;
        type?: string;
        url?: string;
        names?: {
            nameText: {
                text: string;
            };
            id: string;
        }[];
    };
    producers: {
        edges: {
            node: {
                category?: {
                    text: string;
                };
                name?: {
                    id: string;
                    nameText: {
                        text: string;
                    };
                };
            };
        }[];
    };
    productionBudget?: {
        budget?: {
            currency?: string;
            amount?: number;
        };
    };
    quotes: {
        edges: {
            node: {
                isSpoiler?: boolean;
                lines: {
                    characters?: {
                        character?: string;
                        name?: {
                            id: string;
                            nameText: {
                                text: string;
                            };
                        };
                    }[];
                    stageDirection?: string;
                    text?: string;
                }[];
            };
        }[];
    };
    rankedLifetimeGross?: {
        boxOfficeAreaType?: {
            text: string;
        };
        total?: {
            currency?: string;
            amount?: number;
        };
    };
    ratingsSummary?: {
        aggregateRating?: number;
        voteCount?: number;
    };
    releaseDate?: {
        month: number;
        year: number;
        day: number;
        country?: {
            text: string;
        };
    };
    releaseDates: {
        edges: {
            node: {
                day?: number;
                month?: number;
                year?: number;
                country?: {
                    text: string;
                };
            };
        }[];
    };
    releaseYear?: {
        year?: number;
        endYear?: number;
    };
    runtime?: {
        seconds?: number;
        displayableProperty?: {
            value: {
                plainText: string;
            };
        };
    };
    spokenLanguages?: {
        spokenLanguages?: {
            text: string;
        }[];
    };
    stillFrameImages?: {
        edges: {
            node: {
                caption?: {
                    plainText: string;
                };
                height?: number;
                width?: number;
                id: string;
                type?: string;
                url?: string;
                names?: {
                    nameText: {
                        text: string;
                    };
                    id: string;
                }[];
            };
        }[];
    };
    taglines?: {
        edges: {
            node: {
                text: string;
            };
        }[];
    };
    titleText: {
        text: string;
    };
    titleType?: {
        categories?: {
            text: string;
        }[];
        id?: string;
        canHaveEpisodes?: boolean;
        isEpisode?: boolean;
        isSeries?: boolean;
        text?: string;
    };
    writers: {
        edges: {
            node: {
                category?: {
                    text: string;
                };
                name?: {
                    id: string;
                    nameText: {
                        text: string;
                    };
                };
            };
        }[];
    };
}
