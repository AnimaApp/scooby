import { GlobalEnvironmentSetup } from "@animaapp/scooby-shared";
import { MixedScoobyWebAPI } from "./mixed";
import { ScoobyWebAPI } from "./types";

export * from "./types";

export type APICreationOptions = {
  environment: GlobalEnvironmentSetup;
};

export function createAPI(options: APICreationOptions): ScoobyWebAPI {
  return new MixedScoobyWebAPI(options);
}
