import { ScoobyAPI } from "@animaapp/scooby-api/src/types";
import { loadTestEntries } from "../loading";
import { TestEntry } from "../types";

export type LoadReferenceRequest = {
  localReferencePath?: string;
  api: ScoobyAPI;
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

  // TODO: download from s3 and load from there

  throw new Error("unable to load reference dataset, invalid configuration");
}
