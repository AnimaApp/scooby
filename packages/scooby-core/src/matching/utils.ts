import { MatchableSource } from "./types";

export function groupEntriesByGroupId<T extends MatchableSource>(
  entries: T[]
): Map<string, T[]> {
  const map: Map<string, T[]> = new Map();

  for (const entry of entries) {
    if (!map.has(entry.groupId)) {
      map.set(entry.groupId, []);
    }

    const list = map.get(entry.groupId);
    if (!list) {
      throw new Error("invariant violation, list has to be defined");
    }

    list.push(entry);
  }

  return map;
}
