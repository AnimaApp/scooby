import { MatchableSource } from ".";

export function validateSources<T extends MatchableSource>(
  expected: T[],
  actual: T[]
) {
  checkNoDuplicateIds(expected, actual);
}

function checkNoDuplicateIds<T extends MatchableSource>(
  expected: T[],
  actual: T[]
) {
  console.log("DUPLICATE", expected, actual);
  const expectedIds = new Set(expected.map((entry) => entry.id));
  if (expected.length !== expectedIds.size) {
    throw new Error("expected source dataset has duplicate ids");
  }

  const actualIds = new Set(actual.map((entry) => entry.id));
  if (actual.length !== actualIds.size) {
    throw new Error("actual source dataset has duplicate ids");
  }
}
