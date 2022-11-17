import { BatchComparisonEntry } from "../../../../comparison";

export function getFidelityEntry<T extends BatchComparisonEntry>(
  comparisons: Record<string, T>,
  id: string
): T {
  if (!(id in comparisons)) {
    throw new Error(
      "unable to find matching fidelity comparison for id: " + id
    );
  }

  return comparisons[id];
}
