import { GlobalEnvironmentSetup } from "@animaapp/scooby-shared";
import { MixedScoobyWebAPI } from "./mixed";
import { ScoobyWebAPI } from "./types";
import { ZipScoobyWebAPI } from "./zip";

export * from "./types";

export type APICreationOptions = {
  environment: GlobalEnvironmentSetup;
};

export function createAPI(
  options: APICreationOptions
): ScoobyWebAPI | undefined {
  if (options.environment.s3 && options.environment.restApi) {
    return new MixedScoobyWebAPI(options);
  }
  if (options.environment.zipArchive) {
    return new ZipScoobyWebAPI(options.environment.zipArchive.buffer);
  }
}
