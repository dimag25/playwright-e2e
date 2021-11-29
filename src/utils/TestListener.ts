import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestError,
  TestResult,
  TestStep,
} from "@playwright/test/reporter";
import Logger from "./Logger";
const fs = require("fs-extra");
const allureResultsPath = 'allure-results'

export default class TestListener implements Reporter {
  onBegin(config: FullConfig, suite: Suite): void {
    //clean previous allure-results
    if (fs.existsSync(allureResultsPath)) {
      fs.rmdirSync(allureResultsPath, { recursive: true });
    }
    // console.log(
    //   "##############################################################################"
    // );
    // console.log("Started Suite " + suite.suites[0].suites[0].suites[0].title);
    // console.log(
    //   "##############################################################################"
    // );
  }

  onTestBegin(test: TestCase, result: TestResult): void {
    this.printTest("Test: " + test.title + " - Started");
  }
  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === "failed") {
      Logger.info(
        "Test: " +
          test.title +
          " - " +
          result.status +
          "\n" +
          result.error.stack
      );
    }
    this.printTest("Test : " + test.title + " - " + result.status);
  }

  onStdOut(chunk: string | Buffer, test?: TestCase, result?: TestResult): void {
    Logger.info(chunk);
  }

  onStdErr(chunk: string | Buffer, test?: TestCase, result?: TestResult): void {
    Logger.error(chunk);
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === "test.step") {
      this.printStep("Started Step: " + step.title);
    }
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === "test.step") {
      this.printStep("Completed Step: " + step.title);
    }
  }

  onError(error: TestError): void {
    Logger.error("Message: " + error.message);
    Logger.error("Stack: " + error.stack);
    Logger.error("Value: " + error.value);
  }
  /*
        onEnd(result: FullResult): void | Promise<void> {
            console.log("##############################################################################");
            console.log('\t\t\tCompleted Suite ' + result.status.toUpperCase());
            console.log("##############################################################################");
        }   
    */
  private printStep(msg: string) {
    Logger.info(
      "-------------------------------------------------------------------------------"
    );
    Logger.info("\t" + msg.toUpperCase());
    Logger.info(
      "-------------------------------------------------------------------------------"
    );
  }

  private printTest(msg: string) {
    Logger.info(
      "##############################################################################"
    );
    Logger.info("\t" + msg.toUpperCase());
    Logger.info(
      "##############################################################################"
    );
  }
}
