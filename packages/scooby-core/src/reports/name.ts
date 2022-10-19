export function isValidName(string: string): boolean {
  return string.match(/^[a-z0-9-]+$/gi) !== null;
}
