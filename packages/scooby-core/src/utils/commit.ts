export function isRunningOnReferenceCommit(
  currentCommit: string,
  baseCommit: string
): boolean {
  return currentCommit === baseCommit;
}
