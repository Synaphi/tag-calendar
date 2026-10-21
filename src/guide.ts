import { buildAiInstructions } from "./ai-prompt";
import type { UiLanguage } from "./i18n";

export const LATEST_GUIDE_VERSION = "1.10.24";

interface ReleaseNote {
  version: string;
  date: string;
  ko: string[];
  en: string[];
}

export const RELEASE_NOTES: readonly ReleaseNote[] = [
  {
    version: "1.10.24",
    date: "2026-10-22",
    ko: [
      "설정 → AI 비서용 지침 → 복사로, AI가 후속 일정을 이 형식으로 쓰고 👤·🤖를 고르고 🤖 일정을 처리하게 하는 영어 지침을 받을 수 있습니다. CLAUDE.md, AGENTS.md 또는 AI 사용자 지침에 붙여 넣으세요. 같은 지침이 이 가이드 9절에도 있습니다."
    ],
    en: [
      "Settings → Instructions for your AI assistant → Copy gives English instructions that teach an AI to write follow-ups in this format, pick 👤 or 🤖, and work its 🤖 items. Paste them into CLAUDE.md, AGENTS.md, or your assistant's custom instructions. The same text is in section 9 of this guide."
    ]
  },
  {
    version: "1.10.23",
    date: "2026-10-22",
    ko: [
      "확인 담당 표식을 켜면 축약형 달력이 앞의 3개 대신 담당별 점과 개수(예: 👤 6 · 🤖 8)를 보여 줍니다. 일정이 많은 날도 내 확인 몫이 바로 보이고, 표식 없는 일정은 흐린 「+n」으로 붙습니다.",
      "Obsidian 기본 버튼 모양(회색 상자·고정 높이)이 일정 제목·축약형 날짜·필터·상단 버튼·오늘·더보기에 씌워지던 문제를 고쳤습니다. 마우스를 올려도 크기가 바뀌지 않고, 키보드 포커스 테두리가 보입니다."
    ],
    en: [
      "With who-handles-it markers on, compact days now show one dot and count per assignee (e.g. 👤 6 · 🤖 8) instead of the first three items, so busy days still show your share; unmarked items add a muted \"+n\".",
      "Fixed Obsidian's default button box and height leaking into titles, compact days, filters, header buttons, Today, and +N more. Hover no longer changes button size, and keyboard focus shows an outline."
    ]
  },
  {
    version: "1.10.22",
    date: "2026-10-22",
    ko: [
      "일정 줄에 `👤`(내가 직접 확인해야 하는 일) 또는 `🤖`(AI가 처리하고 보고만 하면 되는 일) 표식을 붙여 담당을 구분합니다. AI를 쓰지 않는 분을 위해 **기본은 꺼져 있으며**, 설정 → 확인 담당 표식에서 켭니다.",
      "달력·목록에서 `👤`은 주황색 사람 아이콘·굵은 제목, `🤖`은 청록색 로봇 아이콘·점선 테두리로 보입니다. 축약형에서는 채운 점(👤)과 빈 고리(🤖)로 구분합니다.",
      "상단의 👤·🤖 개수 버튼을 누르면 그 담당 일정만 걸러 봅니다. 👤 옆 빨간 숫자는 밀린 일정과 오늘 일정의 합입니다. 코드 블록 옵션 `assignee: owner | ai | all`로 처음부터 걸러 둘 수 있습니다.",
      "일정 추가 창에서 확인 담당을 고를 수 있고, 같은 날에는 👤 일정이 먼저 표시됩니다."
    ],
    en: [
      "Mark a line with `👤` (you must check it yourself) or `🤖` (an AI handles it and only reports back) to separate who handles it. It is **off by default** for people who do not use an AI; turn it on under Settings → Who-handles-it markers.",
      "Calendar and list views show `👤` items with an orange person icon and a bold title, and `🤖` items with a cyan bot icon and a dashed outline. Compact view uses a filled dot for 👤 and a hollow ring for 🤖.",
      "Select the 👤 or 🤖 count in the header to show only those items; the red number next to 👤 counts overdue plus due-today items. Start a block filtered with `assignee: owner | ai | all`.",
      "Add schedule now offers a Who handles it choice, and 👤 items come first within the same day."
    ]
  },
  {
    version: "1.09.16",
    date: "2026-09-15",
    ko: [
      "커뮤니티 플러그인 자동 심사 지적 사항을 반영했습니다. 설정 화면 제목 제거, 명령 ID 정리, 허브 경로 검사에 사용자 설정 폴더 반영."
    ],
    en: [
      "Addressed community plugin review findings: removed the settings heading, simplified command IDs, and made the hub path check honor a custom config folder."
    ]
  },
  {
    version: "1.09.15",
    date: "2026-09-15",
    ko: [
      "기본 표시 언어를 English로 바꿨습니다. 설정 → 언어에서 한국어 또는 자동(Obsidian 언어 따름)을 선택할 수 있습니다."
    ],
    en: [
      "English is now the default display language. Choose Korean or Automatic (follow Obsidian) under Settings → Language."
    ]
  },
  {
    version: "1.09.14",
    date: "2026-09-14",
    ko: [
      "플러그인 ID와 코드 블록 이름을 `tag-calendar`·`tag-list`로 통일했습니다. 기존 `follow-up-calendar`·`follow-up-list` 블록은 그대로 동작합니다.",
      "버전 표기를 날짜 기반 `<연차>.<MM>.<DD>` 형식으로 바꿨습니다. v0.4.0 다음 버전이 v1.09.14입니다.",
      "라이브 프리뷰에서 Obsidian의 「이 블록 수정」 버튼이 달력·목록 상단 버튼과 겹치지 않도록 오른쪽 여백을 확보했습니다."
    ],
    en: [
      "Unified the plugin ID and block names as `tag-calendar` and `tag-list`; existing `follow-up-calendar` and `follow-up-list` blocks keep working.",
      "Switched to date-based version numbers in the `<year index>.<MM>.<DD>` form; v1.09.14 follows v0.4.0.",
      "Reserved space so Obsidian's Edit this block button no longer overlaps the calendar and list header buttons in Live Preview."
    ]
  },
  {
    version: "0.4.0",
    date: "2026-09-04",
    ko: [
      "달력 상단에서 축약형과 확장형을 즉시 전환할 수 있습니다.",
      "축약형은 날짜·상태 점·일정 수만 표시해 확장형 높이의 절반 이하로 줄였습니다.",
      "설정과 코드 블록의 `density: compact | expanded`로 시작 크기를 선택할 수 있습니다."
    ],
    en: [
      "Added an instant compact/expanded calendar switch in the header.",
      "Compact mode shows dates, status dots, and counts at less than half the expanded height.",
      "Added a default size setting and the `density: compact | expanded` block option."
    ]
  },
  {
    version: "0.3.0",
    date: "2026-09-04",
    ko: [
      "플러그인 안에서 바로 여는 한국어·영어 사용 가이드를 추가했습니다.",
      "가이드에 현재 플러그인 버전과 버전별 업데이트 노트를 표시합니다.",
      "사용자에게 보이는 플러그인 이름을 Tag Calendar로 정리했습니다. 기존 플러그인 ID와 설치 폴더는 유지됩니다."
    ],
    en: [
      "Added a built-in Korean and English user guide.",
      "The guide now shows the installed plugin version and versioned update notes.",
      "Changed the visible product name to Tag Calendar while retaining the existing plugin ID and install folder."
    ]
  },
  {
    version: "0.2.0",
    date: "2026-09-04",
    ko: [
      "설정에서 달력 허브 노트의 이름이나 경로를 안전하게 바꿀 수 있습니다.",
      "달력에서 단일·매일·매주·매월·매년 일정을 바로 추가할 수 있습니다.",
      "반복 일정을 완료하면 같은 원본 항목의 날짜가 다음 회차로 이동합니다."
    ],
    en: [
      "Added safe renaming and moving of the calendar hub note from settings.",
      "Added one-time, daily, weekly, monthly, and yearly schedules from the calendar.",
      "Completing a recurring item advances the same source task to its next occurrence."
    ]
  },
  {
    version: "0.1.0",
    date: "2026-09-03",
    ko: [
      "`📅 YYYY-MM-DD`와 `#follow-up`이 있는 Markdown 체크박스를 모아 달력과 목록으로 보여주는 첫 버전입니다.",
      "달력에서 완료 상태를 바꾸거나 원본 노트를 바로 열 수 있습니다."
    ],
    en: [
      "First release: collect Markdown checkboxes containing `📅 YYYY-MM-DD` and `#follow-up` into a calendar and list.",
      "Added source-task completion and direct source-note navigation."
    ]
  }
] as const;

