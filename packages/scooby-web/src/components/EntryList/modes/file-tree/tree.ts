import { DataNode } from "antd/lib/tree";
import { Entry } from "../../../../types";

export function convertToTreeData(entries: Entry[]): DataNode[] {
  const nodes: DataNode[] = [];

  for (const entry of entries) {
    const path = (entry.path ?? entry.id).split("/");
    addEntryToTreeRecursively([], path, entry, nodes);
  }

  return nodes;
}

function addEntryToTreeRecursively(
  prefix: string[],
  suffix: string[],
  entry: Entry,
  nodes: DataNode[]
) {
  if (!suffix.length) {
    return;
  }

  const base = suffix[0];
  if (!base) {
    return;
  }

  const isLeaf = suffix.length === 1;

  let matchingNode = nodes.find((node) => {
    const keyPath = (node.key as string).split("/");
    const last = keyPath[keyPath.length - 1];
    return last === base;
  });

  if (!matchingNode) {
    matchingNode = {
      key: [...prefix, base].join("/"),
      title: base,
      isLeaf,
    };
    nodes.push(matchingNode);
  }

  if (!isLeaf) {
    if (!matchingNode.children) {
      matchingNode.children = [];
    }

    addEntryToTreeRecursively(
      [...prefix, base],
      suffix.slice(1),
      entry,
      matchingNode.children
    );
  }

  nodes.sort((a, b) => (a.key as string).localeCompare(b.key as string));
}
