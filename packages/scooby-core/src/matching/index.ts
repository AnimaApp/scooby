import { FidelityMatchingType } from "../types";
import { defaultMatchSources } from "./default";
import { flexibleMatchSources } from "./flexible";
import { MatchableSource, MatchedSources } from "./types";
import { validateSources } from "./validation";
export * from "./types";

export function matchSources<T extends MatchableSource>(
  expected: T[],
  actual: T[],
  options?: {
    strategy?: FidelityMatchingType;
  }
): MatchedSources<T> {
  validateSources(expected, actual);

  if (options?.strategy === "flexible") {
    return flexibleMatchSources(expected, actual);
  } else {
    return defaultMatchSources(expected, actual);
  }
}
