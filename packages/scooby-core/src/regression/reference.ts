import { loadTestEntries } from "../loading";
import { RegressionTestRequest, TestEntry } from "../types";

export type LoadReferenceRequest = {
  localReferencePath?: string;
};

export async function loadReferenceEntries(
  request: LoadReferenceRequest
): Promise<TestEntry[]> {
  if (request.localReferencePath) {
    console.log(
      "loading reference dataset from local path instead of remote: " +
        request.localReferencePath
    );
    return loadTestEntries(request.localReferencePath);
  }

  throw new Error("unable to load reference dataset, invalid configuration");
}
