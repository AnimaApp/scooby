import { MatchableSource, MatchedSources } from "./types";
import { groupEntriesByGroupId } from "./utils";

export function flexibleMatchSources<T extends MatchableSource>(
  expected: T[],
  actual: T[]
): MatchedSources<T> {
  const expectedSourceByGroupId = groupEntriesByGroupId(expected);
  const expectedKeys = Array.from(expectedSourceByGroupId.keys());
  const matching = [];
  for (const a of actual) {
    const expectedKey = flexibleMatchFindExpected(a.groupId, expectedKeys);
    if (expectedKey) {
      const expected = expectedSourceByGroupId.get(expectedKey);
      if (expected) {
        matching.push({ actual: a, expected: expected[0] });
      }
    }
  }

  const matchingActual = matching.map((m) => m?.actual);
  const matchingExpected = matching.map((m) => m?.expected);

  console.log(expected, matchingExpected);
  return {
    new: actual.filter((a) => !matchingActual.includes(a)),
    removed: expected.filter((e) => !matchingExpected.includes(e)),
    matching: matching,
  };
}

function flexibleMatchFindExpected(groupId: string, expectedKeys: string[]) {
  if (expectedKeys.includes(groupId)) {
    return groupId;
  }
  const splitId = groupId.toLowerCase().split("-");
  for (const key of expectedKeys) {
    if (
      key.toLowerCase().startsWith(splitId[0]) &&
      key.toLowerCase().endsWith(splitId[splitId.length - 1])
    ) {
      return key;
    }
  }
  for (const key of expectedKeys) {
    if (key.toLowerCase().startsWith(splitId[0])) {
      return key;
    }
  }
}
