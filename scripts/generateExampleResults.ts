import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
    getPersonDetailsByName,
    getTitleDetailsByName,
    searchPersonByName,
    searchTitleByName,
} from "../src";

const exampleDir = path.resolve("examples", "results");

async function dumpExample(filename: string, data: unknown) {
    const filePath = path.resolve(exampleDir, filename);
    await writeFile(filePath, JSON.stringify(data, null, 2));
    console.log("wrote", filePath);
}

async function main() {
    await dumpExample(
        "interstellarTitleResults.json",
        await getTitleDetailsByName("interstellar 2014")
    );
    await dumpExample(
        "interstellarTitleSearchResults.json",
        await searchTitleByName("interstellar 2014")
    );
    await dumpExample(
        "jenniferLawrencePersonResults.json",
        await getPersonDetailsByName("jennifer lawrence")
    );
    await dumpExample(
        "jenniferLawrencePersonSerachResults.json",
        await searchPersonByName("jennifer lawrence")
    );
}

main().catch((error) => {
    console.error("failed to generate example data", error);
    process.exit(1);
});
