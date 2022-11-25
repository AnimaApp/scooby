import { validateSources } from "./validation";

export type MatchableSource = {
  id: string;
  groupId: string;
};

export type MatchedPair<T extends MatchableSource> = {
  expected: T;
  actual: T;
};

export type MatchedSources<T extends MatchableSource> = {
  new: T[];
  matching: MatchedPair<T>[];
  removed: T[];
};

export function matchSources<T extends MatchableSource>(
  expected: T[],
  actual: T[]
): MatchedSources<T> {
  validateSources(expected, actual);

  const expectedSourceById = new Map(
    expected.map((entry) => [entry.id, entry])
  );
  const actualSourceById = new Map(actual.map((entry) => [entry.id, entry]));

  const expectedSourceByGroupId = groupEntriesByGroupId(expected);
  const actualSourceByGroupId = groupEntriesByGroupId(actual);

  return {
    new: findNew(
      actual,
      expectedSourceById,
      expectedSourceByGroupId,
      actualSourceByGroupId
    ),
    removed: findRemoved(
      expected,
      actualSourceById,
      actualSourceByGroupId,
      expectedSourceByGroupId
    ),
    matching: findMatching(
      actual,
      expectedSourceById,
      expectedSourceByGroupId,
      actualSourceByGroupId
    ),
  };
}

function groupEntriesByGroupId<T extends MatchableSource>(
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

function findNew<T extends MatchableSource>(
  actual: T[],
  expectedSourceById: Map<string, T>,
  expectedSourceByGroupId: Map<string, T[]>,
  actualSourceByGroupId: Map<string, T[]>
): T[] {
  return actual.filter((entry) => {
    if (expectedSourceById.has(entry.id)) {
      return false;
    }

    // Fallback on groupId matching
    const matchingExpectedGroupIds = expectedSourceByGroupId.get(entry.groupId);
    const matchingActualGroupIds = actualSourceByGroupId.get(entry.groupId);
    if (
      matchingExpectedGroupIds?.length === 1 &&
      matchingActualGroupIds?.length === 1
    ) {
      return false;
    }

    return true;
  });
}

export function findRemoved<T extends MatchableSource>(
  expected: T[],
  actualSourceById: Map<string, T>,
  actualSourceByGroupId: Map<string, T[]>,
  expectedSourceByGroupId: Map<string, T[]>
): T[] {
  return expected.filter((entry) => {
    if (actualSourceById.has(entry.id)) {
      return false;
    }

    // Fallback on groupId matching
    const matchingExpectedGroupIds = expectedSourceByGroupId.get(entry.groupId);
    const matchingActualGroupIds = actualSourceByGroupId.get(entry.groupId);
    if (
      matchingExpectedGroupIds?.length === 1 &&
      matchingActualGroupIds?.length === 1
    ) {
      return false;
    }

    return true;
  });
}

export function findMatching<T extends MatchableSource>(
  actual: T[],
  expectedSourceById: Map<string, T>,
  expectedSourceByGroupId: Map<string, T[]>,
  actualSourceByGroupId: Map<string, T[]>
): MatchedPair<T>[] {
  const pairs: MatchedPair<T>[] = [];

  for (const entry of actual) {
    if (expectedSourceById.has(entry.id)) {
      pairs.push({
        expected: expectedSourceById.get(entry.id)!,
        actual: entry,
      });
      continue;
    }

    // Fallback on groupId matching
    const matchingExpectedGroupIds = expectedSourceByGroupId.get(entry.groupId);
    const matchingActualGroupIds = actualSourceByGroupId.get(entry.groupId);
    if (
      matchingExpectedGroupIds?.length === 1 &&
      matchingActualGroupIds?.length === 1
    ) {
      pairs.push({
        expected: matchingExpectedGroupIds[0],
        actual: entry,
      });
    }
  }

  return pairs;
}

export function flexibleMatchSources<T extends MatchableSource>(
  expected: T[],
  actual: T[]
): MatchedSources<T> {
  validateSources(expected, actual);
  const expectedSourceByGroupId = groupEntriesByGroupId(expected);
  const expectedKeys = Array.from(expectedSourceByGroupId.keys());
  const matching = [];
  for (const a of actual) {
    const expectedKey = flexibleMatchFindExpected(
      a.groupId,
      expectedKeys
    );
    if (expectedKey) {
      const expected = expectedSourceByGroupId.get(expectedKey);
      if(expected){
        matching.push({ actual: a, expected: expected[0] });
      }
    }
  }

  const matchingActual = matching.map((m) => m?.actual);
  const matchingExpected = matching.map((m) => m?.expected);

  return {
    new: actual.filter((a) => !matchingActual.includes(a)),
    removed: expected.filter((e) => !matchingExpected.includes(e)),
    matching: matching,
  };
}

function flexibleMatchFindExpected<T extends MatchableSource>(
  groupId: string,
  expectedKeys: string[]
) {
  if (expectedKeys.includes(groupId)) {
    return groupId;
  }
  const splitId = groupId.split("-");
  for (const key of expectedKeys) {
    if (
      key.startsWith(splitId[0]) &&
      key.endsWith(splitId[splitId.length - 1])
    ) {
      return key;
    }
  }
}
