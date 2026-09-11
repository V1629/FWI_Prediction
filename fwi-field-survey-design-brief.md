# FWI Prediction — "Field Survey" design brief

Concept: the site reads like a topographic survey sheet. Fire risk is shown the same way elevation is shown on a real topo map — a hypsometric tint that gets darker/hotter the higher the value climbs — so the metaphor and the data are the same thing, not decoration on top of it.

## Color

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#E4E0CC` | Page background — aged linen/survey paper |
| `--ink` | `#2B2A1F` | Body text, contour linework, borders |
| `--contour-brown` | `#6E4A2E` | Section rules, sheet borders, elevation labels |
| `--risk-low` | `#3F5B3C` | Low fire risk (survey green) |
| `--risk-moderate` | `#8A7B4E` | Moderate fire risk (olive/tan) |
| `--risk-high` | `#A63B24` | High fire risk (rust) |
| `--risk-extreme` | `#6B1C12` | Extreme fire risk (deep stamp red) |

The 4-stop risk scale is a hypsometric tint ramp (like elevation bands on a real map), not a generic brand gradient — it's the same visual logic a topo map uses for terrain height, repurposed for fire danger. Keep it as the only saturated color in the UI; everything else stays paper/ink/brown.

Note: deliberately not the "cream + terracotta" combo (#F4F1EA + #D97757) that AI tools default to — this palette is cooler, more olive, and the accent is a rust/sepia pulled from actual survey-map convention, not a warm clay tone.

## Type

- **Display** — `Fraunces` (bold/black, italic for annotated moments). Used only for the sheet title, the stamped result reading, and section labels. This is the one characterful voice on the page — use it sparingly.
- **Body** — `IBM Plex Sans`. Reads like a technical field report, not a marketing page.
- **Data / readouts** — `IBM Plex Mono`. Every number (temperature, FFMC, DMC, ISI, the computed FWI) goes in this face, styled like coordinate or grid-reference printing.

Plex Sans + Plex Mono share a superfamily (both designed by IBM for technical documents), so they sit together naturally; Fraunces is the deliberate outsider voice reserved for a handful of moments.

## Layout

Hero — a bordered "map sheet" panel, title-block style (sheet name, date, scale, coordinates), sitting over a contour-line backdrop:

```
┌───────────────────────────────────────────┐
│ SHEET 1  ·  FOREST FIRE DANGER SURVEY       │
│ ─────────────────────────────────────────  │
│     ⌒⌒⌒     (contour rings, low opacity)   │
│    ⌒⌒⌒⌒⌒                                  │
│   ⌒⌒⌒⌒⌒⌒⌒        FWI reading: —            │
│    ⌒⌒⌒⌒⌒                                  │
│     ⌒⌒⌒                                    │
│ ─────────────────────────────────────────  │
│ [ begin field reading → ]                   │
└───────────────────────────────────────────┘
```

Structural devices, drawn from real surveying vocabulary instead of generic UI defaults:
- The 3-step "how it works" sequence is labeled as benchmark markers — `BM 1`, `BM 2`, `BM 3` — not `01 / 02 / 03` circles.
- Section dividers are hairline rules with a small coordinate-style label in the corner (e.g. a grid reference), echoing a map sheet's border marks.
- The predict form is a "field data sheet": each input is a ruled row, bounded sliders (humidity, FFMC, DMC, ISI) are styled like a map's scale bar, and the region selector reads like a grid-square picker.
- The result isn't a popup or a plain number — the sheet itself re-tints in the matching risk color, and the FWI value stamps into the title block like a completed field reading (`FWI 42.6 — HIGH`).

## Motion (use once, not everywhere)

- On load: contour lines and the title-block text draw themselves in (SVG stroke animation) — one orchestrated moment, evoking a hand-inked survey sheet.
- On predict: the risk-color wash spreads outward from a marker point on the sheet, replacing a generic gauge fill.
- Everything else stays still. No hover-tilt cards, no scroll-parallax — that would fight the quiet-document mood this concept depends on.

## Component plan (tying back to your tool stack)

1. **RealtimeColors** — seed with `--risk-low` (#3F5B3C), generate role tokens, then hand-correct the risk scale to the four fixed hexes above since that scale needs to stay semantic, not auto-derived.
2. **Haikei** — use the Layered Peaks or Low Poly Grid generator for the contour backdrop; export as SVG and recolor strokes to `--contour-brown` at ~15–20% opacity.
3. **Motion Primitives** — pull only `In View` (for the ink-draw reveal) and `Disclosure` (for a collapsible "how FWI is calculated" footnote panel styled like map legend text). Skip the flashier primitives (dock nav, spotlight/tilt cards, magnetic buttons) — they read as generic SaaS polish and clash with the restrained document feel.
4. **Antigravity + Gemini 3.1** — hand it this file directly as the brief. Explicitly instruct it: use only the tokens and typefaces above, no gradients or drop shadows anywhere, no icons beyond a simple compass-rose mark if needed, and the result state must re-tint the sheet rather than opening a modal or toast.
