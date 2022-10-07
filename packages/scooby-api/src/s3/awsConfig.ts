import {} from "@aws-sdk/client-s3";
import { ScoobyAPIOptions } from "../options";

export function getAWSCredentials(options: ScoobyAPIOptions): {
  accessKeyId: string;
  secretAccessKey: string;
} {
  if (options.awsCredentials) {
    console.log("loading AWS credentials from option overrides");
    return {
      accessKeyId: options.awsCredentials.accessKeyId,
      secretAccessKey: options.awsCredentials.secretAccessKey,
    };
  }

  const accessKeyId = process.env["SCOOBY_AWS_ACCESS_KEY_ID"];
  const secretAccessKey = process.env["SCOOBY_AWS_SECRET_ACCESS_KEY"];
  if (accessKeyId && secretAccessKey) {
    console.log("loading AWS credentials from env variables");
    return {
      accessKeyId,
      secretAccessKey,
    };
  }

  throw new Error(
    "unable to obtain AWS credentials, please specify them as ENV variable or option overrides"
  );
}

export type BucketOptions = {
  bucket: string;
};

export function getAWSBucketOptions(options: ScoobyAPIOptions): BucketOptions {
  if (options.awsS3Bucket) {
    console.log("loading AWS S3 bucket config from option overrides");
    return {
      bucket: options.awsS3Bucket.name,
    };
  }

  const bucket = process.env["SCOOBY_AWS_S3_BUCKET"];
  if (bucket) {
    console.log("loading AWS S3 bucket config from env variables");
    return {
      bucket,
    };
  }

  throw new Error(
    "unable to obtain AWS S3 bucket config, please specify them as ENV variable or option overrides"
  );
}
