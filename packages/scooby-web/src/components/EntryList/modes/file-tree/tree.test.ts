import { convertToTreeData } from "./tree";

describe("convertToTreeData", () => {
  it("works with flat file structure", () => {
    expect(
      convertToTreeData([
        {
          type: "code",
          id: "test1",
          path: "file1.txt",
        },
        {
          type: "code",
          id: "test2",
          path: "file2.txt",
        },
      ])
    ).toMatchObject([
      {
        key: "file1.txt",
        title: "file1.txt",
      },
      {
        key: "file2.txt",
        title: "file2.txt",
      },
    ]);
  });

  it("works with nested file structure", () => {
    expect(
      convertToTreeData([
        {
          type: "code",
          id: "test1",
          path: "file1.txt",
        },
        {
          type: "code",
          id: "test2",
          path: "nested/file2.txt",
        },
        {
          type: "code",
          id: "test3",
          path: "nested/file3.txt",
        },
        {
          type: "code",
          id: "test4",
          path: "nested2/file4.txt",
        },
      ])
    ).toMatchObject([
      {
        key: "file1.txt",
        title: "file1.txt",
      },
      {
        key: "nested",
        title: "nested",
        children: [
          {
            key: "nested/file2.txt",
            title: "file2.txt",
          },
          {
            key: "nested/file3.txt",
            title: "file3.txt",
          },
        ],
      },
      {
        key: "nested2",
        title: "nested2",
        children: [
          {
            key: "nested2/file4.txt",
            title: "file4.txt",
          },
        ],
      },
    ]);
  });
});
