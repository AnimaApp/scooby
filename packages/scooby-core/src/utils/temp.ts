import { file, dir } from "tmp-promise";

export async function createTemporaryFile(
  prefix: string,
  postfix: string
): Promise<string> {
  const { path } = await file({ prefix, postfix, keep: true });
  return path;
}

export async function createTemporaryDirectory(
  prefix: string
): Promise<string> {
  const { path } = await dir({ prefix, keep: true });
  return path;
}
