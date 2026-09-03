# Tag Calendar

**A simple, focused Obsidian calendar for dated and recurring follow-up tasks.**

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/synaphi-logo-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="assets/synaphi-logo-light.png">
    <img src="assets/synaphi-logo-light.png" alt="SYNAPHI" width="320">
  </picture>
</p>

It does one job: finds Markdown tasks containing both `📅 YYYY-MM-DD` and `#follow-up`, then shows them in a clean calendar and list. No project system, no complicated workflow.

```markdown
- [ ] Project · Send the follow-up email 📅 2026-09-13 #follow-up #project
```

The plugin adds a calendar icon to the left ribbon. It opens a live calendar and a nearest-upcoming-first list backed by the original Markdown tasks.

## Features

- Compact and expanded month layouts with a one-click size switch
- Nearest upcoming dates at the top of the list; recent overdue items follow
- One-click completion that updates the source task
- Add one-time or daily, weekly, monthly, and yearly schedules from the calendar
- Rolling recurring tasks: completing the current occurrence moves it to the next due date
- Rename or move the calendar hub note safely from plugin settings
- Built-in Korean and English guide with versioned update notes
- Copyable `follow-up-calendar` block for any note
- Automatic Obsidian language detection plus manual English/Korean selection
- Light and dark theme support using Obsidian theme variables

## Actual plugin screens

These are the real plugin views running inside Obsidian—not generated mockups.

### Calendar

<p align="center">
  <img src="assets/calendar-view.png" alt="Tag Calendar running in Obsidian" width="760">
</p>

### Nearest upcoming list

<p align="center">
  <img src="assets/list-view.png" alt="Follow-up list running in Obsidian" width="760">
</p>

## Install manually

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release.
2. Put them in `<vault>/.obsidian/plugins/follow-up-calendar/`.
3. Reload Obsidian, then enable **Tag Calendar** under Community plugins.

The plugin ID and install folder remain `follow-up-calendar` for update compatibility.

## Built-in guide

Open the complete guide from the **book icon** in the calendar or list header, the command
palette command **Tag Calendar: Open Tag Calendar user guide**, or **Settings → Tag Calendar**.
The guide is bundled into `main.js`, displays the installed plugin version, and includes update
notes for every released version.

## Live blocks

````markdown
```follow-up-calendar
weekStart: monday
showCompleted: false
density: compact
```
````

Use `follow-up-list` instead of `follow-up-calendar` for the list view.

Use the calendar header button to switch between the compact overview and the expanded layout.
The `density` block option accepts `compact` or `expanded`; the default is also configurable in
plugin settings.

## Recurring follow-ups

Use **Add schedule** in the calendar header and choose a repeat interval. The plugin stores one
plain Markdown task in the calendar hub, for example:

```markdown
- [ ] SindangSeoul · Update 📅 2026-09-15 🔁 monthly:15 #follow-up #sindangseoul
```

The task represents the next live occurrence. Completing it in the calendar advances the date to
the next occurrence after today while keeping the checkbox open. This avoids synthetic event
databases, duplicate future tasks, and unbounded completion metadata. Monthly and yearly markers
retain their original day anchor, including month-end and leap-day schedules.

## Development

```bash
npm install
npm test
npm run build
npm run deploy:local -- C:\path\to\vault
```

## License

MIT
