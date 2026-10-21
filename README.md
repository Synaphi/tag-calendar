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
- **Know what's yours (optional).** If you hand some follow-ups to an AI assistant, turn on **Who-handles-it markers** and add `👤` (you must check it) or `🤖` (the AI handles it and reports back). Your items stand out in orange with a person icon, AI items recede in cyan with a bot icon, and one click in the header filters to either side. Off by default — if you don't use an AI, nothing changes.

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
