import { runRegressionTest } from "@animaapp/scooby-core";
import { Command, Flags } from "@oclif/core";

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
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Regression);

    const result = await runRegressionTest({
      name: flags.name,
      testsPath: flags.tests,
    });
  }
}
