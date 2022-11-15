import { Formatter } from "@animaapp/scooby-core";
import { Flags } from "@oclif/core";

export const maxThreadsFlag = Flags.integer({
  description:
    "Specify the number of threads to be used when doing CPU-heavy processing.",
});

export const formatterFlag = Flags.enum<Formatter>({
  description:
    "Specify the formatter to be used in text-based tests. Specify 'none' to disable auto-formatting.",
  options: ["none", "json", "prettier"],
});

export const fileType = Flags.string({
  char: "f",
  description: "Specify a file type to test. For example, --file-type=html",
  required: true,
});

export type OutputType = "auto" | "zip" | "hosted";
export const outputFlag = Flags.enum<OutputType>({
  options: ["auto", "zip", "hosted"],
  char: "o",
  description:
    "Specify the output target for the generated report. Locally, it defaults to 'zip', while it defaults to 'hosted' when running on the CI.",
  default: "auto",
});
