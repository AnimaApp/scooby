import { createReadStream } from "fs";
import { writeFile } from "fs/promises";
import { promisify } from "util";
import { exec } from "child_process";
const execPromise = promisify(exec);

import { CodeComparator, CodeComparisonResult } from ".";
import { createTemporaryFile } from "../../../utils/temp";

const MAX_EXEC_BUFFER = 1024 * 1024 * 32;

export async function isUnixDiffAvailable(): Promise<boolean> {
  try {
    await execPromise("diff --version", { maxBuffer: MAX_EXEC_BUFFER });
    return true;
  } catch {
    return false;
  }
}

export class UnixDiffComparator implements CodeComparator {
  getName() {
    return "unix-diff";
  }

  async compare(
    expectedPath: string,
    actualPath: string
  ): Promise<CodeComparisonResult> {
    if (!(await isUnixDiffAvailable())) {
      throw new Error(
        "unable to compute diff, unix 'diff' command is not installed in the system. Please install it and try again"
      );
    }

    const result = await invokeDiff([
      "-U",
      "2147483646",
      expectedPath,
      actualPath,
    ]);
    if (result.outcome === "identical") {
      return generateIdenticalComparisonResult(actualPath);
    }

    return generateDifferenceComparisonResult(
      expectedPath,
      actualPath,
      result.diff
    );
  }
}

async function generateIdenticalComparisonResult(
  actualPath: string
): Promise<CodeComparisonResult> {
  const totalLines = await countFileLines(actualPath);

  return {
    similarity: 1,
    changedLines: 0,
    totalLines,
  };
}

async function generateDifferenceComparisonResult(
  expectedPath: string,
  actualPath: string,
  diffOutput: string
): Promise<CodeComparisonResult> {
  const diffLines = diffOutput.split("\n").slice(3); // Skip the first 3 header lines
  const totalLines = diffLines.length;

  if (totalLines === 0) {
    throw new Error(
      "expected at least one line in the diff output, found none"
    );
  }

  const { additions, removals } = countChanges(diffLines);
  const changedLines = additions + removals;

  const similarity = (totalLines - changedLines) / totalLines;

  const differenceFilePath = await createTemporaryFile("diff", ".diff");
  await generateUnifiedPatchDiff(expectedPath, actualPath, differenceFilePath);

  return {
    similarity,
    changedLines,
    totalLines,
    differenceFilePath,
  };
}

function invokeDiff(
  args: string[]
): Promise<{ outcome: "identical" } | { outcome: "different"; diff: string }> {
  return new Promise((resolve, reject) => {
    const command = `diff ${args.map((arg) => `'${arg}'`).join(" ")}`;
    exec(command, { maxBuffer: MAX_EXEC_BUFFER }, (error, stdout, stderr) => {
      if (stderr) {
        console.error(stderr);
      }

      if (error) {
        if (error.code === 1) {
          // There was a difference
          resolve({ outcome: "different", diff: stdout });
          return;
        }

        reject(error);
        return;
      }

      resolve({ outcome: "identical" });
    });
  });
}

async function generateUnifiedPatchDiff(
  expectedPath: string,
  actualPath: string,
  differenceFilePath: string
) {
  const result = await invokeDiff(["-u", expectedPath, actualPath]);
  if (result.outcome === "identical") {
    throw new Error(
      "invariant violation, diff output should result in a difference when computing the unified diff patch"
    );
  }
  await writeFile(differenceFilePath, result.diff, "utf-8");
}

// Adapted from: https://stackoverflow.com/questions/12453057/node-js-count-the-number-of-lines-in-a-file
function countFileLines(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    createReadStream(filePath)
      .on("data", (buffer: Buffer) => {
        let idx = -1;
        lineCount--; // Because the loop will run once for idx=-1
        do {
          idx = buffer.indexOf(10, idx + 1);
          lineCount++;
        } while (idx !== -1);
      })
      .on("end", () => {
        resolve(lineCount);
      })
      .on("error", reject);
  });
}

function countChanges(diffLines: string[]): {
  additions: number;
  removals: number;
} {
  let additions = 0;
  let removals = 0;

  for (const line of diffLines) {
    if (line.startsWith("+")) {
      additions++;
    } else if (line.startsWith("-")) {
      removals++;
    }
  }

  return { additions, removals };
}
