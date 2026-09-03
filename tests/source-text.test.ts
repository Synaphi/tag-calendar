import { describe, expect, it } from "vitest";
import { advanceRecurringInSource, updateCheckboxInSource } from "../src/source-text";
import type { FollowUpItem } from "../src/types";

const rawLine = "- [ ] Alpha · verify 📅 2026-09-13 #follow-up #alpha";
const item: FollowUpItem = {
  id: "id",
  filePath: "Tasks.md",
  line: 1,
  rawLine,
  title: "Alpha · verify",
  projectTag: "alpha",
  date: "2026-09-13",
  completed: false
};

describe("updateCheckboxInSource", () => {
  it("changes only the checkbox state character", () => {
    const content = `before\r\n${rawLine}\r\nafter\r\n`;
    const result = updateCheckboxInSource(content, item, true);

    expect(result.kind).toBe("updated");
    if (result.kind === "updated") {
      expect(result.content).toBe(content.replace("- [ ]", "- [x]"));
      expect(result.content.length).toBe(content.length);
    }
  });

  it("finds a uniquely moved source line", () => {
    const content = `new first line\nmore\n${rawLine}\n`;
    const result = updateCheckboxInSource(content, item, true);

    expect(result.kind).toBe("updated");
    if (result.kind === "updated") expect(result.line).toBe(2);
  });

  it("refuses an ambiguous moved source line", () => {
    const content = `new first line\n${rawLine}\n${rawLine}\n`;
    const result = updateCheckboxInSource(content, { ...item, line: 9 }, true);
    expect(result).toEqual({ kind: "conflict" });
  });

  it("does not write when the requested state is already present", () => {
    const completedLine = rawLine.replace("- [ ]", "- [x]");
    const result = updateCheckboxInSource(
      completedLine,
      { ...item, line: 0, rawLine: completedLine, completed: true },
      true
    );
    expect(result).toEqual({ kind: "unchanged", line: 0 });
  });
});

describe("advanceRecurringInSource", () => {
  it("moves an open recurring task to its next live due date without completing it", () => {
    const recurringLine =
      "- [ ] SindangSeoul · update 📅 2026-08-15 🔁 monthly:15 #follow-up #sindangseoul";
    const recurringItem: FollowUpItem = {
      ...item,
      line: 0,
      rawLine: recurringLine,
      title: "SindangSeoul · update",
      date: "2026-08-15",
      recurrence: { frequency: "monthly", day: 15 }
    };

    const result = advanceRecurringInSource(recurringLine, recurringItem, "2026-09-04");
    expect(result.kind).toBe("updated");
    if (result.kind === "updated") {
      expect(result.content).toBe(recurringLine.replace("2026-08-15", "2026-09-15"));
      expect(result.content.startsWith("- [ ]")).toBe(true);
    }
  });

  it("refuses to advance a completed recurrence or an ambiguous source", () => {
    const recurringItem: FollowUpItem = {
      ...item,
      line: 9,
      recurrence: { frequency: "weekly" }
    };
    expect(advanceRecurringInSource(`${rawLine}\n${rawLine}`, recurringItem, "2026-09-04"))
      .toEqual({ kind: "conflict" });
    expect(advanceRecurringInSource(rawLine, { ...recurringItem, completed: true }, "2026-09-04"))
      .toEqual({ kind: "conflict" });
  });
});
