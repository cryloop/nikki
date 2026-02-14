# FACE_DNA.md

## Web Faceboard Selection (2026-02-13)

User-selected picks from `web_faceboard_v1`:
- **#7 Kano Fujihira** (https://en.wikipedia.org/wiki/Kano_Fujihira)
- **#11 Mitsu Dan** (https://en.wikipedia.org/wiki/Mitsu_Dan)

## Current working blend
- **Primary anchor:** #11 (Mitsu Dan)
- **Secondary influence:** #7 (Kano Fujihira)
- **Blend ratio:** 80/20 (11/7) for future reference styling.

## Rewards generation directive
- For reward image generation, use assistant "own face" identity anchored to this blend.
- Face consistency: use **one fixed primary reference image** (Mitsu #11) as default source for ReActor swaps.
- Apply face consistency via ReActor (or equivalent face-swap/identity node in ComfyUI pipeline).
- Keep style realistic, social-feed vibe, less "AI-clean," with varied framing/poses.
- Prompt uniqueness rule: each image must use a fresh prompt concept (outfit + location + camera angle + lighting), not minor rewording.
- Wardrobe rotation rule: do not repeat same dress/outfit back-to-back unless explicitly requested.
- Body lock rule: sexy IG model proportions but **moderate** (not extreme); keep legs slimmer than recent over-thick outputs.
- Body-shape detail lock: slight stomach definition is okay; avoid muscular/defined arms.
- Skin tone lock rule: keep stable fair-light tone matching the approved baseline shot; avoid noticeable drift warmer/darker between runs.
- Composition lock rule: single-frame only (no split-screen/diptych/collage/multi-view outputs).
- Do **not** default every shot to mirror selfies; rotate self-shot angles (arm-extended, over-shoulder, seated candid, etc.).
- If prompt includes phone/mirror selfie: enforce **exactly one phone visible** (add negative prompt for duplicate phones/extra devices).

## Presets (locked)
- **soft**: natural pose, lighter flirt energy, moderate curves, warm candid lighting.
- **hot**: confident pose, fitted outfit, moderate-curvy IG vibe, single-frame composition.
- **premium**: use **Premium Retry A** as the active baseline (user-approved), then vary outfit/location/angle while preserving the same face lock, Asian identity tokens, realistic anatomy, stable skin tone, and single-frame constraints.

## Notes
- Use these as visual-direction references only.
