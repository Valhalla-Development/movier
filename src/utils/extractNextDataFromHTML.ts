const NEXT_DATA_REGEX = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]+?)<\/script>/;

export function extractNextDataFromHTML<T = unknown>(html: string): T | undefined {
    const match = NEXT_DATA_REGEX.exec(html);
    if (!match) {
        return;
    }
    try {
        return JSON.parse(match[1]) as T;
    } catch {
        return;
    }
}
