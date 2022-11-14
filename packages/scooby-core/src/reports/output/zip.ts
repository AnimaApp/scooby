import mime from "mime-types";
import { readFile, writeFile, rename } from "fs/promises";
import path from "path";
import {
  HostedReport,
  HostedResource,
  LocalReport,
  LocalResource,
  Report,
} from "@animaapp/scooby-shared";
import { ZipReportOutputTarget } from "../../types";
import { createTemporaryDirectory } from "../../utils/temp";
import { clone } from "../../utils/clone";
import { archiveDirectory } from "../../archive";

export async function buildZipReportOutput(
  report: LocalReport,
  output: ZipReportOutputTarget
): Promise<Report> {
  console.log("generating report archive...");
  const tempArchiveDir = await createTemporaryDirectory("report-zip");

  const resources = getAllLocalResources(report);
  const resourceDataUris = await generateDataURIHostedResources(resources);
  const archivedReport = buildArchivedReport(report, resourceDataUris);
  await writeFile(
    path.join(tempArchiveDir, "report.json"),
    JSON.stringify(archivedReport, undefined, 2),
    "utf-8"
  );

  const archivePath = await archiveDirectory(tempArchiveDir);
  await rename(archivePath, output.path);

  console.log("done!");
  return archivedReport;
}

function getAllLocalResources(object: unknown): LocalResource[] {
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

async function generateDataURIHostedResources(
  resources: LocalResource[]
): Promise<Record<string, HostedResource>> {
  const output: Record<string, HostedResource> = {};

  for (const resource of resources) {
    const content = await readFile(resource.path);
    const b64 = content.toString("base64");
    const mimeType = mime.lookup(resource.path) || "text/plain";
    const dataURI = `data:${mimeType};base64,${b64}`;

    output[resource.path] = {
      type: "hosted",
      url: dataURI,
    };
  }

  return output;
}

function buildArchivedReport<THosted extends HostedReport>(
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
      "invariant violation, resource not found for path: " + path
    );
  }

  return resource;
}
