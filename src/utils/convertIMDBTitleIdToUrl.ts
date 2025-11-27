import { IMDBPathType } from "./../enums";
import { convertIMDBPathToIMDBUrl } from "./convertIMDBPathToIMDBUrl";

export function convertIMDBTitleIdToUrl(
  titleId: string,
  type: IMDBPathType = IMDBPathType.Title
) {
  const normalizedTitleId = titleId?.replace(/\/+$/, "") ?? "";
  const path = `/${type}/${normalizedTitleId}/`;
  return convertIMDBPathToIMDBUrl(path);
}
