export type WeekStart = "monday" | "sunday";
export type LanguagePreference = "auto" | "en" | "ko";
export type CalendarDensity = "compact" | "expanded";
export type RecurrenceFrequency = "daily" | "weekly" | "monthly" | "yearly";
/** owner = 👤 the user must check it; ai = 🤖 an assistant handles it and only reports back. */
export type Assignee = "owner" | "ai";
export type AssigneeFilter = Assignee | "all";

export interface RecurrenceRule {
  frequency: RecurrenceFrequency;
  day?: number;
  month?: number;
}

export interface FollowUpItem {
  id: string;
  filePath: string;
  line: number;
  rawLine: string;
  title: string;
  projectTag?: string;
  date: string;
  completed: boolean;
  recurrence?: RecurrenceRule;
  assignee?: Assignee;
}

export interface NewFollowUp {
  title: string;
  date: string;
  recurrence?: RecurrenceFrequency;
  projectTag?: string;
  assignee?: Assignee;
}

export interface FollowUpCalendarSettings {
  hubPath: string;
  weekStart: WeekStart;
  showCompleted: boolean;
  calendarDensity: CalendarDensity;
  language: LanguagePreference;
  /** Off by default: people who do not hand work to an AI never see the 👤/🤖 layer. */
  showAssignee: boolean;
}

export interface FollowUpBlockOptions {
  weekStart?: WeekStart;
  showCompleted?: boolean;
  density?: CalendarDensity;
  assignee?: AssigneeFilter;
}

export const ASSIGNEE_MARKERS: Record<Assignee, string> = { owner: "👤", ai: "🤖" };

/** Items the user must check come first within the same day, then assistant items, then unmarked ones. */
export function assigneeRank(assignee: Assignee | undefined): number {
  if (assignee === "owner") return 0;
  if (assignee === "ai") return 1;
  return 2;
}

export function sortNearestFirst(
  items: readonly FollowUpItem[],
  today: string
): FollowUpItem[] {
  return [...items].sort((left, right) => {
    if (left.completed !== right.completed) {
      return left.completed ? 1 : -1;
    }

    const leftUpcoming = left.date >= today;
    const rightUpcoming = right.date >= today;
    if (leftUpcoming !== rightUpcoming) return leftUpcoming ? -1 : 1;

    const dateOrder = leftUpcoming
      ? left.date.localeCompare(right.date)
      : right.date.localeCompare(left.date);
    if (dateOrder !== 0) return dateOrder;

    const assigneeOrder = assigneeRank(left.assignee) - assigneeRank(right.assignee);
    if (assigneeOrder !== 0) return assigneeOrder;

    const titleOrder = left.title.localeCompare(right.title, "ko");
    if (titleOrder !== 0) return titleOrder;

    const pathOrder = left.filePath.localeCompare(right.filePath, "ko");
    if (pathOrder !== 0) return pathOrder;

    return left.line - right.line;
  });
}
