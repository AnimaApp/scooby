import { runReport } from "@animaapp/scooby-core";
import { Command, Flags } from "@oclif/core";
import { convertFlagsToReportOutputTarget } from "../../shared/convert";
import { formatterFlag, maxThreadsFlag, outputFlag } from "../../shared/flags";

export default class Fidelity extends Command {
  static description = "Run a fidelity test";

  static examples = [
    `$ scooby fidelity --name "codegen-fidelity" --expected "/path/to/your/expected/tests" --actual "/path/to/your/actual/tests" --file-type=html`,
  ];

  static flags = {
    name: Flags.string({
      char: "n",
      description: "The name of the fidelity test, ie. 'codegen-fidelity'",
      required: true,
    }),
    expected: Flags.string({
      char: "e",
      description: "Path to the folder containing the expected tests",
      required: true,
    }),
    actual: Flags.string({
      char: "a",
      description: "Path to the folder containing the actual tests",
      required: true,
    }),
    "max-threads": maxThreadsFlag,
    formatter: formatterFlag,
    threshold: Flags.string({
      description:
        "Specify a float value that acts as a threshold, with 1 being the strictest and 0 making everything pass. By default it's set to 0 to make all fidelity tests pass.",
    }),
    "file-type": Flags.string({
      char: "f",
      description: "Specify a file type to test. For example, --file-type=html",
    }),
    "actual-file-type": Flags.string({
      description:
        "Specify a file type to test the 'actual' dataset. This is useful when the actual and expected datasets use different formats. For example, --actual-file-type=html",
    }),
    "expected-file-type": Flags.string({
      description:
        "Specify a file type to test the 'actual' dataset. This is useful when the actual and expected datasets use different formats. For example, --expected-file-type=html",
    }),
    output: outputFlag,
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Fidelity);

    const actualFileType = flags["actual-file-type"] ?? flags["file-type"];
    const expectedFileType = flags["expected-file-type"] ?? flags["file-type"];

    if (!actualFileType || !expectedFileType) {
      throw new Error(
        "no file type flag specified, please either specify the 'file-type' flag or the 'actual-file-type' and 'expected-file-type' flags"
      );
    }

    await runReport("fidelity", {
      name: flags.name,
      actualPath: flags.actual,
      expectedPath: flags.expected,
      maxThreads: flags["max-threads"],
      formatter: flags.formatter,
      threshold: flags.threshold ? parseFloat(flags.threshold) : undefined,
      actualFileType,
      expectedFileType,
      output: convertFlagsToReportOutputTarget(flags.name, flags),
    });
  }
}
