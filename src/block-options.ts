import type { FollowUpBlockOptions } from "./types";

function parseBoolean(value: string): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function parseBlockOptions(source: string): FollowUpBlockOptions {
  const options: FollowUpBlockOptions = {};

  for (const line of source.split(/\r?\n/u)) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().toLowerCase();
    if (key === "weekStart" && (value === "monday" || value === "sunday")) {
      options.weekStart = value;
    }
    if (key === "showCompleted") options.showCompleted = parseBoolean(value);
    if (key === "density" && (value === "compact" || value === "expanded")) {
      options.density = value;
    }
  }

  return options;
}