function releaseNotes(language: UiLanguage): string {
  return RELEASE_NOTES.map((release) => {
    const items = release[language].map((item) => `- ${item}`).join("\n");
    return `### v${release.version} · ${release.date}\n\n${items}`;
  }).join("\n\n");
}

function koreanGuide(version: string): string {
  return `# Tag Calendar 사용 가이드

> 설치된 버전: **v${version}**  
> 이 가이드는 플러그인에 포함되어 있으므로 플러그인 버전과 함께 업데이트됩니다.

Tag Calendar는 볼트 전체에서 날짜가 있는 후속 작업을 찾아 월간 달력과 가까운 일정순 목록으로 보여줍니다. 별도 데이터베이스를 만들지 않고 **원본 Markdown 체크박스가 일정의 원본**이 됩니다.

## 1. 가장 빠른 시작

1. 왼쪽 리본의 달력 아이콘을 누릅니다.
2. 달력 위의 **일정 추가**를 누릅니다.
3. 이름, 첫 예정일, 반복 여부, 프로젝트 태그를 입력하고 **추가**를 누릅니다.
4. 달력에 표시된 일정을 누르면 원본 노트가 열립니다.

직접 쓸 때는 아래 형식을 사용합니다.

~~~markdown
- [ ] 프로젝트명 · 구체적인 후속 행동 📅 2026-09-15 #follow-up #project
~~~

인식에 꼭 필요한 세 요소는 다음과 같습니다.

- Markdown 체크박스: \`- [ ]\` 또는 \`- [x]\`
- 날짜: \`📅 YYYY-MM-DD\`
- 수집 태그: \`#follow-up\`

프로젝트 태그는 선택 사항이지만 \`#sindangseoul\`처럼 소문자 flat 태그를 권장합니다. 한 줄에 날짜가 여러 개 있으면 첫 번째 날짜만 사용합니다.

### 확인 담당 표시 (👤 / 🤖) — 선택 기능

일부 후속 일정을 AI에게 맡기는 경우에 쓰는 기능이며 **기본은 꺼져 있습니다.** **설정 → 확인 담당 표식**을 켜면, 일정 줄에 붙인 아래 표식 하나로 누가 처리할 일인지 달력에서 바로 구분됩니다. 날짜 앞에 두는 것을 권장합니다. 끄면 표식은 그대로 남지만 무시되고 예전처럼 보입니다.

| 표식 | 뜻 | 달력 표시 |
| --- | --- | --- |
| \`👤\` | 내가 직접 확인·결정해야 하는 일 | 주황색 사람 아이콘 · 굵은 제목 · 축약형 채운 점+개수 |
| \`🤖\` | AI가 처리하고 결과만 보고하면 되는 일 | 청록색 로봇 아이콘 · 점선 테두리 · 축약형 빈 고리+개수 |

~~~markdown
- [ ] Toolvil · 시안 3종 검토 👤 📅 2026-10-24 #follow-up #toolvil
- [ ] Toolvil · D+7 색인·유입 확인 🤖 📅 2026-10-25 #follow-up #toolvil
~~~

- 표식이 없으면 예전처럼 기본 색 점으로 보입니다.
- 두 표식이 함께 있으면 \`👤\`을 우선합니다.
- 기한이 지난 일정은 담당 색을 유지한 채 아이콘이 빨간색으로 바뀝니다.
- 달력·목록 상단의 👤·🤖 개수 버튼을 누르면 그 담당 일정만 보이고, 한 번 더 누르면 전체로 돌아갑니다. 숫자는 전체 기간 합계이고, 👤 옆 빨간 숫자는 **밀린 일정 + 오늘 일정** 수입니다.

## 2. 달력과 목록 사용법

- **일정 추가**: 달력 허브 노트에 새 원본 일정을 만듭니다.
- **완료 표시/숨기기**: 완료한 체크박스를 화면에 포함하거나 숨깁니다.
- **축약 보기/확장 보기**: 날짜·상태 중심의 낮은 달력과 제목이 보이는 큰 달력을 전환합니다.
- **복사**: 현재 옵션이 포함된 실시간 달력 코드 블록을 복사합니다.
- **책 아이콘**: 언제든 이 가이드를 엽니다.
- **오늘**: 현재 달로 돌아옵니다.
- **이전/다음 화살표**: 표시할 달을 이동합니다.
- **일정 제목**: 해당 Markdown 원본의 정확한 줄을 엽니다.
- **체크박스**: 원본 항목의 완료 상태를 직접 바꿉니다.
- **+N개 더보기**: 하루에 세 개 이상 있는 일정을 팝업으로 펼칩니다.
- **👤·🤖 개수 버튼**(확인 담당 표식을 켰을 때): 내가 확인할 일정 또는 AI가 처리할 일정만 걸러 봅니다.

목록은 미완료 미래 일정을 가까운 날짜부터 보여주고, 지난 미완료 일정은 최근 날짜부터 이어서 보여줍니다.

## 3. 반복 일정

달력의 **일정 추가 → 반복**에서 매일, 매주, 매월, 매년을 선택할 수 있습니다. 직접 작성할 때는 날짜 뒤에 다음 표식을 붙입니다.

| 반복 | 표식 | 예시 |
| --- | --- | --- |
| 매일 | \`🔁 daily\` | 매일 백업 확인 |
| 매주 | \`🔁 weekly\` | 매주 월요일 보고 |
| 매월 | \`🔁 monthly:DD\` | \`🔁 monthly:15\` |
| 매년 | \`🔁 yearly:MM-DD\` | \`🔁 yearly:09-15\` |

~~~markdown
- [ ] SindangSeoul · 업데이트 📅 2026-09-15 🔁 monthly:15 #follow-up #sindangseoul
~~~

반복 항목의 체크박스를 완료하면 완료 기록을 계속 쌓는 대신, **같은 미완료 원본 한 줄의 날짜가 오늘 이후의 다음 회차로 이동**합니다. 여러 PC에서 중복 일정이 생기는 것을 줄이기 위한 rolling 방식입니다.

- 매월 29~31일은 그 날짜가 없는 달에는 해당 월의 마지막 날을 사용합니다.
- 매년 2월 29일은 윤년이 아닌 해에는 2월 마지막 날을 사용합니다.
- 오래 밀린 반복 일정도 한 번 완료하면 오늘 이후의 첫 회차로 이동합니다.

## 4. 달력 노트 이름 바꾸기

**설정 → Tag Calendar → 달력 노트 경로**에서 파일명이나 볼트 내부 경로를 입력하고 **적용**을 누릅니다.

- 예: \`_CALENDAR.md\`
- 예: \`System/_CALENDAR.md\`
- 기존 달력 노트가 있으면 Obsidian의 파일 이름 변경 기능으로 옮겨 링크도 함께 갱신합니다.
- 새 경로에 파일이 이미 있으면 덮어쓰지 않습니다.
- 절대 경로, \`..\`, \`.obsidian/\` 내부 경로는 허용하지 않습니다.

리본 아이콘은 설정된 달력 노트를 열며, 파일이 없으면 기본 달력·목록 블록과 **Calendar entries** 영역을 자동으로 만듭니다.

## 5. 여러 PC와 Sync

일정의 원본은 일반 Markdown 파일이므로 Obsidian Sync로 동기화됩니다. 모든 PC에서 같은 동작을 원하면 다음도 함께 맞춰야 합니다.

1. 각 PC에 같은 버전의 Tag Calendar를 설치하고 활성화합니다.
2. Obsidian Sync에서 **설정 → 커뮤니티 플러그인** 동기화를 켭니다.
3. 동기화가 끝난 뒤 Obsidian을 다시 로드합니다.

가이드와 업데이트 노트는 \`main.js\`에 포함됩니다. 따라서 별도 가이드 파일을 동기화할 필요는 없고, 각 PC에 설치된 플러그인 버전의 설명서가 열립니다. 플러그인이 없는 쓰기 PC에서도 올바른 체크박스 한 줄만 만들면, 다른 PC의 Tag Calendar가 동기화 후 수집합니다.

## 6. 다른 노트에 달력 넣기

어떤 Markdown 노트에도 아래 코드 블록을 넣을 수 있습니다.

~~~markdown
\`\`\`tag-calendar
weekStart: monday
showCompleted: false
density: compact
\`\`\`
~~~

목록을 넣으려면 첫 줄을 \`tag-list\`로 바꿉니다. 이전 이름 \`follow-up-calendar\`·\`follow-up-list\`도 계속 동작합니다.

- \`weekStart: monday | sunday\`: 한 주의 시작 요일
- \`showCompleted: true | false\`: 처음 열 때 완료 일정 표시 여부
- \`density: compact | expanded\`: 축약형 또는 확장형 시작 크기
- \`assignee: owner | ai | all\`: 👤 내 확인 일정만, 🤖 AI 일정만, 또는 전체(확인 담당 표식을 켰을 때만)
- 블록 옵션이 없으면 플러그인 설정값을 사용합니다.

## 7. 설정

- **언어**: Obsidian 언어 자동 감지, 한국어, English 중 선택
- **달력 노트 경로**: 리본에서 여는 허브 노트 이름 또는 위치
- **한 주의 시작**: 월요일 또는 일요일
- **완료 일정 기본 표시**: 뷰를 처음 열 때 완료 항목 포함 여부
- **기본 달력 크기**: 축약형 또는 확장형 시작 크기
- **확인 담당 표식 (👤 / 🤖)**: AI에게 일을 맡기는 경우 켭니다. 기본은 꺼짐
- **사용 가이드**: 이 화면 열기 및 설치된 버전 확인

## 8. 문제 해결

- **일정이 안 보임**: 체크박스, \`📅 YYYY-MM-DD\`, \`#follow-up\` 세 요소와 날짜 형식을 확인합니다.
- **반복되지 않음**: 표식이 날짜와 같은 줄에 있는지, \`monthly:15\`처럼 공백 없이 썼는지 확인합니다.
- **다른 PC에서 안 보임**: Markdown 파일 동기화 완료 여부, 플러그인 활성화, 커뮤니티 플러그인 설정 동기화를 확인합니다.
- **달력 파일 이름이 안 바뀜**: 새 경로에 같은 이름의 파일이나 폴더가 있는지 확인합니다.
- **화면이 이전 버전임**: Obsidian을 다시 로드한 뒤 이 가이드 상단의 설치 버전을 확인합니다.

## 9. AI 비서에게 일정 관리 맡기기

Claude, ChatGPT, Codex 같은 AI 비서가 볼트에서 일한다면 아래 영어 지침을 AI의 지침 파일(CLAUDE.md, AGENTS.md)이나 사용자 지침에 붙여 넣으세요. **설정 → AI 비서용 지침 → 복사**를 누르면 현재 허브 노트 경로가 들어간 지침이 복사됩니다. AI는 이 지침에 따라 정확한 형식으로 일정을 쓰고, 👤·🤖를 고르고, 기한이 된 🤖 일정을 처리한 뒤 보고합니다. 달력에서 표식을 구분해 보려면 **설정 → 확인 담당 표식**도 켜 두세요.

~~~markdown
${buildAiInstructions()}~~~

## 업데이트 노트

${releaseNotes("ko")}
`;
}

