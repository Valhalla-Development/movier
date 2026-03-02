import { jest } from "@jest/globals";
import { searchTitleByName } from "./titleSearcher";

const mockedGetResult = jest.fn<() => Promise<unknown[]>>();

jest.mock("./resolvers/TMDBTitleSearchResolver", () => ({
    TMDBTitleSearchResolver: jest.fn().mockImplementation(() => ({
        getResult: mockedGetResult,
    })),
}));

describe("searchTitleByName", () => {
    beforeEach(() => {
        mockedGetResult.mockReset();
    });

    it("throws and logs when tmdb token is missing", async () => {
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
        await expect(searchTitleByName("avatar")).rejects.toThrow(
            "TMDB Read Access Token is required for title search."
        );
        expect(errorSpy).toHaveBeenCalledTimes(1);
        errorSpy.mockRestore();
    });

    it("uses tmdb resolver when token is provided", async () => {
        mockedGetResult.mockResolvedValueOnce([]);
        const result = await searchTitleByName("avatar", {
            tmdbReadAccessToken: "token",
        });
        expect(result).toHaveLength(0);
    });
});
