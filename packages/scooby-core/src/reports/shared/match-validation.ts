import { MatchedSources } from "../../matching/types";
import { SourceEntry } from "../../types";

export function validateMatchedFidelitySources(
  matchedSources: MatchedSources<SourceEntry>
) {
  if (matchedSources.new.length > 0) {
    console.warn(
      "INVALID DATASET, detected actual entries not present in the expected dataset: ",
      matchedSources.new.map((entry) => entry.id)
    );

    throw new Error(
      "invalid dataset, found actual test entries that are not present in the expected dataset"
    );
  }

  if (matchedSources.removed.length > 0) {
    console.warn(
      "INVALID DATASET, missing actual test entries compared to the expected dataset: ",
      matchedSources.removed.map((entry) => entry.id)
    );

    throw new Error(
      "invalid dataset, missing actual test entries compared to the expected dataset"
    );
  }
}
