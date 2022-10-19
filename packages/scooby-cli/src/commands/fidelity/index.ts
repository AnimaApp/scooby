import { runReport } from "@animaapp/scooby-core";
import { Command, Flags } from "@oclif/core";

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
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Fidelity);

    await runReport("fidelity", {
      name: flags.name,
      actualPath: flags.actual,
      expectedPath: flags.expected,
    });
  }
}
