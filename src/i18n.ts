import type { LanguagePreference } from "./types";

export type UiLanguage = "en" | "ko";

const EN = {
  calendarTitle: "Tag Calendar",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  today: "Today",
  showCompleted: "Show completed",
  hideCompleted: "Hide completed",
  compactView: "Compact view",
  expandedView: "Expanded view",
  copy: "Copy",
  addSchedule: "Add schedule",
  addScheduleTitle: "Add follow-up",
  title: "Title",
  titlePlaceholder: "SindangSeoul · Update",
  dueDate: "First due date",
  recurrence: "Repeat",
  recurrenceNone: "Does not repeat",
  recurrenceDaily: "Daily",
  recurrenceWeekly: "Weekly",
  recurrenceMonthly: "Monthly",
  recurrenceYearly: "Yearly",
  projectTag: "Project tag",
  projectTagDesc: "Optional. Enter without #.",
  add: "Add",
  cancel: "Cancel",
  invalidSchedule: "Enter a title and a valid date.",
  invalidProjectTag: "Use a lowercase flat tag with letters, numbers, or hyphens.",
  scheduleAdded: "The follow-up was added to the calendar note.",
  scheduleAddFailed: "The follow-up could not be added.",
  recurringAdvance: "Completing this occurrence moves it to the next due date.",
  copyCalendar: "Copy live calendar block",
  completedVisibility: "Toggle completed follow-ups",
  more: "more",
  scheduleList: "Follow-up list",
  nearestFirst: "Nearest upcoming first",
  noItems: "No follow-ups to show.",
  taskStatus: "completion status",
  copyFallbackTitle: "Copy live calendar block",
  copySuccess: "Live calendar block copied.",
  sourceMissing: "The source note could not be found.",
  sourceChanged: "The source changed and was reloaded. Please try again.",
  sourceUpdateFailed: "The source follow-up could not be updated.",
  hubOpenFailed: "The Tag Calendar note could not be opened.",
  hubFolderConflict: "The hub path points to a folder. Choose a Markdown file path in settings.",
  hubPath: "Hub note path",
  hubPathDesc: "Rename or choose the Markdown note opened from the ribbon icon.",
  apply: "Apply",
  hubPathApplied: "Calendar note path updated.",
  hubPathRenamed: "Calendar note renamed and links updated.",
  hubPathConflict: "A file already exists at the new path. Nothing was overwritten.",
  hubPathInvalid: "Choose a relative Markdown path inside this vault.",
  hubPathUpdateFailed: "The calendar note could not be renamed.",
  weekStart: "First day of week",
  weekStartDesc: "Choose the first weekday in the calendar.",
  monday: "Monday",
  sunday: "Sunday",
  showCompletedDefault: "Show completed by default",
  showCompletedDefaultDesc: "Include completed follow-ups when a view first opens.",
  calendarSize: "Default calendar size",
  calendarSizeDesc: "Choose the compact overview or the expanded calendar with task titles.",
  compact: "Compact",
  expanded: "Expanded",
  language: "Language",
  languageDesc: "Follow Obsidian automatically or choose a display language.",
  automatic: "Automatic",
  korean: "한국어",
  english: "English",
  openCommand: "Open Tag Calendar",
  guide: "Guide",
  openGuideCommand: "Open Tag Calendar user guide",
  guideSetting: "User guide",
  guideSettingDesc: "Open the complete guide and versioned update notes for this installed version.",
  currentVersion: "Installed version",
  openGuide: "Open guide",
  itemCount: "follow-ups"
} as const;

export type MessageKey = keyof typeof EN;

