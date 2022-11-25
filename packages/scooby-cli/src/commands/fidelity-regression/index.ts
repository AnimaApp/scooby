import { FidelityMatchingType, runReport } from "@animaapp/scooby-core";
import { Command, Flags } from "@oclif/core";
import { convertFlagsToReportOutputTarget } from "../../shared/convert";
import {
  actualFileTypeFlag,
  actualFlag,
  expectedFileTypeFlag,
  expectedFlag,
  formatterFlag,
  maxThreadsFlag,
  outputFlag,
} from "../../shared/flags";

export default class FidelityRegression extends Command {
  static description = "Run a fidelity regression test";

  static examples = [
    `$ scooby fidelity-regression --name "codegen-fidelity-regression" --expected "/path/to/your/expected/tests" --actual "/path/to/your/actual/tests" --file-type=html`,
  ];

  static flags = {
    name: Flags.string({
      char: "n",
      description: "The name of the regression test, ie. 'codegen-regression'",
      required: true,
    }),
    expected: expectedFlag,
    actual: actualFlag,
    reference: Flags.string({
      char: "r",
      description:
        "Specify a custom path that acts as reference dataset, instead of pulling it automatically. You should probably not use this, unless you know what you're doing.",
    }),
    "file-type": Flags.string({
      char: "f",
      description: "Specify a file type to test. For example, --file-type=html",
    }),
    "actual-file-type": actualFileTypeFlag,
    "expected-file-type": expectedFileTypeFlag,
    "max-backtracking": Flags.integer({
      description:
        "Specify the number of backtracking attempts on previous commits to find a matching reference dataset. This is mostly useful when the main branch doesn't publish reference datasets for each commit.",
    }),
    "fidelity-matching": Flags.enum<FidelityMatchingType>({
      options: ["default", "flexible"],
      description: "Specify fidelity matching process",
      default: "default",
    }),
    "max-threads": maxThreadsFlag,
    formatter: formatterFlag,
    output: outputFlag,
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(FidelityRegression);

    const actualFileType = flags["actual-file-type"] ?? flags["file-type"];
    const expectedFileType = flags["expected-file-type"] ?? flags["file-type"];

    if (!actualFileType || !expectedFileType) {
      throw new Error(
        "no file type flag specified, please either specify the 'file-type' flag or the 'actual-file-type' and 'expected-file-type' flags"
      );
    }

    await runReport("fidelityRegression", {
      name: flags.name,
      actualPath: flags.actual,
      expectedPath: flags.expected,
      referencePath: flags.reference,
      maxReferenceCommitBacktracking: flags["max-backtracking"],
      maxThreads: flags["max-threads"],
      formatter: flags.formatter,
      actualFileType,
      expectedFileType,
      fidelityMatching: flags["fidelity-matching"],
      output: convertFlagsToReportOutputTarget(flags.name, flags),
    });
  }
}
