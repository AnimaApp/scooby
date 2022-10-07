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
