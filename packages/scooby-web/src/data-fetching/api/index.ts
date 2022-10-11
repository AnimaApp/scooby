import { S3ScoobyWebAPI } from "./s3";
import { ScoobyWebAPI } from "./types";

export * from "./types";

export function createAPI(): ScoobyWebAPI {
  return new S3ScoobyWebAPI();
}
