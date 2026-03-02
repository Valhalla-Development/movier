import { jest } from "@jest/globals";
import { tmdbGetRequest } from "../requestClient";
import { IMDBTitleDetailsResolver } from "./IMDBTitleDetailsResolver";

jest.mock("../requestClient", () => ({
    tmdbGetRequest: jest.fn(),
}));

const mockedTMDBGetRequest = tmdbGetRequest as jest.MockedFunction<typeof tmdbGetRequest>;

describe("imdb title details resolver trailers", () => {
    beforeEach(() => {
        mockedTMDBGetRequest.mockReset();
    });

    it("returns empty trailers when tmdb token is missing", async () => {
        const resolver = new IMDBTitleDetailsResolver("https://www.imdb.com/title/tt1431045/");
        const trailers = await (
            resolver as unknown as {
                getTrailersFromTMDB: (tmdbReadAccessToken?: string) => Promise<unknown[]>;
            }
        ).getTrailersFromTMDB(undefined);
        expect(trailers).toHaveLength(0);
        expect(mockedTMDBGetRequest).not.toHaveBeenCalled();
    });

    it("maps youtube videos from tmdb", async () => {
        mockedTMDBGetRequest
            .mockResolvedValueOnce({
                movie_results: [{ id: 293_660 }],
                tv_results: [],
            })
            .mockResolvedValueOnce({
                results: [
                    {
                        id: "clip-1",
                        key: "clip1",
                        name: "Deleted Scene",
                        site: "YouTube",
                        type: "Clip",
                    },
                    {
                        id: "abc",
                        key: "xyz123",
                        name: "Official Trailer",
                        site: "YouTube",
                        type: "Trailer",
                    },
                ],
            });

        const resolver = new IMDBTitleDetailsResolver("https://www.imdb.com/title/tt1431045/");
        const trailers = await (
            resolver as unknown as {
                getTrailersFromTMDB: (tmdbReadAccessToken?: string) => Promise<unknown[]>;
            }
        ).getTrailersFromTMDB("token");

        expect(trailers).toHaveLength(1);
        expect((trailers[0] as { id?: string }).id).toBe("abc");
        expect(mockedTMDBGetRequest).toHaveBeenCalledTimes(2);
        expect(mockedTMDBGetRequest).toHaveBeenNthCalledWith(1, "/find/tt1431045", "token", {
            external_source: "imdb_id",
        });
    });
});
