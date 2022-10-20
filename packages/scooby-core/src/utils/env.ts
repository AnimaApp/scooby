export function readEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `unable to read '${name}' env variable, please make sure it's defined`
    );
  }

  return value;
}
