import path from "path";
import { TestEntry } from "../src";
import { loadTestEntries } from "../src/loading";

describe("loading test folders", () => {
  it("loads basic folders correctly", async () => {
    const testsPath = path.resolve(
      __dirname,
      "./data/loading/basic-test-structure"
    );

    const entries = await loadTestEntries(testsPath);

    expect(entries).toEqual([
      {
        id: "test1",
        path: path.join(testsPath, "./test1.html"),
        options: {
          viewports: [
            {
              width: 1920,
              height: 1080,
            },
          ],
        },
      },
      {
        id: "test2",
        path: path.join(testsPath, "./test2.html"),
      },
    ] as TestEntry[]);
  });

  it("loads nested folders correctly", async () => {
    const testsPath = path.resolve(
      __dirname,
      "./data/loading/nested-test-structure"
    );

    const entries = await loadTestEntries(testsPath);

    expect(entries).toEqual([
      {
        id: "test1",
        path: path.join(testsPath, "./test1/index.html"),
      },
      {
        id: "test2",
        path: path.join(testsPath, "./test2/index.html"),
        options: {
          viewports: [
            {
              width: 1920,
              height: 1080,
            },
          ],
        },
      },
    ] as TestEntry[]);
  });
});
