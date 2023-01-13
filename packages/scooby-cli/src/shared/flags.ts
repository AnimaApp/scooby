import { Formatter } from "@animaapp/scooby-core";
import { Flags } from "@oclif/core";

export const expectedFlag = Flags.string({
  char: "e",
  description: "Path to the folder containing the expected tests",
  required: true,
});

export const actualFlag = Flags.string({
  char: "a",
  description: "Path to the folder containing the actual tests",
  required: true,
});

export const maxThreadsFlag = Flags.integer({
  description:
    "Specify the number of threads to be used when doing CPU-heavy processing.",
});

export const formatterFlag = Flags.enum<Formatter>({
  description:
    "Specify the formatter to be used in text-based tests. Specify 'none' to disable auto-formatting.",
  options: ["none", "json", "prettier"],
});

export const actualFileTypeFlag = Flags.string({
  description:
    "Specify a file type to test the 'actual' dataset. This is useful when the actual and expected datasets use different formats. For example, --actual-file-type=html. You can also specify multiple file types, such as --actual-file-type=html,css",
});

export const expectedFileTypeFlag = Flags.string({
  description:
    "Specify a file type to test the 'actual' dataset. This is useful when the actual and expected datasets use different formats. For example, --expected-file-type=html. You can also specify multiple file types, such as --actual-file-type=html,css",
});

export type OutputType = "auto" | "zip" | "hosted";
export const outputFlag = Flags.enum<OutputType>({
  options: ["auto", "zip", "hosted"],
  char: "o",
  description:
    "Specify the output target for the generated report. Locally, it defaults to 'zip', while it defaults to 'hosted' when running on the CI.",
  default: "auto",
});

export type DatasetType = "code" | "image";
export const datasetType = Flags.enum<DatasetType>({
  options: ["code", "image"],
  description: "Specify the type of the dataset and how it should be reported.",
});
