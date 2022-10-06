import { file } from "tmp-promise";

export async function createTemporaryFile(
  prefix: string,
  postfix: string
): Promise<string> {
  const { path } = await file({ prefix, postfix, keep: true });
  return path;
}
