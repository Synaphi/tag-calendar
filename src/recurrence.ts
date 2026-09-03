import type { RecurrenceFrequency, RecurrenceRule } from "./types";

const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/u;

function dateFromKey(dateKey: string): Date | null {
  const match = dateKey.match(DATE_KEY_PATTERN);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

function formatDateKey(date: Date): string {
  return [
    String(date.getFullYear()).padStart(4, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function anchoredDate(year: number, monthIndex: number, day: number): Date {
  return new Date(year, monthIndex, Math.min(day, daysInMonth(year, monthIndex)));
}

export function recurrenceMarker(frequency: RecurrenceFrequency, dateKey: string): string | null {
  const date = dateFromKey(dateKey);
  if (!date) return null;

  if (frequency === "monthly") {
    return `🔁 monthly:${String(date.getDate()).padStart(2, "0")}`;
  }
  if (frequency === "yearly") {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `🔁 yearly:${month}-${day}`;
  }
  return `🔁 ${frequency}`;
}

export function nextRecurrenceDate(
  rule: RecurrenceRule,
  currentDateKey: string,
  todayKey: string
): string | null {
  const current = dateFromKey(currentDateKey);
  const today = dateFromKey(todayKey);
  if (!current || !today) return null;

  const base = current > today ? current : today;

  if (rule.frequency === "daily") {
    return formatDateKey(new Date(base.getFullYear(), base.getMonth(), base.getDate() + 1));
  }

  if (rule.frequency === "weekly") {
    const targetWeekday = current.getDay();
    const daysAhead = ((targetWeekday - base.getDay() + 7) % 7) || 7;
    return formatDateKey(
      new Date(base.getFullYear(), base.getMonth(), base.getDate() + daysAhead)
    );
  }

  if (rule.frequency === "monthly") {
    const anchorDay = rule.day ?? current.getDate();
    let year = base.getFullYear();
    let monthIndex = base.getMonth();
    let candidate = anchoredDate(year, monthIndex, anchorDay);
    if (candidate <= base) {
      monthIndex += 1;
      if (monthIndex > 11) {
        monthIndex = 0;
        year += 1;
      }
      candidate = anchoredDate(year, monthIndex, anchorDay);
    }
    return formatDateKey(candidate);
  }

  const anchorMonth = (rule.month ?? current.getMonth() + 1) - 1;
  const anchorDay = rule.day ?? current.getDate();
  let year = base.getFullYear();
  let candidate = anchoredDate(year, anchorMonth, anchorDay);
  if (candidate <= base) candidate = anchoredDate(year + 1, anchorMonth, anchorDay);
  return formatDateKey(candidate);
}
