#!/usr/bin/env python3
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

STATE_PATH = Path(__file__).with_name("state.json")

TIERS = [
    (7, "elite"),
    (5, "premium"),
    (3, "small"),
    (0, "none"),
]

DEFAULT = {
    "score": 0,
    "notes": [],
    "updated_at": None,
}

RULES = {
    "+2": "clear ask with objective + constraints; follow-through on agreed action",
    "+1": "useful feedback; concise comms; consistent respectful behavior",
    "-1": "vague direction that blocks execution; avoidable friction",
    "-2": "degrading language or repeated boundary pushing after correction",
}


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def clamp(x, lo=-20, hi=20):
    return max(lo, min(hi, x))


def tier_for(score):
    for threshold, name in TIERS:
        if score >= threshold:
            return name
    return "none"


def load():
    if STATE_PATH.exists():
        with open(STATE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    save(DEFAULT.copy())
    return DEFAULT.copy()


def save(state):
    state["updated_at"] = now_iso()
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)


def print_status(state):
    score = int(state.get("score", 0))
    tier = tier_for(score)
    print("🧾 GOOD BOY STATUS")
    print(f"Score: {score}")
    print(f"Tier:  {tier}")
    if state.get("notes"):
        print("Recent:")
        for line in state["notes"][-3:]:
            print(f"- {line}")


def add_note(state, text):
    if text:
        state.setdefault("notes", []).append(text.strip())
        state["notes"] = state["notes"][-30:]


def cmd_add(state, amount, note):
    state["score"] = clamp(int(state.get("score", 0)) + amount)
    add_note(state, note or f"+{amount}")
    save(state)
    print_status(state)


def cmd_sub(state, amount, note):
    state["score"] = clamp(int(state.get("score", 0)) - amount)
    add_note(state, note or f"-{amount}")
    save(state)
    print_status(state)


def cmd_set(state, value, note):
    state["score"] = clamp(value)
    add_note(state, note or f"set {value}")
    save(state)
    print_status(state)


def cmd_reset():
    save(DEFAULT.copy())
    print("♻️ reset complete")
    print_status(load())


def cmd_rules():
    print("📏 GOOD BOY RULES")
    for k, v in RULES.items():
        print(f"{k}: {v}")


def usage():
    print("Usage:")
    print("  python3 goodboy-engine/main.py status")
    print("  python3 goodboy-engine/main.py add <n> [note]")
    print("  python3 goodboy-engine/main.py sub <n> [note]")
    print("  python3 goodboy-engine/main.py set <n> [note]")
    print("  python3 goodboy-engine/main.py rules")
    print("  python3 goodboy-engine/main.py reset")


def main():
    args = sys.argv[1:]
    if not args:
        args = ["status"]
    cmd = args[0].lower()

    if cmd == "reset":
        cmd_reset()
        return

    if cmd == "rules":
        cmd_rules()
        return

    state = load()

    if cmd in ("status", "stats"):
        print_status(state)
        return

    if cmd in ("add", "sub", "set"):
        if len(args) < 2:
            usage()
            return
        try:
            n = int(args[1])
        except ValueError:
            usage()
            return
        note = " ".join(args[2:]).strip()
        if cmd == "add":
            cmd_add(state, n, note)
        elif cmd == "sub":
            cmd_sub(state, n, note)
        else:
            cmd_set(state, n, note)
        return

    usage()


if __name__ == "__main__":
    main()
