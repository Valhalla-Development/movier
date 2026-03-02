import { jest } from "@jest/globals";
import { searchPersonByName } from "./personSearcher";

const mockedGetResult = jest.fn<() => Promise<unknown[]>>();

jest.mock("./resolvers/TMDBPersonSearchResolver", () => ({
    TMDBPersonSearchResolver: jest.fn().mockImplementation(() => ({
        getResult: mockedGetResult,
    })),
}));

describe("searchPersonByName", () => {
    beforeEach(() => {
        mockedGetResult.mockReset();
    });

    it("throws and logs when tmdb token is missing", async () => {
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
        await expect(searchPersonByName("emilia clarke")).rejects.toThrow(
            "TMDB Read Access Token is required for person search."
        );
        expect(errorSpy).toHaveBeenCalledTimes(1);
        errorSpy.mockRestore();
    });

    it("uses tmdb resolver when token is provided", async () => {
        mockedGetResult.mockResolvedValueOnce([]);
        const result = await searchPersonByName("emilia clarke", {
            tmdbReadAccessToken: "token",
        });
        expect(result).toHaveLength(0);
    });
});
