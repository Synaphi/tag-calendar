<a href="assets/banner.png"><img src="assets/banner.png" alt="Tag Calendar — a light, easy calendar for your follow-ups"></a>

# Tag Calendar

A light, easy calendar for Obsidian. Tag a task, give it a date, and it shows up on the calendar.

```markdown
- [ ] Send the follow-up email 📅 2026-09-15 #follow-up
```

That one Markdown line is the whole system. No database, no sync engine, no setup.

## Why you'll like it

- **One line, one place.** Your schedule lives in plain Markdown checkboxes. Edit the line, the calendar updates. Tick the calendar, the line updates.
- **One note to manage.** The plugin opens a single hub note (`_CALENDAR.md` by default). Add schedules there, or write the line in any note — both are picked up instantly.
- **Copy it anywhere.** Press **Copy** and paste a `tag-calendar` block into any note — your daily note, a project page, a dashboard. Every copy is live and shows the same data.
- **Light.** It only indexes lines that carry both `📅` and `#follow-up`, so it stays fast even in large vaults and never touches your other tasks.
- **Recurring, without clutter.** Add `🔁 daily`, `weekly`, `monthly:15`, or `yearly:09-15`. Completing an occurrence rolls the same line forward to the next date — no duplicated future tasks.
- **Know what's yours (optional).** If you hand some follow-ups to an AI assistant, turn on **Who-handles-it markers** and add `👤` (you must check it) or `🤖` (the AI handles it and reports back). Your items stand out in orange with a person icon, AI items recede in cyan with a bot icon, and one click in the header filters to either side. Off by default — if you don't use an AI, nothing changes. Ready-made instructions for your AI assistant are one click away in settings.

## Screens

Compact calendar with a nearest-first list underneath:

<p align="center">
  <img src="assets/calendar-view.png" alt="Tag Calendar month view and follow-up list inside Obsidian" width="720">
</p>

Click a day to see everything due that day and tick items off:

<p align="center">
  <img src="assets/day-view.png" alt="Day popup listing the follow-ups due on a date" width="720">
</p>

## How to use

