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
  description: "Specify a file type to test",
  required: true,
});
