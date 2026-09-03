import { describe, expect, it } from "vitest";
import { parseBlockOptions } from "../src/block-options";

describe("calendar block options", () => {
  it("accepts compact and expanded density values", () => {
    expect(parseBlockOptions("density: compact")).toEqual({ density: "compact" });
    expect(parseBlockOptions("density: expanded")).toEqual({ density: "expanded" });
  });

  it("ignores unknown density values without disturbing other options", () => {
    expect(
      parseBlockOptions("weekStart: sunday\nshowCompleted: true\ndensity: tiny")
    ).toEqual({ weekStart: "sunday", showCompleted: true });
  });
});
