import {
  HostedReport,
  HostedResource,
  LocalReport,
  LocalResource,
} from "@animaapp/scooby-shared";
import { clone } from "../utils/clone";

export function getAllLocalResources(object: unknown): LocalResource[] {
  if (typeof object !== "object" || !object) {
    return [];
  }

  const resources: LocalResource[] = [];
  if (isLocalResource(object)) {
    resources.push(object);
  } else if (Array.isArray(object)) {
    for (const item of object) {
      resources.push(...getAllLocalResources(item));
    }
  } else {
    for (const [, value] of Object.entries(object)) {
      resources.push(...getAllLocalResources(value));
    }
  }

  return resources;
}

export function buildHostedReport<THosted extends HostedReport>(
  localReport: LocalReport,
  resources: Record<string, HostedResource>
): THosted {
  const clonedReport = clone(localReport);
  replaceLocalResourcesRecursively(clonedReport, resources);
  return clonedReport as unknown as THosted;
}

function replaceLocalResourcesRecursively(
  object: unknown,
  resources: Record<string, HostedResource>
) {
  if (typeof object !== "object" || !object) {
    return;
  }

  if (Array.isArray(object)) {
    for (let i = 0; i < object.length; i++) {
      const item = object[i];
      if (isLocalResource(item)) {
        object[i] = getResource(item.path, resources);
      } else {
        replaceLocalResourcesRecursively(item, resources);
      }
    }
  } else {
    for (const [key, value] of Object.entries(object)) {
      if (isLocalResource(value)) {
        (object as Record<string, unknown>)[key] = getResource(
          value.path,
          resources
        );
      } else {
        replaceLocalResourcesRecursively(value, resources);
      }
    }
  }

  return resources;
}

function isLocalResource(object: unknown): object is LocalResource {
  return (
    object !== undefined &&
    object !== null &&
    typeof object === "object" &&
    "type" in object &&
    (object as Record<string, unknown>).type === "local" &&
    "path" in object
  );
}

function getResource(
  path: string,
  resources: Record<string, HostedResource>
): HostedResource {
  const resource = resources[path];
  if (!resource) {
    throw new Error(
      "invariant violation, hosted resource not found for path: " + path
    );
  }

  return resource;
}
