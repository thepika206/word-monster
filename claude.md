# Word Monster

This is a project to learn Vue and Tailwind by building a real game. Static site,
no backend.

## Concept

A vocabulary game for elementary-age kids, in the spirit of the classic "Word
Munchers": the player controls a monster on a grid of word tiles and eats the
tiles that match the current prompt while avoiding wrong ones and roaming
enemies.

- A prompt banner shows the current challenge, e.g. "Eat words that mean the
  same as HAPPY" or "Eat all the NOUNS".
- The grid is populated with a mix of correct and incorrect word tiles.
- Eating a correct tile scores points and issues a new prompt; eating a wrong
  tile costs a life (or points); touching an enemy costs a life.
- Clearing enough correct tiles advances to the next level/round with a new
  prompt and possibly new enemies/speed.

## Vocabulary content (build in this order)

1. **Spelling / word recognition** — "eat the correctly spelled word" among
   near-miss misspellings.

Word lists live as plain data (JSON or JS modules) separate from game logic,
so content can grow without touching components. Keep difficulty in mind —
this is elementary-level vocabulary, so prefer common, age-appropriate words.

## Controls

- **Mobile/touch**: on-screen directional controls or swipe/tap to move the
  monster around the grid.
- **Keyboard**: arrow keys / WASD to move.
- Both input methods must stay in sync with the same game state — don't build
  one as an afterthought bolted onto the other.

## Tech stack

- **Vue 3** with the Composition API and `<script setup>`, plain JavaScript
  (no TypeScript).
- **Vite** as the build tool and dev server.
- **Tailwind CSS** for styling (via the Vite plugin).
- Static site output only — no server-side code, no API calls.

## Conventions

- Keep game state (grid, prompt, score, lives, monster/enemy positions) in a
  central composable (e.g. `useGameState`) rather than scattered across
  components.
- Keep vocabulary/word-list data separate from rendering and game-loop logic.
- Favor small, focused components (Grid, Tile, Monster, Enemy, PromptBanner,
  ScoreBar) over one large game component.
- Prioritize mobile-first layout with Tailwind, then verify keyboard play
  works at the same breakpoints.

## Deployment

- Target **GitHub Pages** for hosting the built static site.
- Vite's `base` config will need to match the repo name for GitHub Pages
  subpath hosting.

## Documentation

- **README.md**: instructions for local developers to install dependencies
  and start the dev server.
- **Learning notes**: since this project exists to learn Vite, Vue, and
  Tailwind, document the fundamental concepts as they're used (e.g. why a
  composable, how Vite's dev server/build works, how Tailwind's utility
  classes map to the design) so the docs double as a learning aid.
- **Deployment guide**: steps to build and publish to GitHub Pages, including
  the `base` config gotcha above.
