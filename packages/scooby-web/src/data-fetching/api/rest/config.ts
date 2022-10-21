import { GlobalEnvironmentSetup } from "@animaapp/scooby-shared";
import { APICreationOptions } from "..";

// These are injected automatically by Parcel: https://en.parceljs.org/env.html
const DEFAULT_REST_API_BASE_URL = process.env.SCOOBY_SERVICE_BASE_URL;
const DEFAULT_REST_API_ACCESS_TOKEN = process.env.SCOOBY_SERVICE_ACCESS_TOKEN;

export type RestAPIConfig = {
  baseUrl: string;
  accessToken: string;
  environment: GlobalEnvironmentSetup;
};

export function getRestAPIConfig(options: APICreationOptions): RestAPIConfig {
  const baseUrl =
    options.environment.restApi?.baseUrl ?? DEFAULT_REST_API_BASE_URL;
  const accessToken =
    options.environment.restApi?.accessToken ?? DEFAULT_REST_API_ACCESS_TOKEN;

  if (!baseUrl) {
    throw new Error("could not determine Rest API base URL");
  }
  if (!accessToken) {
    throw new Error("could not determine Rest API access token");
  }

  return {
    baseUrl,
    accessToken,
    environment: options.environment,
  };
}