const KO: Record<MessageKey, string> = {
  calendarTitle: "태그 캘린더",
  previousMonth: "이전 달",
  nextMonth: "다음 달",
  today: "오늘",
  showCompleted: "완료 표시",
  hideCompleted: "완료 숨기기",
  compactView: "축약 보기",
  expandedView: "확장 보기",
  copy: "복사",
  addSchedule: "일정 추가",
  addScheduleTitle: "후속 일정 추가",
  title: "일정 이름",
  titlePlaceholder: "SindangSeoul · 업데이트",
  dueDate: "첫 예정일",
  recurrence: "반복",
  recurrenceNone: "반복 안 함",
  recurrenceDaily: "매일",
  recurrenceWeekly: "매주",
  recurrenceMonthly: "매월",
  recurrenceYearly: "매년",
  projectTag: "프로젝트 태그",
  projectTagDesc: "선택 사항입니다. # 없이 입력하세요.",
  add: "추가",
  cancel: "취소",
  invalidSchedule: "일정 이름과 올바른 날짜를 입력해 주세요.",
  invalidProjectTag: "소문자·숫자·하이픈으로 된 flat 태그를 입력해 주세요.",
  scheduleAdded: "달력 노트에 후속 일정을 추가했습니다.",
  scheduleAddFailed: "후속 일정을 추가하지 못했습니다.",
  recurringAdvance: "이 회차를 완료하면 다음 예정일로 이동합니다.",
  copyCalendar: "실시간 달력 블록 복사",
  completedVisibility: "완료한 후속 일정 표시 전환",
  more: "개 더보기",
  scheduleList: "후속 일정 목록",
  nearestFirst: "가까운 예정일순",
  noItems: "표시할 후속 일정이 없습니다.",
  taskStatus: "완료 상태",
  copyFallbackTitle: "실시간 달력 블록 복사",
  copySuccess: "실시간 달력 블록을 복사했습니다.",
  sourceMissing: "원본 노트를 찾을 수 없습니다.",
  sourceChanged: "원본이 변경되어 다시 불러왔습니다. 한 번 더 눌러 주세요.",
  sourceUpdateFailed: "원본 후속 일정을 수정하지 못했습니다.",
  hubOpenFailed: "Tag Calendar 노트를 열지 못했습니다.",
  hubFolderConflict: "허브 경로가 폴더와 겹칩니다. 설정에서 Markdown 파일 경로를 선택해 주세요.",
  hubPath: "허브 노트 경로",
  hubPathDesc: "리본 아이콘으로 여는 Markdown 노트를 바꾸거나 이름을 변경합니다.",
  apply: "적용",
  hubPathApplied: "달력 노트 경로를 변경했습니다.",
  hubPathRenamed: "달력 노트 이름을 바꾸고 링크를 갱신했습니다.",
  hubPathConflict: "새 경로에 파일이 이미 있어 덮어쓰지 않았습니다.",
  hubPathInvalid: "이 볼트 안의 상대 Markdown 경로를 입력해 주세요.",
  hubPathUpdateFailed: "달력 노트 이름을 변경하지 못했습니다.",
  weekStart: "한 주의 시작",
  weekStartDesc: "달력의 첫 번째 요일을 선택합니다.",
  monday: "월요일",
  sunday: "일요일",
  showCompletedDefault: "완료 일정 기본 표시",
  showCompletedDefaultDesc: "화면을 처음 열 때 완료한 후속 일정도 함께 표시합니다.",
  calendarSize: "기본 달력 크기",
  calendarSizeDesc: "날짜·상태만 보는 축약형 또는 일정 제목이 보이는 확장형을 선택합니다.",
  compact: "축약형",
  expanded: "확장형",
  language: "언어",
  languageDesc: "Obsidian 언어를 따르거나 표시 언어를 직접 선택합니다.",
  automatic: "자동",
  korean: "한국어",
  english: "English",
  openCommand: "Tag Calendar 열기",
  guide: "사용법",
  openGuideCommand: "Tag Calendar 사용 가이드 열기",
  guideSetting: "사용 가이드",
  guideSettingDesc: "설치된 버전의 전체 사용법과 버전별 업데이트 노트를 엽니다.",
  currentVersion: "설치된 버전",
  openGuide: "가이드 열기",
  itemCount: "개의 후속 일정"
};

export function resolveLanguage(
  preference: LanguagePreference,
  detectedLocale?: string
): UiLanguage {
  if (preference !== "auto") return preference;

  const locale =
    detectedLocale ??
    (typeof document !== "undefined" ? document.documentElement.lang : undefined) ??
    (typeof navigator !== "undefined" ? navigator.language : "en");
  return locale.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function translate(language: UiLanguage, key: MessageKey): string {
  return language === "ko" ? KO[key] : EN[key];
}

export function formatMonth(language: UiLanguage, date: Date): string {
  return new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long"
  }).format(date);
}

export function formatLongDate(language: UiLanguage, date: Date): string {
  return new Intl.DateTimeFormat(language === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
}

export function weekdayLabels(language: UiLanguage, weekStart: "monday" | "sunday"): string[] {
  const sundayFirst = language === "ko"
    ? ["일", "월", "화", "수", "목", "금", "토"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekStart === "sunday" ? sundayFirst : [...sundayFirst.slice(1), sundayFirst[0]];
}
