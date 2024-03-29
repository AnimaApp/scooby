import { runReport } from "@animaapp/scooby-core";
import { Command, Flags } from "@oclif/core";
import {
  convertFlagsToReportOutputTarget,
  parseFileTypesFlag,
} from "../../shared/convert";
import {
  datasetType,
  formatterFlag,
  maxThreadsFlag,
  outputFlag,
} from "../../shared/flags";

export default class Regression extends Command {
  static description = "Run a regression test";

  static examples = [
    `$ scooby regression --name "codegen-regression" --tests "/path/to/your/tests" --file-type=html`,
  ];

  static flags = {
    name: Flags.string({
      char: "n",
      description: "The name of the regression test, ie. 'codegen-regression'",
      required: true,
    }),
    tests: Flags.string({
      char: "t",
      description: "Path to the folder containing the tests",
      required: true,
    }),
    reference: Flags.string({
      char: "r",
      description:
        "Specify a custom path that acts as reference dataset, instead of pulling it automatically. You should probably not use this, unless you know what you're doing.",
    }),
    "file-type": Flags.string({
      char: "f",
      description:
        "Specify a file type to test. For example, --file-type=html. You can also specify multiple file types, such as --file-type=html,css",
      required: true,
    }),
    "max-backtracking": Flags.integer({
      description:
        "Specify the number of backtracking attempts on previous commits to find a matching reference dataset. This is mostly useful when the main branch doesn't publish reference datasets for each commit.",
    }),
    "max-threads": maxThreadsFlag,
    "dataset-type": datasetType,
    formatter: formatterFlag,
    output: outputFlag,
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Regression);

    const fileTypes = parseFileTypesFlag(flags["file-type"]);
    if (!fileTypes) {
      throw new Error(
        "no file type flag specified, please specify the 'file-type' flag"
      );
    }

    await runReport("regression", {
      name: flags.name,
      testsPath: flags.tests,
      referencePath: flags.reference,
      maxReferenceCommitBacktracking: flags["max-backtracking"],
      maxThreads: flags["max-threads"],
      overrideDatasetType: flags["dataset-type"],
      formatter: flags.formatter,
      fileTypes,
      output: convertFlagsToReportOutputTarget(flags.name, flags),
    });
  }
}
