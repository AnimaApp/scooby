import { runReport } from "@animaapp/scooby-core";
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
    reference: Flags.string({
      char: "r",
      description:
        "(optional) Specify a custom path that acts as reference dataset, instead of pulling it automatically. You should probably not use this, unless you know what you're doing.",
      required: false,
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Regression);

    await runReport("regression", {
      name: flags.name,
      testsPath: flags.tests,
      referencePath: flags.reference,
    });
  }
}
