import { parse } from "path";

export function getExtension(path: string): string {
  const extension = parse(path).ext?.split(".")?.[1];
  if (extension) {
    return extension;
  }

  throw new Error("unsupported entry type: " + path);
}
