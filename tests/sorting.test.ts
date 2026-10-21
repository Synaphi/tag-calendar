import { describe, expect, it } from "vitest";
import { sortNearestFirst, type FollowUpItem } from "../src/types";

function item(date: string, title: string, completed = false): FollowUpItem {
  return {
    id: `${date}:${title}`,
    filePath: "Tasks.md",
    line: 0,
    rawLine: title,
    title,
    date,
    completed
  };
}

describe("sortNearestFirst", () => {
  it("puts the nearest upcoming dates first and recent overdue dates after them", () => {
    const sorted = sortNearestFirst(
      [
        item("2026-09-20", "later"),
        item("2026-08-01", "old overdue"),
        item("2026-09-02", "recent overdue"),
        item("2026-09-04", "tomorrow"),
        item("2026-09-03", "today")
      ],
      "2026-09-03"
    );

    expect(sorted.map((value) => value.title)).toEqual([
      "today",
      "tomorrow",
      "later",
      "recent overdue",
      "old overdue"
    ]);
  });

  it("puts items the user must check first within the same day", () => {
    const sorted = sortNearestFirst(
      [
        { ...item("2026-09-03", "a unmarked") },
        { ...item("2026-09-03", "b ai"), assignee: "ai" },
        { ...item("2026-09-03", "c owner"), assignee: "owner" },
        { ...item("2026-09-02", "d overdue owner"), assignee: "owner" }
      ],
      "2026-09-03"
    );

    expect(sorted.map((value) => value.title)).toEqual([
      "c owner",
      "b ai",
      "a unmarked",
      "d overdue owner"
    ]);
  });

  it("keeps completed follow-ups below incomplete follow-ups", () => {
    const sorted = sortNearestFirst(
      [item("2026-09-03", "completed today", true), item("2026-09-10", "open later")],
      "2026-09-03"
    );

    expect(sorted.map((value) => value.title)).toEqual(["open later", "completed today"]);
  });
});
