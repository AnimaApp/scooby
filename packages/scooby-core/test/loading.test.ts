import path from "path";
import { TestEntry } from "../src";
import { loadTestEntries } from "../src/loading";

describe("loading test folders", () => {
  it("loads basic folders correctly", async () => {
    const testsPath = path.resolve(
      __dirname,
      "./data/loading/basic-test-structure"
    );

    const entries = await loadTestEntries(testsPath, ["html"]);

    expect(entries).toEqual([
      {
        id: "test1",
        extension: "html",
        path: path.join(testsPath, "./test1.html"),
        relativePath: "test1.html",
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
        extension: "html",
        path: path.join(testsPath, "./test2.html"),
        relativePath: "test2.html",
      },
    ] as TestEntry[]);
  });

  it("loads multiple file types correctly with conflicting IDs", async () => {
    const testsPath = path.resolve(
      __dirname,
      "./data/loading/multiple-file-types"
    );

    const entries = await loadTestEntries(testsPath, ["html", "css"]);

    expect(entries).toEqual([
      {
        id: "test1-css",
        type: { category: "code", extension: "css" },
        path: path.join(testsPath, "./test1.css"),
        relativePath: "test1.css",
      },
      {
        id: "test1",
        extension: "html",
        path: path.join(testsPath, "./test1.html"),
        relativePath: "test1.html",
      },
      {
        id: "test2",
        extension: "html",
        path: path.join(testsPath, "./test2.html"),
        relativePath: "test2.html",
      },
    ] as TestEntry[]);
  });

  it("loads nested folders correctly", async () => {
    const testsPath = path.resolve(
      __dirname,
      "./data/loading/nested-test-structure"
    );

    const entries = await loadTestEntries(testsPath, ["html"]);

    expect(entries).toEqual([
      {
        id: "test1-index",
        extension: "html",
        path: path.join(testsPath, "./test1/index.html"),
        relativePath: "test1/index.html",
      },
      {
        id: "test2-index",
        extension: "html",
        path: path.join(testsPath, "./test2/index.html"),
        relativePath: "test2/index.html",
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

  it("loads nested folders with multiple files correctly", async () => {
    const testsPath = path.resolve(
      __dirname,
      "./data/loading/nested-multiple-files-test-structure"
    );

    const entries = await loadTestEntries(testsPath, ["html"]);

    expect(entries).toEqual([
      {
        id: "test1-another",
        extension: "html",
        path: path.join(testsPath, "./test1/another.html"),
        relativePath: "test1/another.html",
        options: {
          viewports: [
            {
              width: 400,
              height: 400,
            },
          ],
        },
      },
      {
        id: "test1-index",
        extension: "html",
        path: path.join(testsPath, "./test1/index.html"),
        relativePath: "test1/index.html",
        options: {
          viewports: [
            {
              width: 300,
              height: 300,
            },
          ],
        },
      },
      {
        id: "test2-index",
        extension: "html",
        path: path.join(testsPath, "./test2/index.html"),
        relativePath: "test2/index.html",
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
        id: "test3-file",
        extension: "html",
        path: path.join(testsPath, "./test3/file.html"),
        relativePath: "test3/file.html",
      },
    ] as TestEntry[]);
  });

  it("loads metadata correctly", async () => {
    const testsPath = path.resolve(__dirname, "./data/loading/basic-metadata");

    const entries = await loadTestEntries(testsPath, ["html"]);

    expect(entries).toEqual([
      {
        id: "test1",
        extension: "html",
        path: path.join(testsPath, "./test1.html"),
        relativePath: "test1.html",
        options: {
          metadata: [
            {
              type: "text",
              name: "Example text",
              text: "text metadata",
            },
            {
              type: "link",
              name: "Example link",
              description: "it even has a description",
              url: "https://google.com",
            },
            {
              type: "image",
              name: "Example image",
              image: {
                type: "local",
                path: path.join(testsPath, "test1-image.scooby.png"),
              },
            },
            {
              type: "file",
              name: "Example file",
              file: {
                type: "local",
                path: path.join(testsPath, "./test1-image.scooby.png"),
              },
            },
            {
              type: "code",
              name: "Example code",
              code: {
                type: "local",
                path: path.join(testsPath, "./test1.code.scooby.jsx"),
              },
            },
          ],
        },
      },
      {
        id: "test2",
        extension: "html",
        path: path.join(testsPath, "./test2.html"),
        relativePath: "test2.html",
        options: {
          metadata: [
            {
              type: "code",
              name: "Example code",
              code: {
                type: "local",
                path: path.join(testsPath, "./test2-code.scooby.html"),
              },
            },
          ],
        },
      },
    ] as TestEntry[]);
  });

  it("loads metadata in nested directory with relative paths", async () => {
    const testsPath = path.resolve(__dirname, "./data/loading/nested-metadata");

    const entries = await loadTestEntries(testsPath, ["html"]);

    expect(entries).toEqual([
      {
        id: "test-index",
        extension: "html",
        path: path.join(testsPath, "./test/index.html"),
        relativePath: "test/index.html",
        options: {
          metadata: [
            {
              type: "code",
              name: "example code",
              code: {
                type: "local",
                path: path.join(testsPath, "./assets.scooby/code.js"),
              },
            },
          ],
        },
      },
    ] as TestEntry[]);
  });

  it("throws error if metadata points to invalid path", async () => {
    const testsPath = path.resolve(
      __dirname,
      "./data/loading/invalid-metadata-path"
    );

    await expect(
      async () => await loadTestEntries(testsPath, ["html"])
    ).rejects.toThrow();
  });

  it("skips scooby entries correctly", async () => {
    const testsPath = path.resolve(
      __dirname,
      "./data/loading/skip-scooby-entries-correctly"
    );

    const entries = await loadTestEntries(testsPath, ["html"]);

    expect(entries).toEqual([
      {
        id: "test1-index",
        extension: "html",
        path: path.join(testsPath, "./test1/index.html"),
        relativePath: "test1/index.html",
      },
      {
        id: "test2-index",
        extension: "html",
        path: path.join(testsPath, "./test2/index.html"),
        relativePath: "test2/index.html",
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
