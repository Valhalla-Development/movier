import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest/presets/default-esm",
    verbose: false,
    testEnvironment: "node",
    rootDir: "src",
    extensionsToTreatAsEsm: [".ts"],
    transformIgnorePatterns: ["/node_modules/(?!(change-case)/)"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        "^.+\\.[tj]s$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
};

export default config;
