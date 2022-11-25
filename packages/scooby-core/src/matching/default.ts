import { MatchableSource, MatchedPair, MatchedSources } from "./types";
import { groupEntriesByGroupId } from "./utils";

export function defaultMatchSources<T extends MatchableSource>(
  expected: T[],
  actual: T[]
): MatchedSources<T> {
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
