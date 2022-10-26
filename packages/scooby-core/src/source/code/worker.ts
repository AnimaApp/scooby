import { parse } from "path";
import { readFile, writeFile } from "fs/promises";
import prettier from "prettier";
import { PrepareCodeSourceRequest, PrepareCodeSourceResult } from "./batch";
import { Formatter } from "../../types";
import { createTemporaryFile } from "../../utils/temp";

export default async function runPrepareSourceProcess(
  request: PrepareCodeSourceRequest
): Promise<PrepareCodeSourceResult> {
  const sourceContent = await readFile(request.sourcePath, "utf-8");

  const sourceExtension = getExtension(request.sourcePath);
  const formatter = getFormatter(sourceExtension, request.formatter);

  if (!formatter) {
    return {
      id: request.id,
      // If no formatting is necessary, we can return the original file
      preparedSourcePath: request.sourcePath,
    };
  }

  const formattedSource = await formatter(sourceContent);

  const outputFile = await createTemporaryFile(
    "formatted",
    sourceExtension ? `.${sourceExtension}` : ""
  );
  await writeFile(outputFile, formattedSource, "utf-8");

  return {
    id: request.id,
    preparedSourcePath: outputFile,
  };
}

type FormatFunction = (source: string) => Promise<string>;

function getFormatter(
  extension: string | undefined,
  formatterOverride?: Formatter
): FormatFunction | undefined {
  if (!extension) {
    return;
  }

  if (formatterOverride === "none") {
    return;
  }

  if (formatterOverride === "json" || extension === "json") {
    return getJSONFormatter();
  }

  if (formatterOverride === "prettier" || isCompatibleWithPrettier(extension)) {
    return getPrettierFormatter(extension);
  }
}

function getJSONFormatter(): FormatFunction {
  return async function jsonFormatter(source: string) {
    const parsedJSON = JSON.parse(source);
    return JSON.stringify(parsedJSON, undefined, 2);
  };
}

function isCompatibleWithPrettier(extension: string): boolean {
  switch (extension) {
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
    case "vue":
    case "css":
    case "scss":
    case "html":
      return true;
  }

  return false;
}

function getPrettierFormatter(extension: string): FormatFunction {
  return async function prettierFormatter(source: string) {
    return prettier.format(source, { filepath: `file.${extension}` });
  };
}

function getExtension(filePath: string): string | undefined {
  const parts = parse(filePath);

  if (!parts.ext || !parts.ext.includes(".")) {
    return;
  }

  const extension = parts.ext.split(".")[1];
  return extension;
}

module.exports = runPrepareSourceProcess;
