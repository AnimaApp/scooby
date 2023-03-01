import { promisify } from "util";
import { exec } from "child_process";
import { createTemporaryFile } from "../utils/temp";
const execPromise = promisify(exec);

export async function hasZipCliInstalled(): Promise<boolean> {
  try {
    await execPromise("zip --version");
    return true;
  } catch {
    return false;
  }
}

export async function archiveDirectoryUsingZipCli(
  dirPath: string
): Promise<string> {
  const archivePath = await createTemporaryFile("archive", ".zip");

  await execPromise(`zip -rj '${archivePath}' '${dirPath}'`);

  return archivePath;
}
