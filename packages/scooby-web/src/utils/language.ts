export function getLanguageForFile(path: string): string | undefined {
  const tokens = path.split(".");
  if (tokens.length < 2) {
    return;
  }

  const extension = tokens[tokens.length - 1].toLowerCase();

  switch (extension) {
    case "json":
      return "json";
    case "html":
      return "html";
    case "jsx":
    case "js":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "css":
      return "css";
    case "less":
      return "less";
    case "scss":
      return "scss";
    case "sass":
      return "sass";
  }
}
