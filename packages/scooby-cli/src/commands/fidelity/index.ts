import { runReport } from "@animaapp/scooby-core";
import { Command, Flags } from "@oclif/core";
import { fileType, formatterFlag, maxThreadsFlag } from "../../common-flags";

export default class Fidelity extends Command {
  static description = "Run a fidelity test";

  static examples = [
    `$ scooby fidelity --name "codegen-fidelity" --expected "/path/to/your/expected/tests" --actual "/path/to/your/actual/tests"`,
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
    "file-type": fileType,
    "max-threads": maxThreadsFlag,
    formatter: formatterFlag,
    threshold: Flags.string({
      description:
        "Specify a float value that acts as a threshold, with 1 being the strictest and 0 making everything pass. By default it's set to 0 to make all fidelity tests pass.",
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Fidelity);

    await runReport("fidelity", {
      name: flags.name,
      actualPath: flags.actual,
      expectedPath: flags.expected,
      maxThreads: flags["max-threads"],
      formatter: flags.formatter,
      threshold: flags.threshold ? parseFloat(flags.threshold) : undefined,
      fileType: flags["file-type"],
    });
  }
}
