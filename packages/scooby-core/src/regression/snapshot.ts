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
): Promise<string> {
  console.log("downloading test snapshot...");
  const targetArchivePath = await createTemporaryFile("snapshot", ".zip");

  await api.downloadSnapshotArchive(
    {
      commitHash: baseCommitHash,
      snapshotName,
    },
    targetArchivePath
  );

  console.log("extracting test snapshot...");
  const extractedDirPath = await extractArchive(targetArchivePath);

  return extractedDirPath;
}