1. Click the calendar icon in the left ribbon. The hub note opens (it's created once if missing).
2. Press **Add schedule**, or write a line yourself:
   `- [ ] Title 📅 YYYY-MM-DD #follow-up #optional-project-tag`
3. Press **Copy** in the calendar header and paste the block into any other note.

Live block options (all optional):

````markdown
```tag-calendar
weekStart: monday
showCompleted: false
density: compact
```
````

Use `tag-list` as the block name for the list view only.

### Who handles it (optional)

Turn on **Settings → Who-handles-it markers**, then put one marker before the date:

```markdown
- [ ] Review the three theme drafts 👤 📅 2026-10-24 #follow-up #toolvil
- [ ] Check indexing and traffic after a week 🤖 📅 2026-10-25 #follow-up #toolvil
```

| Marker | Meaning | Shown as |
| --- | --- | --- |
| `👤` | You must check or decide it yourself | Orange person icon, bold title; compact view: filled dot + count |
| `🤖` | An AI handles it and only reports back | Cyan bot icon, dashed outline; compact view: hollow ring + count |

The header shows `👤` and `🤖` counts; click one to see only those items. The red number next to `👤` is
overdue plus due today. Add `assignee: owner` (or `ai`) to a live block to keep it filtered. With the
setting off, markers stay in your notes and are simply ignored.

### Let an AI assistant keep your follow-ups

If an AI assistant (Claude, ChatGPT, Codex, …) works in your vault, give it these instructions. Copy them from
**Settings → Instructions for your AI assistant → Copy** (that copy uses your own hub note path), or from below,
and paste them into `CLAUDE.md`, `AGENTS.md`, or the assistant's custom instructions. The assistant then
writes follow-ups in the exact format, picks 👤 or 🤖, and works its due 🤖 items and reports back.

````markdown
# Tag Calendar follow-ups

This vault uses the Obsidian plugin Tag Calendar. It reads a follow-up only from a single
line in a Markdown (.md) note that starts with a `- [ ] ` checkbox, has some title text,
and contains both `📅 YYYY-MM-DD` and `#follow-up`. "Today" means the user's local date,
not UTC. To find follow-ups, search .md files for lines containing `#follow-up`.

## When to create one

When work produces something to re-check, measure, reply to, or decide on a specific
future date, add one line like this (without the surrounding backticks):

`- [ ] Project · specific next action 👤 📅 2026-10-29 #follow-up #project-tag`

- Use an absolute date computed from today ("next week" becomes a real date). If no date
  can be fixed, do not create a follow-up; leave a normal note instead.
- Put it in the related note. If there is none, add it under `## Calendar entries` in
  the hub note `_CALENDAR.md`. If that note does not exist, do not create it; ask the user
  to open Tag Calendar once (the plugin creates it) and use the related note meanwhile.
- If the same follow-up already exists, update that line instead of adding another.
- Recurring: add one of `🔁 daily`, `🔁 weekly`, `🔁 monthly:DD`, `🔁 yearly:MM-DD`
  after the date.
- Tags: lowercase, hyphenated, flat (`#my-project`). The first tag on the line other than
  `#follow-up` is the project, so put no other tags before it. Never write "#" directly before a number (`#7`, `PR #12`): Tag Calendar
  reads it as a tag, drops it from the title, and may take it as the project. Write
  `PR 12` instead.
- Keep exactly one 📅 on a line.

## Who handles it: put exactly one marker before 📅

- 👤 The user must check, decide, or approve it: decisions, sign-offs, anything that needs
  the user's own accounts, payments, legal or tax forms, physical checks, or contacting
  people.
- 🤖 You (the AI) can do it yourself and only report the result: checking metrics or
  status, confirming a scheduled post went live, tidying up, re-measuring.
- When unsure, use 👤. If a 🤖 item turns out to need the user, change its marker to 👤.
  Never change 👤 to 🤖.

## Working the list

- At the start of a session, find open 🤖 items that are due today or overdue, handle
  them, and report each to the user in one line.
- Never pay, delete, publish, or send anything on a 🤖 item without the user's approval.
  Hand it over as 👤 instead.
- One-off item done: change `[ ]` to `[x]` only after you have actually verified the
  result, and you may append a short result note at the end of the line. Mark a 👤 item
  done only when the user confirms it.
- Recurring item done: keep `[ ]` and the 🔁 marker unchanged, and move 📅 to the next
  occurrence after its current date, or after today if that date has passed (weekly keeps
  the same weekday; a monthly or yearly day that does not exist becomes the last day of
  that month). Report the result instead of appending it to the line.
- Never delete a follow-up line; mark it `[x]` or ask the user.
- When the user asks what needs their attention, list open 👤 items that are overdue or
  due soon, nearest first.
- Write example follow-ups only inside a fenced code block, or wrap the whole line in
  backticks so it does not start with `- [`.
````

## Settings

Language (English by default; Korean, or follow Obsidian), hub note path, first day of week, show completed by default, default calendar size, and who-handles-it markers (off by default). A built-in guide with update notes is one click away from the book icon.

## Feedback

This plugin is small on purpose, and I keep it that way. If something feels off or you're missing a small thing, [open an issue](https://github.com/Synaphi/tag-calendar/issues) — feedback is folded in quickly.

## Install manually

Download `main.js`, `manifest.json`, and `styles.css` from the latest release into `<vault>/.obsidian/plugins/tag-calendar/`, reload Obsidian, and enable **Tag Calendar**.

## Development

```bash
npm install
npm test
npm run build
npm run deploy:local -- C:\path\to\vault
```

Versions use the date form `<year index>.<MM>.<DD>` (`1.09.15` = 2026-09-15). The community
directory requires three-part semver, so a second release on the same day takes the next day number
(`1.09.16`). Edit `manifest.json`, `package.json`, and `versions.json` by hand — `npm version`
normalizes `1.09.15` to `1.9.15` and breaks the release tag.

The banner is rendered from `assets/banner-source.html` with headless Chrome at 1280×600 (scale 1.5).

## License

MIT
