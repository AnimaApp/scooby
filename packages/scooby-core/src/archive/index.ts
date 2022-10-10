import archiver from "archiver";
import extract from "extract-zip";
import { existsSync, statSync, createWriteStream } from "fs";
import { createTemporaryDirectory, createTemporaryFile } from "../utils/temp";

export async function archiveDirectory(dirPath: string): Promise<string> {
  if (!existsSync(dirPath)) {
    throw new Error(
      "unable to archive directory, the given path does not exist"
    );
  }

  if (!statSync(dirPath).isDirectory()) {
    throw new Error(
      "unable to archive directory, the given path is not a directory"
    );
  }

  const archivePath = await createTemporaryFile("archive", ".zip");

  const archiveFileStream = createWriteStream(archivePath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      console.warn("ARCHIVER:", err.code);
    } else {
      throw err;
    }
  });
  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(archiveFileStream);
  archive.directory(dirPath, false);

  await archive.finalize();
  await waitForStreamToFinish(archiveFileStream);

  return archivePath;
}

function waitForStreamToFinish(
  stream: ReturnType<typeof createWriteStream>
): Promise<void> {
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

export async function extractArchive(archivePath: string): Promise<string> {
  const tempSnapshotPath = await createTemporaryDirectory("archive");
  await extract(archivePath, {
    dir: tempSnapshotPath,
  });
  return tempSnapshotPath;
}
