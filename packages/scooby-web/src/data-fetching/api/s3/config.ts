export type S3Config = {
  region: string;
  bucket: string;
};

export function getS3Config(): S3Config {
  // TODO: make not hardcoded
  return {
    region: "us-west-2",
    bucket: "scooby-testing-development",
  };
}
