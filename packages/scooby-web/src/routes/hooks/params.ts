export function getProtectedParams(
  params: Record<string, any>
): Record<string, any> {
  const output: Record<string, any> = {};

  for (const [key, value] of Object.entries(params)) {
    if (key.startsWith("_")) {
      output[key] = value;
    }
  }

  return output;
}
