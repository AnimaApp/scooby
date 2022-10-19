import { updateStatus } from "@animaapp/scooby-core";
import { Command } from "@oclif/core";

export default class UpdateGitHubStatus extends Command {
  static description =
    "Update a PR/Commit status (including GitHub), based on the previously executed reports and reviews.";

  static examples = [`$ scooby update-status`];

  static flags = {};

  async run(): Promise<void> {
    await this.parse(UpdateGitHubStatus);

    await updateStatus();
  }
}
