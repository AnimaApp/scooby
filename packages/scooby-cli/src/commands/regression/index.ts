import { runReport } from "@animaapp/scooby-core";
import { Command, Flags } from "@oclif/core";
import { formatterFlag, maxThreadsFlag } from "../../common-flags";

export default class Regression extends Command {
  static description = "Run a regression test";

  static examples = [
    `$ scooby regression --name "codegen-regression" --tests "/path/to/your/tests"`,
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
    "max-backtracking": Flags.integer({
      description:
        "Specify the number of backtracking attempts on previous commits to find a matching reference dataset. This is mostly useful when the main branch doesn't publish reference datasets for each commit.",
    }),
    "max-threads": maxThreadsFlag,
    formatter: formatterFlag,
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Regression);

    await runReport("regression", {
      name: flags.name,
      testsPath: flags.tests,
      referencePath: flags.reference,
      maxReferenceCommitBacktracking: flags["max-backtracking"],
      maxThreads: flags["max-threads"],
      formatter: flags.formatter,
    });
  }
}
