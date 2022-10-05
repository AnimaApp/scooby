// REGRESSION

export type RegressionTestRequest = {
  name: string;
  testsPath: string;
};

export type RegressionTestResult = {
  changed: RegressionTestEntry[];
  new: RegressionTestEntry[];
  removed: RegressionTestEntry[];
};

export type RegressionTestEntry = {};
