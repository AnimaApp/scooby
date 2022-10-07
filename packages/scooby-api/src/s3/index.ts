import { ScoobyAPIOptions } from "../options";
import { ScoobyAPI } from "../types";
import { S3ScoobyAPI } from "./api";

export async function getS3ScoobyAPI(
  options: ScoobyAPIOptions
): Promise<ScoobyAPI> {
  return new S3ScoobyAPI(options);
}
