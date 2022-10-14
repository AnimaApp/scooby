import { runRegressionTest } from "@animaapp/scooby-core";
import { Command } from "@oclif/core";

export default class UpdateGitHubStatus extends Command {
  static description =
    "Update a PR/Commit status on GitHub, based on the previously executed reports.";

  static examples = [`$ scooby update-github-status`];

  static flags = {};

  async run(): Promise<void> {
    const { flags } = await this.parse(UpdateGitHubStatus);

    // TODO
  }
}
