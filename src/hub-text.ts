export const HUB_ENTRIES_HEADING = "## Calendar entries";

export function insertHubEntry(content: string, line: string): string {
  const newline = content.includes("\r\n") ? "\r\n" : "\n";
  const lines = content.split(/\r?\n/u);
  const headingIndex = lines.findIndex((entry) => entry.trim() === HUB_ENTRIES_HEADING);

  if (headingIndex < 0) {
    const suffix = content.endsWith("\n") ? "" : newline;
    return `${content}${suffix}${newline}${HUB_ENTRIES_HEADING}${newline}${newline}${line}${newline}`;
  }

  let insertAt = headingIndex + 1;
  if (lines[insertAt] !== "") lines.splice(insertAt, 0, "");
  insertAt += 1;
  lines.splice(insertAt, 0, line, "");
  return lines.join(newline);
}
