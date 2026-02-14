# Momentum Engine

A tiny no-deps Python CLI that gives you actionable missions and tracks momentum.

## Commands

```bash
python3 momentum-engine/main.py suggest   # get a mission
python3 momentum-engine/main.py done      # complete active mission
python3 momentum-engine/main.py skip      # skip active mission
python3 momentum-engine/main.py stats     # view streak/stats
python3 momentum-engine/main.py reset     # reset state
```

## Notes

- State is stored in `momentum-engine/state.json`
- Difficulty scales up every 3 completed missions in a streak
- Skipping resets streak and can lower difficulty

## Example flow

```bash
python3 momentum-engine/main.py suggest
python3 momentum-engine/main.py done
python3 momentum-engine/main.py stats
```
