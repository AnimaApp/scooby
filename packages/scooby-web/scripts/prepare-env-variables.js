/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: require("find-config")(".env") });

const path = require("path");
const fs = require("fs/promises");

const ENV_VARIABLES = [
  "SCOOBY_SERVICE_ACCESS_TOKEN",
  "SCOOBY_SERVICE_BASE_URL",
];

async function main() {
  const variables = {};

  for (const variable of ENV_VARIABLES) {
    const value = process.env[variable];
    if (!value) {
      throw new Error(
        `could not resolve env variable '${variable}', please make sure to specify it`
      );
    }

    variables[variable] = value;
  }

  const content = Object.entries(variables)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const targetEnvFile = path.join(__dirname, "../.env");
  await fs.writeFile(targetEnvFile, content, "utf-8");
}

main();
