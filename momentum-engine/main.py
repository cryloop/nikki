#!/usr/bin/env python3
import json
import random
import sys
from datetime import datetime, timezone
from pathlib import Path

STATE_PATH = Path(__file__).with_name("state.json")

MISSIONS = {
    "money": [
        "Cancel or downgrade one subscription you forgot you had.",
        "Find one recurring charge and set a cheaper alternative.",
        "Move £20 into a 'future-me' bucket right now.",
        "Price-check one thing you buy often and switch to cheaper source.",
    ],
    "systems": [
        "Automate one tiny annoyance (alias, shortcut, template, reminder).",
        "Delete one stale app or tool you never use.",
        "Create one reusable checklist for a repeated task.",
        "Fix one friction point that annoyed you this week.",
    ],
    "social": [
        "Send one thoughtful message to someone you value.",
        "Reply to one conversation you've been avoiding.",
        "Give one specific compliment that costs nothing.",
        "Invite one person to do something low-pressure this week.",
    ],
    "health": [
        "Do a 10-minute walk with no phone.",
        "Drink a full glass of water now and one more in an hour.",
        "Do 20 bodyweight reps total (any split).",
        "Set a realistic bedtime target for tonight.",
    ],
    "creative": [
        "Write 6 lines of anything, no edits.",
        "Capture one idea as a rough voice note.",
        "Remix an old idea into a new angle in 5 minutes.",
        "Create one ugly first draft and stop there.",
    ],
}

DIFF_PREFIX = {
    1: "light",
    2: "spicy",
    3: "feral",
}


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def load_state():
    if STATE_PATH.exists():
        with open(STATE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    state = {
        "streak": 0,
        "completed": 0,
        "skipped": 0,
        "difficulty": 1,
        "last_suggestion": None,
        "history": [],
        "created_at": now_iso(),
    }
    save_state(state)
    return state


def save_state(state):
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)


def suggest(state):
    categories = list(MISSIONS.keys())
    category = random.choice(categories)
    mission = random.choice(MISSIONS[category])
    difficulty = max(1, min(3, int(state.get("difficulty", 1))))
    flavor = DIFF_PREFIX[difficulty]

    full = {
        "category": category,
        "mission": mission,
        "difficulty": difficulty,
        "suggested_at": now_iso(),
    }
    state["last_suggestion"] = full
    save_state(state)

    print(f"🎯 {flavor.upper()} MISSION ({category})")
    print(mission)
    print("\nWhen done: python3 momentum-engine/main.py done")
    print("Need reroll: python3 momentum-engine/main.py skip")


def mark_done(state):
    last = state.get("last_suggestion")
    if not last:
        print("No active mission. Run 'suggest' first.")
        return

    state["completed"] += 1
    state["streak"] += 1
    if state["streak"] % 3 == 0 and state["difficulty"] < 3:
        state["difficulty"] += 1

    state["history"].append({"event": "done", "item": last, "at": now_iso()})
    state["last_suggestion"] = None
    save_state(state)
    print(f"✅ Logged. Streak: {state['streak']} | Difficulty: {state['difficulty']}")


def mark_skip(state):
    last = state.get("last_suggestion")
    if not last:
        print("No active mission. Run 'suggest' first.")
        return

    state["skipped"] += 1
    state["streak"] = 0
    if state["difficulty"] > 1:
        state["difficulty"] -= 1

    state["history"].append({"event": "skip", "item": last, "at": now_iso()})
    state["last_suggestion"] = None
    save_state(state)
    print(f"↩️ Skipped. Streak reset. Difficulty: {state['difficulty']}")


def stats(state):
    print("📊 MOMENTUM STATS")
    print(f"Completed: {state['completed']}")
    print(f"Skipped:   {state['skipped']}")
    print(f"Streak:    {state['streak']}")
    print(f"Difficulty:{state['difficulty']}")
    active = state.get("last_suggestion")
    if active:
        print(f"Active:    {active['category']} → {active['mission']}")
    else:
        print("Active:    none")


def reset_state():
    if STATE_PATH.exists():
        STATE_PATH.unlink()
    state = load_state()
    print("♻️ State reset.")
    stats(state)


def usage():
    print("Usage: python3 momentum-engine/main.py [suggest|done|skip|stats|reset]")


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "suggest"
    if cmd == "reset":
        reset_state()
        return

    state = load_state()
    if cmd == "suggest":
        suggest(state)
    elif cmd == "done":
        mark_done(state)
    elif cmd == "skip":
        mark_skip(state)
    elif cmd == "stats":
        stats(state)
    else:
        usage()


if __name__ == "__main__":
    main()
