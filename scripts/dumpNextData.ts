import { getRequest } from "../src/requestClient";
import { extractNextDataFromHTML } from "../src/utils/extractNextDataFromHTML";

async function main() {
    const titleId = process.argv[2] || "tt0816692";
    const url = `https://www.imdb.com/title/${titleId}/`;
    const response = await getRequest(url);
    const nextData = extractNextDataFromHTML(response.data);
    if (!nextData) {
        console.log("no __NEXT_DATA__ payload found");
        return;
    }

    console.log(JSON.stringify(nextData, null, 2));
}

main().catch((error) => {
    console.error("failed to dump next data", error);
    process.exit(1);
});

