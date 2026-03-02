import { jest } from "@jest/globals";
import { tmdbGetRequest } from "../requestClient";
import { TMDBPersonSearchResolver } from "./TMDBPersonSearchResolver";

jest.mock("../requestClient", () => ({
    tmdbGetRequest: jest.fn(),
}));

const mockedTMDBGetRequest = tmdbGetRequest as jest.MockedFunction<typeof tmdbGetRequest>;

describe("tmdb person search resolver", () => {
    beforeEach(() => {
        mockedTMDBGetRequest.mockReset();
    });

    it("maps tmdb person results to imdb-based people", async () => {
        mockedTMDBGetRequest
            .mockResolvedValueOnce({
                results: [
                    {
                        id: 1_223_786,
                        name: "Emilia Clarke",
                        profile_path: "/emilia.jpg",
                        popularity: 11,
                    },
                ],
            })
            .mockResolvedValueOnce({ imdb_id: "nm3592338" });

        const resolver = new TMDBPersonSearchResolver("emilia clarke", {
            tmdbReadAccessToken: "token",
        });
        const result = await resolver.getResult();

        expect(result).toHaveLength(1);
        expect(result[0].source.sourceId).toBe("nm3592338");
        expect(result[0].url).toBe("https://www.imdb.com/name/nm3592338/");
        expect(mockedTMDBGetRequest).toHaveBeenNthCalledWith(1, "/search/person", "token", {
            query: "emilia clarke",
            page: 1,
        });
    });
});
