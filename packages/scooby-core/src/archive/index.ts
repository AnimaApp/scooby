import extract from "extract-zip";
import { createTemporaryDirectory } from "../utils/temp";
import { archiveDirectoryUsingNodeArchiver } from "./node-archiver";
import { archiveDirectoryUsingZipCli, hasZipCliInstalled } from "./zip-cli";

export type ArchiveDirectoryOptions = {
  forceMode?: ArchiveDirectoryMode;
};

export type ArchiveDirectoryMode = "node-archiver" | "zip-cli";

export async function archiveDirectory(
  dirPath: string,
  options?: ArchiveDirectoryOptions
): Promise<string> {
  const archiveMode = options?.forceMode ?? (await inferBestArchiverMode());
  console.log("using archiver mode:", archiveMode);

  switch (archiveMode) {
    case "node-archiver":
      return archiveDirectoryUsingNodeArchiver(dirPath);
    case "zip-cli":
      return archiveDirectoryUsingZipCli(dirPath);
  }
}

async function inferBestArchiverMode(): Promise<ArchiveDirectoryMode> {
  if (await hasZipCliInstalled()) {
    return "zip-cli";
  } else {
    return "node-archiver";
  }
}

export async function extractArchive(archivePath: string): Promise<string> {
  const tempSnapshotPath = await createTemporaryDirectory("archive");
  await extract(archivePath, {
    dir: tempSnapshotPath,
  });
  return tempSnapshotPath;
}
