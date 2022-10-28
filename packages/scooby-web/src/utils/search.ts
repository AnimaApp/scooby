import { Entry } from "../types";

export function isEntryMatchingQuery(entry: Entry, query: string): boolean {
  const tokens = query.split(" ");

  for (const token of tokens) {
    if (
      !(
        entry.id.toLowerCase().includes(token) ||
        entry.path?.toLowerCase().includes(token)
      )
    ) {
      return false;
    }
  }

  return true;
}
