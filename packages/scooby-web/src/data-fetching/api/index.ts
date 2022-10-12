import { S3ScoobyWebAPI } from "./s3";
import { ScoobyWebAPI } from "./types";

export * from "./types";

export type APICreationOptions = {
  s3?: {
    bucket: string;
    region: string;
  };
};

export function createAPI(options: APICreationOptions): ScoobyWebAPI {
  return new S3ScoobyWebAPI(options);
}
