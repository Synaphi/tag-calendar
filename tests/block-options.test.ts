import { describe, expect, it } from "vitest";
import { parseBlockOptions } from "../src/block-options";

describe("calendar block options", () => {
  it("accepts compact and expanded density values", () => {
    expect(parseBlockOptions("density: compact")).toEqual({ density: "compact" });
    expect(parseBlockOptions("density: expanded")).toEqual({ density: "expanded" });
  });

  it("accepts assignee filters and ignores unknown ones", () => {
    expect(parseBlockOptions("assignee: owner")).toEqual({ assignee: "owner" });
    expect(parseBlockOptions("assignee: AI")).toEqual({ assignee: "ai" });
    expect(parseBlockOptions("assignee: all")).toEqual({ assignee: "all" });
    expect(parseBlockOptions("assignee: me")).toEqual({});
  });

  it("ignores unknown density values without disturbing other options", () => {
    expect(
      parseBlockOptions("weekStart: sunday\nshowCompleted: true\ndensity: tiny")
    ).toEqual({ weekStart: "sunday", showCompleted: true });
  });
});
