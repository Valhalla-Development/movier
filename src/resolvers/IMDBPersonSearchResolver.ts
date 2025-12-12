import { type CheerioAPI, load as loadCheerio } from "cheerio";
import { IMDB_TITLE_SEARCH_URL } from "../constants";
import { IMDBPathType, Source } from "../enums";
import type { IFoundedPersonDetails, IPersonSearchResolver } from "../interfaces";
import type { SearchPersonByNameOptions } from "../personSearcher";
import { getRequest } from "../requestClient";
import { convertIMDBPathToIMDBUrl } from "../utils/convertIMDBPathToIMDBUrl";
import { convertIMDBTitleIdToUrl } from "../utils/convertIMDBTitleIdToUrl";
import { extractIMDBIdFromUrl } from "../utils/extractIMDBIdFromUrl";
import { extractNextDataFromHTML } from "../utils/extractNextDataFromHTML";
import { formatHTMLText } from "../utils/formatHTMLText";
import { ResolverCacheManager } from "../utils/ResolverCacheManager";

export class IMDBPersonSearchResolver implements IPersonSearchResolver {
    private readonly queryName: string;
    private readonly exactMatch: boolean;
    searchPageHTMLData!: string;
    private searchPageNextData?: PersonSearchNextData;

    private readonly resolverCacheManager = new ResolverCacheManager();

    // cheerio instances
    private searchPageCheerio!: CheerioAPI;

    constructor(
        queryName: string,
        { exactMatch = false }: Omit<SearchPersonByNameOptions, "sourceType"> = {}
    ) {
        this.queryName = queryName;
        this.exactMatch = exactMatch;
    }

    async getResult(): Promise<IFoundedPersonDetails[]> {
        await this.loadSearchPageHTMLData();
        const unsortedSearchResultList = this.originalResultList;

        // do sort and filters
        const finalResult = unsortedSearchResultList.sort((a, b) => b.matchScore - a.matchScore);

        return finalResult;
    }

    async loadSearchPageHTMLData() {
        // getting result from imdb page by http request
        const result = await getRequest(IMDB_TITLE_SEARCH_URL, {
            q: this.queryName,
            exact: this.exactMatch,
            s: "nm",
        });

        // parse page content for jquery like
        this.searchPageHTMLData = result.data;
        this.searchPageCheerio = loadCheerio(this.searchPageHTMLData);
        this.searchPageNextData = extractNextDataFromHTML<PersonSearchNextData>(
            this.searchPageHTMLData
        );
    }

    get originalResultList(): IFoundedPersonDetails[] {
        const nextDataResults = this.originalResultListFromNextData;
        if (nextDataResults?.length) {
            return nextDataResults;
        }
        const $ = this.searchPageCheerio;
        const isType1 = !!$(".find-name-result").length;

        if (isType1) {
            return this.originalResultListType1;
        }
        return this.originalResultListType2;
    }

    get originalResultListFromNextData(): IFoundedPersonDetails[] {
        const cacheDataManager = this.resolverCacheManager.load("originalResultListFromNextData");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IFoundedPersonDetails[];
        }
        const results = this.searchPageNextData?.props?.pageProps?.nameResults?.results;
        if (!(Array.isArray(results) && results.length)) {
            return [];
        }
        const mapped = results
            .map((result, index) => this.mapNextDataResultToPerson(result, index))
            .filter(Boolean) as IFoundedPersonDetails[];
        if (!mapped.length) {
            return [];
        }
        return cacheDataManager.cacheAndReturnData(mapped.slice(0, 25));
    }

    get originalResultListType1(): IFoundedPersonDetails[] {
        const cacheDataManager = this.resolverCacheManager.load("originalResultList");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IFoundedPersonDetails[];
        }

        const result: IFoundedPersonDetails[] = [];
        const $ = this.searchPageCheerio;

        $(".find-name-result").each((i, el) => {
            const sourceUrl = convertIMDBPathToIMDBUrl($(el).find("a").first().attr("href"));

            result.push({
                matchScore: 20 - i > 0 ? 20 - i : 1,
                name: formatHTMLText(
                    $(el).find(".ipc-metadata-list-summary-item__t").first().text()
                ),
                source: {
                    sourceType: Source.IMDB,
                    sourceUrl,
                    sourceId: extractIMDBIdFromUrl(sourceUrl, "nm"),
                },
                thumbnailImageUrl: $(el).find("img").first().attr("src") ?? "",
                url: sourceUrl,
            });
        });

        return cacheDataManager.cacheAndReturnData(result);
    }

    get originalResultListType2(): IFoundedPersonDetails[] {
        const cacheDataManager = this.resolverCacheManager.load("originalResultList");
        if (cacheDataManager.hasData) {
            return cacheDataManager.data as IFoundedPersonDetails[];
        }

        const result: IFoundedPersonDetails[] = [];
        const $ = this.searchPageCheerio;

        $("tr.findResult").each((i, el) => {
            const sourceUrl = convertIMDBPathToIMDBUrl($(el).find("a").first().attr("href"));

            result.push({
                matchScore: 20 - i > 0 ? 20 - i : 1,
                name: formatHTMLText($(el).find(".result_text a").first().text()),
                source: {
                    sourceType: Source.IMDB,
                    sourceUrl,
                    sourceId: extractIMDBIdFromUrl(sourceUrl, "nm"),
                },
                thumbnailImageUrl: $(el).find("img").first().attr("src") ?? "",
                url: sourceUrl,
            });
        });

        return cacheDataManager.cacheAndReturnData(result);
    }

    private mapNextDataResultToPerson(
        result: PersonSearchNextDataResult,
        index: number
    ): IFoundedPersonDetails | undefined {
        const listItem = result.listItem;
        if (!listItem) {
            return;
        }
        const personId = listItem.nameId ?? result.index ?? "";
        if (!personId) {
            return;
        }
        const url = convertIMDBTitleIdToUrl(personId, IMDBPathType.Name);
        return {
            matchScore: Math.max(1, 20 - index),
            name: formatHTMLText(listItem.nameText ?? ""),
            source: {
                sourceType: Source.IMDB,
                sourceUrl: url,
                sourceId: personId,
            },
            thumbnailImageUrl: listItem.primaryImage?.url ?? "",
            url,
        };
    }
}

type PersonSearchNextData = {
    props?: {
        pageProps?: {
            nameResults?: {
                results?: PersonSearchNextDataResult[];
            };
        };
    };
};

type PersonSearchNextDataResult = {
    index?: string;
    listItem?: {
        nameId?: string;
        nameText?: string;
        primaryImage?: {
            url?: string;
        };
    };
};
