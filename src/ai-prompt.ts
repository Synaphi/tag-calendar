// Instructions users paste into their AI assistant (CLAUDE.md, AGENTS.md, custom instructions).
// Example lines stay in inline code so a copy saved inside the vault is never indexed as a real follow-up.
export const DEFAULT_AI_HUB_PATH = "_CALENDAR.md";

export function buildAiInstructions(hubPath: string = DEFAULT_AI_HUB_PATH): string {
  return `# Tag Calendar follow-ups

This vault uses the Obsidian plugin Tag Calendar. It reads a follow-up only from a single
line in a Markdown (.md) note that starts with a \`- [ ] \` checkbox, has some title text,
and contains both \`📅 YYYY-MM-DD\` and \`#follow-up\`. "Today" means the user's local date,
not UTC. To find follow-ups, search .md files for lines containing \`#follow-up\`.

## When to create one

When work produces something to re-check, measure, reply to, or decide on a specific
future date, add one line like this (without the surrounding backticks):

\`- [ ] Project · specific next action 👤 📅 2026-10-29 #follow-up #project-tag\`

- Use an absolute date computed from today ("next week" becomes a real date). If no date
  can be fixed, do not create a follow-up; leave a normal note instead.
- Put it in the related note. If there is none, add it under \`## Calendar entries\` in
  the hub note \`${hubPath}\`. If that note does not exist, do not create it; ask the user
  to open Tag Calendar once (the plugin creates it) and use the related note meanwhile.
- If the same follow-up already exists, update that line instead of adding another.
- Recurring: add one of \`🔁 daily\`, \`🔁 weekly\`, \`🔁 monthly:DD\`, \`🔁 yearly:MM-DD\`
  after the date.
- Tags: lowercase, hyphenated, flat (\`#my-project\`). The first tag on the line other than
  \`#follow-up\` is the project, so put no other tags before it. Never write "#" directly before a number (\`#7\`, \`PR #12\`): Tag Calendar
  reads it as a tag, drops it from the title, and may take it as the project. Write
  \`PR 12\` instead.
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
- One-off item done: change \`[ ]\` to \`[x]\` only after you have actually verified the
  result, and you may append a short result note at the end of the line. Mark a 👤 item
  done only when the user confirms it.
- Recurring item done: keep \`[ ]\` and the 🔁 marker unchanged, and move 📅 to the next
  occurrence after its current date, or after today if that date has passed (weekly keeps
  the same weekday; a monthly or yearly day that does not exist becomes the last day of
  that month). Report the result instead of appending it to the line.
- Never delete a follow-up line; mark it \`[x]\` or ask the user.
- When the user asks what needs their attention, list open 👤 items that are overdue or
  due soon, nearest first.
- Write example follow-ups only inside a fenced code block, or wrap the whole line in
  backticks so it does not start with \`- [\`.
`;
}
