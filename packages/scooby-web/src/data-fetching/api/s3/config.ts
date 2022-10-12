export type S3Config = {
  region: string;
  bucket: string;
};

export function getS3Config(): S3Config {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  return {
    region: params["_s3_region"],
    bucket: params["_s3_bucket"],
  };
}
