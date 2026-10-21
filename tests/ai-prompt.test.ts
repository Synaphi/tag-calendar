import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildAiInstructions } from "../src/ai-prompt";
import { buildGuideMarkdown, LATEST_GUIDE_VERSION } from "../src/guide";
import { parseFollowUps } from "../src/parser";

describe("AI assistant instructions", () => {
  it("shows an example line that the parser reads as a 👤 follow-up once unwrapped", () => {
    const example = buildAiInstructions()
      .split("\n")
      .find((line) => line.startsWith("`- [ ]"));
    expect(example).toBeDefined();
    const items = parseFollowUps(example!.slice(1, -1), "Note.md");
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ assignee: "owner", date: "2026-10-29", projectTag: "project-tag" });
  });

  it("never yields a real follow-up when the instructions are saved inside the vault", () => {
    expect(parseFollowUps(buildAiInstructions(), "CLAUDE.md")).toEqual([]);
    for (const language of ["ko", "en"] as const) {
      expect(parseFollowUps(buildGuideMarkdown(language, LATEST_GUIDE_VERSION), "Guide.md")).toEqual([]);
    }
  });

  it("uses the configured hub path", () => {
    expect(buildAiInstructions("System/Calendar.md")).toContain("`System/Calendar.md`");
    expect(buildAiInstructions()).toContain("`_CALENDAR.md`");
  });

  it("documents every recurrence marker the parser accepts", () => {
    const text = buildAiInstructions();
    for (const marker of ["🔁 daily", "🔁 weekly", "🔁 monthly:DD", "🔁 yearly:MM-DD", "👤", "🤖", "#follow-up"]) {
      expect(text).toContain(marker);
    }
  });

  it("is embedded verbatim in the guide and the README", () => {
    const text = buildAiInstructions();
    for (const language of ["ko", "en"] as const) {
      expect(buildGuideMarkdown(language, LATEST_GUIDE_VERSION)).toContain(text);
    }
    const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8").replace(/\r\n/gu, "\n");
    expect(readme).toContain(text);
  });
});
