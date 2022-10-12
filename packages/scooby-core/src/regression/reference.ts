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
    return loadLocalReferenceEntries(request.localReferencePath);
  }

  return loadRemoteReferenceEntries(request);
}

async function loadRemoteReferenceEntries(
  request: LoadReferenceRequest
): Promise<TestEntry[]> {
  console.log("loading reference dataset from remote");
  const remoteReferencePath = await downloadTestSnapshot(
    request.snapshotName,
    request.baseCommitHash,
    request.api
  );

  if (!remoteReferencePath) {
    console.warn(
      "could not find matching reference dataset on remote. Considering this a fresh run."
    );
    return [];
  }

  return loadTestEntries(remoteReferencePath);
}

async function loadLocalReferenceEntries(
  localReferencePath: string
): Promise<TestEntry[]> {
  console.log(
    "loading reference dataset from local path instead of remote: " +
      localReferencePath
  );
  return loadTestEntries(localReferencePath);
}
