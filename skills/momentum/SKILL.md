---
name: momentum
description: Run Momentum Engine from Discord. Use `/momentum suggest|done|skip|stats|reset`.
user-invocable: true
---

# Momentum Skill

Use this skill when the user asks to run momentum commands.

Valid actions:
- `suggest`
- `done`
- `skip`
- `stats`
- `reset`

Behavior:
1. Parse the user input (after `/momentum`).
2. Default to `suggest` if no action is provided.
3. Execute exactly one command via `exec` in workspace root:
   - `python3 momentum-engine/main.py <action>`
4. Return only the meaningful output to the user (clean, concise).
5. If action is invalid, show valid actions.

Safety:
- Never pass arbitrary shell input.
- Only allow the fixed action words above.
