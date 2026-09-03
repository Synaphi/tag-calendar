import type { FollowUpItem } from "./types";
import { nextRecurrenceDate } from "./recurrence";

interface SourceLine {
  text: string;
  start: number;
}

export type SourceUpdateResult =
  | { kind: "updated"; content: string; line: number }
  | { kind: "unchanged"; line: number }
  | { kind: "conflict" };

interface SourceTarget {
  line: SourceLine;
  lineNumber: number;
}

function splitWithOffsets(content: string): SourceLine[] {
  const lines: SourceLine[] = [];
  let start = 0;

  for (let index = 0; index <= content.length; index += 1) {
    if (index !== content.length && content[index] !== "\n") continue;

    let end = index;
    if (end > start && content[end - 1] === "\r") end -= 1;
    lines.push({ text: content.slice(start, end), start });
    start = index + 1;
  }

  return lines;
}

function findSourceTarget(content: string, item: FollowUpItem): SourceTarget | null {
  const lines = splitWithOffsets(content);
  let targetLine = -1;

  if (lines[item.line]?.text === item.rawLine) {
    targetLine = item.line;
  } else {
    const matches = lines
      .map((line, index) => (line.text === item.rawLine ? index : -1))
      .filter((index) => index >= 0);

    if (matches.length !== 1) return null;
    targetLine = matches[0];
  }

  return { line: lines[targetLine], lineNumber: targetLine };
}

export function updateCheckboxInSource(
  content: string,
  item: FollowUpItem,
  completed: boolean
): SourceUpdateResult {
  const target = findSourceTarget(content, item);
  if (!target) return { kind: "conflict" };
  const checkboxMatch = target.line.text.match(/^(\s*(?:>\s*)*[-*+]\s+\[)([ xX])(\])/u);
  if (!checkboxMatch) return { kind: "conflict" };

  const nextState = completed ? "x" : " ";
  if (checkboxMatch[2] === nextState || (completed && checkboxMatch[2] === "X")) {
    return { kind: "unchanged", line: target.lineNumber };
  }

  const stateOffset = target.line.start + checkboxMatch[1].length;
  const updated = content.slice(0, stateOffset) + nextState + content.slice(stateOffset + 1);
  return { kind: "updated", content: updated, line: target.lineNumber };
}

export function advanceRecurringInSource(
  content: string,
  item: FollowUpItem,
  today: string
): SourceUpdateResult {
  if (!item.recurrence || item.completed) return { kind: "conflict" };

  const target = findSourceTarget(content, item);
  if (!target) return { kind: "conflict" };

  const nextDate = nextRecurrenceDate(item.recurrence, item.date, today);
  if (!nextDate) return { kind: "conflict" };

  const datePattern = new RegExp(`📅\\s*${item.date}`, "u");
  const lineMatch = target.line.text.match(datePattern);
  if (!lineMatch || lineMatch.index === undefined) return { kind: "conflict" };

  const start = target.line.start + lineMatch.index;
  const replacement = `📅 ${nextDate}`;
  const updated =
    content.slice(0, start) + replacement + content.slice(start + lineMatch[0].length);
  return { kind: "updated", content: updated, line: target.lineNumber };
}
