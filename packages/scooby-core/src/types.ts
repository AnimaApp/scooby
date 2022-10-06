// SHARED

export type TestEntryType = "png" | "html";

export type TestEntry = {
  id: string;
  type: TestEntryType;
  path: string;
  options?: TestEntryOptions;
};

export type TestEntryOptions = {
  viewports?: Viewport[];
  tags?: string[];
};

export type Viewport = {
  width: number;
  height: number;
};

export type ImageSize = {
  width: number;
  height: number;
};

export type ImageSourceEntry = {
  id: string;
  groupId: string;
  tags: string[];
  path: string;
};

// REGRESSION

export type RegressionTestRequest = {
  name: string;
  testsPath: string;
  referencePath?: string;
};

export type RegressionTestResult = {
  changed: RegressionTestEntry[];
  new: RegressionTestEntry[];
  removed: RegressionTestEntry[];
};

export type RegressionTestEntry = {
  id: string;
  groupId: string;
  tags: string[];
};
