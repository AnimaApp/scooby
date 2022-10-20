export function getAuthToken(): string {
  const token = process.env["SCOOBY_SERVICE_ACCESS_TOKEN"];
  if (!token) {
    throw new Error(
      "could not get access token, please provide the SCOOBY_SERVICE_ACCESS_TOKEN env variable"
    );
  }

  return token;
}
