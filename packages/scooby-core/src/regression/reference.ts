import { ScoobyAPI } from "@animaapp/scooby-api/src/types";
import { loadTestEntries } from "../loading";
import { TestEntry } from "../types";
import { downloadTestSnapshot } from "./snapshot";

export type LoadReferenceRequest = {
  snapshotName: string;
  localReferencePath?: string;
  baseCommitHash: string;
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

  console.log("loading reference dataset from remote");
  const remoteReferencePath = await downloadTestSnapshot(
    request.snapshotName,
    request.baseCommitHash,
    request.api
  );
  return loadTestEntries(remoteReferencePath);
}
