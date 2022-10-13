import { LocalResource } from "@animaapp/scooby-shared";

export function convertPathToLocalResource(path: string): LocalResource {
  return {
    type: "local",
    path,
  };
}
