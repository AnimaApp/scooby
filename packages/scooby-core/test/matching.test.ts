import { matchSources, MatchedSources } from "../src/matching";

describe("matching", () => {
  it("detects new entries correctly", async () => {
    expect(
      matchSources(
        [
          {
            id: "A",
            groupId: "A",
          },
        ],
        [
          {
            id: "A",
            groupId: "A",
          },
          {
            id: "B",
            groupId: "B",
          },
        ]
      )
    ).toEqual({
      new: [
        {
          id: "B",
          groupId: "B",
        },
      ],
      matching: [
        {
          expected: {
            id: "A",
            groupId: "A",
          },
          actual: {
            id: "A",
            groupId: "A",
          },
        },
      ],
      removed: [],
    } as MatchedSources<any>);
  });

  it("detects removed entries correctly", async () => {
    expect(
      matchSources(
        [
          {
            id: "A",
            groupId: "A",
          },
          {
            id: "B",
            groupId: "B",
          },
        ],
        [
          {
            id: "A",
            groupId: "A",
          },
        ]
      )
    ).toEqual({
      new: [],
      matching: [
        {
          expected: {
            id: "A",
            groupId: "A",
          },
          actual: {
            id: "A",
            groupId: "A",
          },
        },
      ],
      removed: [
        {
          id: "B",
          groupId: "B",
        },
      ],
    } as MatchedSources<any>);
  });

  it("falls back on expected group id matching correctly", async () => {
    expect(
      matchSources(
        [
          {
            id: "A",
            groupId: "A",
          },
          {
            id: "B",
            groupId: "B",
          },
        ],
        [
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ]
      )
    ).toEqual({
      new: [],
      matching: [
        {
          expected: {
            id: "A",
            groupId: "A",
          },
          actual: {
            id: "A-300x200",
            groupId: "A",
          },
        },
        {
          expected: {
            id: "B",
            groupId: "B",
          },
          actual: {
            id: "B-900x200",
            groupId: "B",
          },
        },
      ],
      removed: [],
    } as MatchedSources<any>);
  });

  it("don't fallback to ambiguous groupId", async () => {
    expect(
      matchSources(
        [
          {
            id: "A",
            groupId: "A",
          },
          {
            id: "B",
            groupId: "B",
          },
        ],
        [
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "A-900x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ]
      )
    ).toEqual({
      new: [
        {
          id: "A-300x200",
          groupId: "A",
        },
        {
          id: "A-900x200",
          groupId: "A",
        },
      ],
      matching: [
        {
          expected: {
            id: "B",
            groupId: "B",
          },
          actual: {
            id: "B-900x200",
            groupId: "B",
          },
        },
      ],
      removed: [
        {
          id: "A",
          groupId: "A",
        },
      ],
    } as MatchedSources<any>);
  });

  it("matches by id with conflicting group IDs", async () => {
    expect(
      matchSources(
        [
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "A-900x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ],
        [
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "A-900x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ]
      )
    ).toEqual({
      new: [],
      matching: [
        {
          expected: {
            id: "A-300x200",
            groupId: "A",
          },
          actual: {
            id: "A-300x200",
            groupId: "A",
          },
        },
        {
          expected: {
            id: "A-900x200",
            groupId: "A",
          },
          actual: {
            id: "A-900x200",
            groupId: "A",
          },
        },
        {
          expected: {
            id: "B-900x200",
            groupId: "B",
          },
          actual: {
            id: "B-900x200",
            groupId: "B",
          },
        },
      ],
      removed: [],
    } as MatchedSources<any>);
  });

  it("matches different ids if group Id matches", async () => {
    expect(
      matchSources(
        [
          // From images
          {
            id: "A",
            groupId: "A",
          },
          {
            id: "B",
            groupId: "B",
          },
        ],
        [
          // From HTML
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ]
      )
    ).toEqual({
      new: [],
      matching: [
        {
          expected: {
            id: "A",
            groupId: "A",
          },
          actual: {
            id: "A-300x200",
            groupId: "A",
          },
        },
        {
          expected: {
            id: "B",
            groupId: "B",
          },
          actual: {
            id: "B-900x200",
            groupId: "B",
          },
        },
      ],
      removed: [],
    } as MatchedSources<any>);
  });

  it("matches different ids if group Id matches (reversed)", async () => {
    expect(
      matchSources(
        [
          // From HTML
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ],
        [
          // From images
          {
            id: "A",
            groupId: "A",
          },
          {
            id: "B",
            groupId: "B",
          },
        ]
      )
    ).toEqual({
      new: [],
      matching: [
        {
          actual: {
            id: "A",
            groupId: "A",
          },
          expected: {
            id: "A-300x200",
            groupId: "A",
          },
        },
        {
          actual: {
            id: "B",
            groupId: "B",
          },
          expected: {
            id: "B-900x200",
            groupId: "B",
          },
        },
      ],
      removed: [],
    } as MatchedSources<any>);
  });

  it("doesn't match ambiguous 'actual' IDs", async () => {
    expect(
      matchSources(
        [
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ],
        [
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "A-900x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ]
      )
    ).toEqual({
      new: [
        {
          id: "A-900x200",
          groupId: "A",
        },
      ],
      matching: [
        {
          actual: {
            id: "A-300x200",
            groupId: "A",
          },
          expected: {
            id: "A-300x200",
            groupId: "A",
          },
        },
        {
          actual: {
            id: "B-900x200",
            groupId: "B",
          },
          expected: {
            id: "B-900x200",
            groupId: "B",
          },
        },
      ],
      removed: [],
    } as MatchedSources<any>);
  });

  it("doesn't match ambiguous 'actual' IDs (reversed)", async () => {
    expect(
      matchSources(
        [
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "A-900x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ],
        [
          {
            id: "A-300x200",
            groupId: "A",
          },
          {
            id: "B-900x200",
            groupId: "B",
          },
        ]
      )
    ).toEqual({
      new: [],
      matching: [
        {
          actual: {
            id: "A-300x200",
            groupId: "A",
          },
          expected: {
            id: "A-300x200",
            groupId: "A",
          },
        },
        {
          actual: {
            id: "B-900x200",
            groupId: "B",
          },
          expected: {
            id: "B-900x200",
            groupId: "B",
          },
        },
      ],
      removed: [
        {
          id: "A-900x200",
          groupId: "A",
        },
      ],
    } as MatchedSources<any>);
  });

  it("matches non-indentical folders with flexible match", async () => {
    expect(
      matchSources(
        [
          {
            id: "A-frame",
            groupId: "A-frame",
          },
        ],
        [
          {
            id: "A-html-frame-300x200",
            groupId: "A-html-frame",
          },
          {
            id: "A-react-frame-300x200",
            groupId: "A-react-frame",
          },
          {
            id: "B-html-frame-300x200",
            groupId: "B-html-frame",
          },
        ],
        {
          strategy: "flexible",
        }
      )
    ).toEqual({
      removed: [],
      matching: [
        {
          actual: {
            id: "A-html-frame-300x200",
            groupId: "A-html-frame",
          },
          expected: {
            id: "A-frame",
            groupId: "A-frame",
          },
        },
        {
          actual: {
            id: "A-react-frame-300x200",
            groupId: "A-react-frame",
          },
          expected: {
            id: "A-frame",
            groupId: "A-frame",
          },
        },
      ],
      new: [
        {
          id: "B-html-frame-300x200",
          groupId: "B-html-frame",
        },
      ],
    } as MatchedSources<any>);
  });

  it("matches non-indentical folders with flexible match folder name only", async () => {
    expect(
      matchSources(
        [
          {
            id: "A-frame",
            groupId: "A-frame",
          },
        ],
        [
          {
            id: "A-html-frame-300x200",
            groupId: "A-html-frame",
          },
          {
            id: "A-react-index-300x200",
            groupId: "A-react-index",
          },
        ],
        {
          strategy: "flexible",
        }
      )
    ).toEqual({
      removed: [],
      matching: [
        {
          actual: {
            id: "A-html-frame-300x200",
            groupId: "A-html-frame",
          },
          expected: {
            id: "A-frame",
            groupId: "A-frame",
          },
        },
        {
          actual: {
            id: "A-react-index-300x200",
            groupId: "A-react-index",
          },
          expected: {
            id: "A-frame",
            groupId: "A-frame",
          },
        },
      ],
      new: [],
    } as MatchedSources<any>);
  });
});
