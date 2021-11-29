const exec = require("child_process").execSync;
async function globalSetup() {
  await exec(
    "npx xunit-viewer -r  allure-results/results/results.xml -o allure-results/results/results.html "
  );
}
export default globalSetup;
