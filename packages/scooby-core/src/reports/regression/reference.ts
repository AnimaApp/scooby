import { ScoobyAPI } from "@animaapp/scooby-api/src/types";
import { loadTestEntries } from "../../loading";
import { TestEntry } from "../../types";
import { downloadTestSnapshot } from "./snapshot";

// Max number of commits that the system will read backwards to find a valid reference commit
const MAX_REFERENCE_COMMIT_BACKTRACK = 20;

export type LoadReferenceRequest = {
  snapshotName: string;
  currentCommit: string;
  localReferencePath?: string;
  latestMainBranchCommits: string[];
  api: ScoobyAPI;
};

export type LoadReferenceResult = {
  entries: TestEntry[];
  referenceCommitHash: string;
};

export async function loadReferenceEntries(
  request: LoadReferenceRequest
): Promise<LoadReferenceResult> {
  if (request.localReferencePath) {
    return loadLocalReferenceEntries(
      request.localReferencePath,
      request.currentCommit
    );
  }

  return loadRemoteReferenceEntries(request);
}

async function loadRemoteReferenceEntries(
  request: LoadReferenceRequest
): Promise<LoadReferenceResult> {
  console.log("loading reference dataset from remote");

  const maxAttempts = Math.min(
    MAX_REFERENCE_COMMIT_BACKTRACK,
    request.latestMainBranchCommits.length
  );

  for (let i = 0; i < maxAttempts; i++) {
    const candidateHash = request.latestMainBranchCommits[i];
    console.log(
      `checking if candidate hash '${candidateHash}' can be the reference commit...`
    );

    const remoteReferencePath = await downloadTestSnapshot(
      request.snapshotName,
      candidateHash,
      request.api
    );

    if (remoteReferencePath) {
      return {
        entries: await loadTestEntries(remoteReferencePath),
        referenceCommitHash: candidateHash,
      };
    }

    console.log(
      "commit doesn't contain a valid reference, backtracking to a previous commit..."
    );
  }

  console.warn(
    "could not find matching reference dataset on remote. Considering this a fresh run."
  );
  return {
    entries: [],
    referenceCommitHash: request.currentCommit,
  };
}

async function loadLocalReferenceEntries(
  localReferencePath: string,
  currentCommit: string
): Promise<LoadReferenceResult> {
  console.log(
    "loading reference dataset from local path instead of remote: " +
      localReferencePath
  );
  return {
    entries: await loadTestEntries(localReferencePath),
    referenceCommitHash: currentCommit,
  };
}