function englishGuide(version: string): string {
  return `# Tag Calendar User Guide

> Installed version: **v${version}**  
> This guide is bundled with the plugin and updates with the plugin version.

Tag Calendar finds dated follow-up tasks across your vault and shows them in a monthly calendar and nearest-first list. There is no separate event database: **the original Markdown checkbox is the source of truth**.

## 1. Quick start

1. Select the calendar icon in the left ribbon.
2. Select **Add schedule** above the calendar.
3. Enter a title, first due date, optional repeat interval, and optional project tag.
4. Select an item in the calendar to open its source note.

To create an item directly, use this format:

~~~markdown
- [ ] Project · Specific follow-up action 📅 2026-09-15 #follow-up #project
~~~

Every recognized item needs all three of these:

- A Markdown checkbox: \`- [ ]\` or \`- [x]\`
- A date: \`📅 YYYY-MM-DD\`
- The collection tag: \`#follow-up\`

A project tag is optional; a lowercase flat tag such as \`#sindangseoul\` is recommended. If a line contains multiple calendar dates, the first one is used.

### Who handles it (👤 / 🤖) — optional

This is for people who hand some follow-ups to an AI, and it is **off by default**. Turn on **Settings → Who-handles-it markers**, then add one of these markers to a line to see at a glance who handles it. Placing it before the date is recommended. When the setting is off, markers stay in your notes but are ignored.

| Marker | Meaning | Calendar display |
| --- | --- | --- |
| \`👤\` | You must check or decide it yourself | Orange person icon · bold title · filled dot and count in compact view |
| \`🤖\` | An AI handles it and only reports back | Cyan bot icon · dashed outline · hollow ring and count in compact view |

~~~markdown
- [ ] Toolvil · Review three theme drafts 👤 📅 2026-10-24 #follow-up #toolvil
- [ ] Toolvil · D+7 indexing and traffic check 🤖 📅 2026-10-25 #follow-up #toolvil
~~~

- Unmarked items keep the default dot.
- If both markers appear, \`👤\` wins.
- Overdue items keep their assignee colour, and the icon turns red.
- Select the 👤 or 🤖 count in the calendar or list header to show only those items; select it again to show everything. The counts cover all dates; the red number next to 👤 is **overdue plus due today**.

## 2. Calendar and list

- **Add schedule** creates a source task in the calendar hub note.
- **Show/Hide completed** controls completed items in the current view.
- **Compact/Expanded view** switches between a low overview and the full title layout.
- **Copy** copies a live calendar code block with the current options.
- The **book icon** opens this guide.
- **Today** returns to the current month; arrows move between months.
- Selecting a title opens the exact line in its source Markdown note.
- A checkbox updates the source item directly.
- **+N more** expands busy days in a modal.
- The **👤 / 🤖 counts** (when who-handles-it markers are on) filter the view to items you must check or items an AI handles.

The list shows incomplete future items nearest first, followed by incomplete overdue items with the most recent first.

## 3. Recurring schedules

Choose daily, weekly, monthly, or yearly under **Add schedule → Repeat**. When writing a task directly, place one of these markers after the date.

| Repeat | Marker | Example |
| --- | --- | --- |
| Daily | \`🔁 daily\` | Daily backup check |
| Weekly | \`🔁 weekly\` | Weekly report |
| Monthly | \`🔁 monthly:DD\` | \`🔁 monthly:15\` |
| Yearly | \`🔁 yearly:MM-DD\` | \`🔁 yearly:09-15\` |

~~~markdown
- [ ] SindangSeoul · Update 📅 2026-09-15 🔁 monthly:15 #follow-up #sindangseoul
~~~

Completing a recurring item does not create an ever-growing history. Instead, **the date on the same open source task advances to the first occurrence after today**. This rolling model also reduces duplicate future tasks across synced devices.

- Monthly days 29–31 use the last day in shorter months.
- Yearly February 29 uses the last day of February in non-leap years.
- An overdue recurring task advances directly to its first occurrence after today.

## 4. Rename the calendar note

Open **Settings → Tag Calendar → Calendar note path**, enter a file name or vault-relative path, and select **Apply**.

- Example: \`_CALENDAR.md\`
- Example: \`System/_CALENDAR.md\`
- Existing notes are moved with Obsidian's rename API so links are updated.
- An existing target is never overwritten.
- Absolute paths, \`..\`, and paths inside \`.obsidian/\` are rejected.

The ribbon opens the configured note. If it does not exist, Tag Calendar creates it with calendar and list blocks plus a **Calendar entries** section.

## 5. Sync across computers

Schedule sources are ordinary Markdown files, so Obsidian Sync can carry them between computers. For consistent behavior:

1. Install and enable the same Tag Calendar version on each computer.
2. Enable syncing for **Settings → Community plugins** in Obsidian Sync.
3. Reload Obsidian after synchronization finishes.

The guide and update notes are bundled into \`main.js\`; there is no separate guide file to sync. A computer without the plugin can still write a correctly formatted task, and Tag Calendar on another computer will collect it after sync.

## 6. Embed a live view in another note

Add this code block to any Markdown note:

~~~markdown
\`\`\`tag-calendar
weekStart: monday
showCompleted: false
density: compact
\`\`\`
~~~

Use \`tag-list\` on the first line for the list view. The older names \`follow-up-calendar\` and \`follow-up-list\` keep working.

- \`weekStart: monday | sunday\`: first day of the week
- \`showCompleted: true | false\`: initial completed-item visibility
- \`density: compact | expanded\`: initial compact or expanded layout
- \`assignee: owner | ai | all\`: only 👤 items, only 🤖 items, or everything (only when who-handles-it markers are on)
- Omitted options fall back to plugin settings.

## 7. Settings

- **Language**: automatic Obsidian language, Korean, or English
- **Calendar note path**: note opened from the ribbon
- **First day of week**: Monday or Sunday
- **Show completed by default**: initial visibility for completed items
- **Default calendar size**: initial compact or expanded layout
- **Who-handles-it markers (👤 / 🤖)**: turn on if you hand some follow-ups to an AI. Off by default
- **User guide**: open this screen and verify the installed version

## 8. Troubleshooting

- **Item is missing**: verify the checkbox, \`📅 YYYY-MM-DD\`, \`#follow-up\`, and date validity.
- **Repeat does not advance**: keep the repeat marker on the same line and use forms such as \`monthly:15\` without spaces.
- **Another computer is missing items**: verify file sync, plugin enablement, and Community plugins setting sync.
- **Calendar note will not rename**: check whether a file or folder already occupies the target path.
- **The UI looks outdated**: reload Obsidian and check the installed version at the top of this guide.

## 9. Let an AI assistant keep your follow-ups

If an AI assistant such as Claude, ChatGPT, or Codex works in your vault, paste the instructions below into its instruction file (CLAUDE.md, AGENTS.md) or custom instructions. **Settings → Instructions for your AI assistant → Copy** copies them with your current hub note path. The assistant then writes follow-ups in the exact format, picks 👤 or 🤖, and works its due 🤖 items and reports back. Turn on **Settings → Who-handles-it markers** to see the split on the calendar.

~~~markdown
${buildAiInstructions()}~~~

## Update notes

${releaseNotes("en")}
`;
}

export function buildGuideMarkdown(language: UiLanguage, version: string): string {
  return language === "ko" ? koreanGuide(version) : englishGuide(version);
}
