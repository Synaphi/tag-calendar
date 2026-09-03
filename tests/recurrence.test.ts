import { describe, expect, it } from "vitest";
import { nextRecurrenceDate, recurrenceMarker } from "../src/recurrence";

describe("recurrenceMarker", () => {
  it("preserves monthly and yearly anchors in the Markdown marker", () => {
    expect(recurrenceMarker("daily", "2026-09-04")).toBe("🔁 daily");
    expect(recurrenceMarker("weekly", "2026-09-04")).toBe("🔁 weekly");
    expect(recurrenceMarker("monthly", "2026-09-05")).toBe("🔁 monthly:05");
    expect(recurrenceMarker("yearly", "2026-09-05")).toBe("🔁 yearly:09-05");
  });
});

describe("nextRecurrenceDate", () => {
  it("advances daily and weekly schedules beyond today", () => {
    expect(nextRecurrenceDate({ frequency: "daily" }, "2026-09-01", "2026-09-04"))
      .toBe("2026-09-05");
    expect(nextRecurrenceDate({ frequency: "weekly" }, "2026-09-01", "2026-09-04"))
      .toBe("2026-09-08");
  });

  it("skips stale monthly occurrences and retains the requested day", () => {
    expect(nextRecurrenceDate({ frequency: "monthly", day: 15 }, "2026-07-15", "2026-09-04"))
      .toBe("2026-09-15");
    expect(nextRecurrenceDate({ frequency: "monthly", day: 31 }, "2026-01-31", "2026-02-28"))
      .toBe("2026-03-31");
  });

  it("clamps leap-day yearly schedules without losing their anchor", () => {
    expect(
      nextRecurrenceDate(
        { frequency: "yearly", month: 2, day: 29 },
        "2028-02-29",
        "2028-02-29"
      )
    ).toBe("2029-02-28");
    expect(
      nextRecurrenceDate(
        { frequency: "yearly", month: 2, day: 29 },
        "2029-02-28",
        "2031-03-01"
      )
    ).toBe("2032-02-29");
  });
});
