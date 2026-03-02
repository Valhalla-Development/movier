import { jest } from "@jest/globals";
import { TitleMainType } from "../literals";
import { tmdbGetRequest } from "../requestClient";
import { TMDBTitleSearchResolver } from "./TMDBTitleSearchResolver";

jest.mock("../requestClient", () => ({
    tmdbGetRequest: jest.fn(),
}));

const mockedTMDBGetRequest = tmdbGetRequest as jest.MockedFunction<typeof tmdbGetRequest>;

describe("tmdb title search resolver", () => {
    beforeEach(() => {
        mockedTMDBGetRequest.mockReset();
    });

    it("maps tmdb search results to imdb-based title details", async () => {
        mockedTMDBGetRequest
            .mockResolvedValueOnce({
                results: [
                    {
                        id: 603,
                        media_type: "movie",
                        title: "The Matrix",
                        original_title: "The Matrix",
                        release_date: "1999-03-30",
                        poster_path: "/matrix.jpg",
                        popularity: 90,
                    },
                ],
            })
            .mockResolvedValueOnce({ imdb_id: "tt0133093" });

        const resolver = new TMDBTitleSearchResolver("the matrix 1999", {
            tmdbReadAccessToken: "token",
        });
        const result = await resolver.getResult();

        expect(result).toHaveLength(1);
        expect(result[0].source.sourceId).toBe("tt0133093");
        expect(result[0].titleType).toBe(TitleMainType.Movie);
        expect(result[0].url).toBe("https://www.imdb.com/title/tt0133093/");
        expect(mockedTMDBGetRequest).toHaveBeenNthCalledWith(1, "/search/multi", "token", {
            query: "the matrix",
            page: 1,
        });
    });
});
