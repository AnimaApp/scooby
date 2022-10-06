// COMMON PROPERTIES

export type TestEntry = {
  id: string;
  path: string;
  options?: TestEntryOptions;
};

export type TestEntryOptions = {
  viewports?: Viewport[];
};

export type Viewport = {
  width: number;
  height: number;
};

export type ImageSize = {
  width: number;
  height: number;
};

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

export type RegressionTestEntry = {
  id: string;
  group: string;
  tags: string[];
};
