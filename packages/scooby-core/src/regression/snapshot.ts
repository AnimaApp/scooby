import { ScoobyAPI } from "@animaapp/scooby-api/src/types";
import { archiveDirectory, extractArchive } from "../archive";
import { createTemporaryFile } from "../utils/temp";

export async function uploadTestSnapshot(
  snapshotName: string,
  testsPath: string,
  commitHash: string,
  api: ScoobyAPI
) {
  console.log("archiving test snapshot...");
  const testsArchivePath = await archiveDirectory(testsPath);

  console.log("uploading test snapshot...");
  await api.uploadSnapshotArchive(
    {
      commitHash: commitHash,
      snapshotName,
    },
    testsArchivePath
  );
}

export async function downloadTestSnapshot(
  snapshotName: string,
  baseCommitHash: string,
  api: ScoobyAPI
): Promise<string | undefined> {
  console.log("downloading test snapshot...");
  const targetArchivePath = await createTemporaryFile("snapshot", ".zip");

  const success = await api.downloadSnapshotArchive(
    {
      commitHash: baseCommitHash,
      snapshotName,
    },
    targetArchivePath
  );
  if (!success) {
    console.log(
      "could not find matching snapshot for commit: " + baseCommitHash
    );
    return;
  }

  console.log("extracting test snapshot...");
  const extractedDirPath = await extractArchive(targetArchivePath);

  return extractedDirPath;
}
