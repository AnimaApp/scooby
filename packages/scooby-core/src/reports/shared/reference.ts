import { ScoobyAPI } from "@animaapp/scooby-api/src/types";
import { loadTestEntries } from "../../loading";
import { TestEntry } from "../../types";
import { downloadTestSnapshot } from "./snapshot";

// Max number of commits that the system will read backwards to find a valid reference commit
const DEFAULT_MAX_REFERENCE_COMMIT_BACKTRACK = 25;

export type LoadReferenceRequest = {
  snapshotName: string;
  currentCommit: string;
  latestBaseCommits: string[];
  localReferencePath?: string;
  maxReferenceCommitBacktracking?: number;
  api: ScoobyAPI;
  fileType: string;
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
      request.fileType,
      request.currentCommit
    );
  }

  return loadRemoteReferenceEntries(request);
}

async function loadRemoteReferenceEntries(
  request: LoadReferenceRequest
): Promise<LoadReferenceResult> {
  console.log("loading reference dataset from remote");

  const maxAttempts = Math.max(
    request.maxReferenceCommitBacktracking ??
      DEFAULT_MAX_REFERENCE_COMMIT_BACKTRACK,
    0
  );

  const iterationsCount = Math.min(
    maxAttempts + 1,
    request.latestBaseCommits.length
  );
  for (let i = 0; i < iterationsCount; i++) {
    const candidateHash = request.latestBaseCommits[i];
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
        entries: await loadTestEntries(remoteReferencePath, request.fileType),
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
  fileType: string,
  currentCommit: string
): Promise<LoadReferenceResult> {
  console.log(
    "loading reference dataset from local path instead of remote: " +
      localReferencePath
  );
  return {
    entries: await loadTestEntries(localReferencePath, fileType),
    referenceCommitHash: currentCommit,
  };
}
