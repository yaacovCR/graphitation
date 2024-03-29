/* eslint-disable */
// Supermassive V3 requires graphql17 for defer/stream tests, and graphql15 for other tests
// By default graphql15 is installed, this scripts installs graphql17 for local testing of defer/stream
const fs = require("fs").promises;
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function main() {
  const packageJsonPath = path.join(__dirname, "..", "package.json");
  const packageJsonData = await fs.readFile(packageJsonPath, "utf-8");

  const { stderr } = await exec(
    //  `yarn add graphql@17.0.0-alpha.3 --exact --dev --no-lockfile`,
    `yarn add graphql@canary-pr-4032 --exact --dev --no-lockfile`,
  );
  console.log(stderr);

  // Yarn modifies package.json, and we don't want that
  // Workaround for missing yarn feature: https://github.com/yarnpkg/yarn/issues/1743
  await fs.writeFile(packageJsonPath, packageJsonData, "utf-8");
}

main().catch(console.error);
