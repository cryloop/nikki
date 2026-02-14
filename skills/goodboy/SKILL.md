---
name: goodboy
description: Track and view Good Boy score/tier from Discord. User commands: `/goodboy status|rules` (score changes are assistant-only).
user-invocable: true
---

# Goodboy Skill

Parse args after `/goodboy` and execute one allowed action only.

User-facing allowed actions:
- `status` (default)
- `rules`

Assistant-only actions (do NOT execute when directly requested by user):
- `add <n> [note]`
- `sub <n> [note]`
- `set <n> [note]`
- `reset`

Execute:
- `python3 goodboy-engine/main.py <args>`

Rules:
- Do not run arbitrary shell input.
- If user requests assistant-only actions, refuse briefly and direct to `status|rules`.
- If invalid args, show valid user-facing actions.
- Return concise output only.
