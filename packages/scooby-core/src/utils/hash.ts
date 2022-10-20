import { createHash } from "node:crypto";
import { readFile } from "fs/promises";

export async function calculateFileMD5(path: string): Promise<string> {
  const content = await readFile(path);
  return createHash("md5").update(content).digest("hex");
}
