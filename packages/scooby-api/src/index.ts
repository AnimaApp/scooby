import { getS3ScoobyAPI } from "./s3";
import { ScoobyAPI } from "./types";
import { ScoobyAPIOptions, validateOptions } from "./options";

export async function getScoobyAPI(
  options?: Partial<ScoobyAPIOptions>
): Promise<ScoobyAPI> {
  const effectiveOptions = validateOptions(options);

  if (effectiveOptions.provider === "s3") {
    return getS3ScoobyAPI(effectiveOptions);
  }

  throw new Error("could not initialize API, invalid configuration detected");
}
