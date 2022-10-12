import { APICreationOptions } from "..";

export type S3Config = {
  region: string;
  bucket: string;
};

export function getS3Config(options: APICreationOptions): S3Config {
  if (!options.s3) {
    throw new Error("missing S3 configuration options");
  }

  return {
    region: options.s3.region,
    bucket: options.s3.bucket,
  };
}
