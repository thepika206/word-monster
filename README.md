# Word Monster

A vocabulary game for elementary-age kids, in the spirit of the classic "Word
Munchers": guide a monster around a grid of word tiles, eating the correctly
spelled words while avoiding their misspellings and a roaming enemy. Each
round mixes several different words together, not just one word's variants.

This project also exists to learn Vue 3 and Tailwind CSS — see
[Learning notes](#learning-notes) below for how the fundamentals show up in
this codebase.

## Getting started

Requires [Node.js](https://nodejs.org/) (LTS) and npm.

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173) in a
browser. On desktop, move with arrow keys or WASD and press space to eat the
word tile you're standing on; on mobile/touch, use the on-screen D-pad and
the EAT button.

Other scripts:

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  data/                          word lists and challenge definitions
    spellingChallenges.js
  composables/                   reusable reactive game logic
    useGameState.js              grid, monster, enemies, score/lives, round flow
    useKeyboardControls.js       arrow key / WASD input
  components/
    GameGrid.vue                          renders the tile grid + monster + enemies
    WordTile.vue                          a single word tile
    PlayerMonster.vue / GameEnemy.vue     positioned overlays on the grid
    PromptBanner.vue                      current challenge prompt + feedback message
    ScoreBar.vue                          score / round / lives
    TouchControls.vue                     on-screen D-pad (mobile)
    GameOverlay.vue                       "Game Over" / restart overlay
  App.vue                        wires state + components together
```

## How the game works

The round starts from the intro screen, where the player chooses either
**Spelling** or **Synonyms**. Once a mode is selected, `startGame()` sets the
challenge mode, resets the monster and lives, and calls `startRound()` to build
that round's board and prompt.

From there, the game loop is simple:

- the board is rendered as a 5x5 grid of 25 tiles
- the player moves with arrow keys/WASD or the touch controls
- eating a correct tile adds points and decrements the remaining correct count
- eating a wrong tile loses a life and updates the message banner
- touching an enemy triggers a hit state, pauses the game briefly, then resets
  the player and ghosts to their starting positions
- when all correct tiles are cleared, the round advances and a new prompt is
  generated

### Board construction

`useGameState.js` owns the board logic. Each tile is a plain object with a
`word`, `correct`, `eaten`, and grid position (`x`, `y`). The board is built in
one of two ways:

- **Spelling mode**: each round picks a set of challenge words, samples the
  correct answer from each challenge, then fills the remaining cells with
  incorrect words from the same challenge pool.
- **Synonym mode**: the challenge contains a separate `target` word, a list of
  valid matching words, and a list of distractors. The target is used only for
  the prompt, and it is intentionally excluded from the board so the player is
  not shown the answer directly.

The board is always a 25-cell grid, so the game state is consistent across the
rounds and both modes.

### Enemy movement

Enemies are spawned along the top row and chase the player from there. A timer
runs in the background and repeatedly calls `moveEnemiesOnce()`, which:

- updates each ghost's position one step at a time
- every fifth movement step shifts the enemy toward the player's current
  position instead of moving randomly
- checks for a collision against the monster immediately after each move

This makes the enemies feel like they are roaming at first, then becoming more
aggressive as the round continues.

## Learning notes

Since this project is a vehicle for learning Vue and Tailwind, here's how
some of the fundamentals map onto the code:

- **Composables** (`src/composables/useGameState.js`,
  `useKeyboardControls.js`): Vue's way of extracting reusable stateful logic
  out of components, similar to React hooks. `useGameState` owns all game
  state (`ref`/`reactive`) and the functions that mutate it, so `App.vue`
  stays a thin wiring layer instead of a giant component.
- **`ref` vs `reactive`**: primitives and swappable values (`score`, `status`,
  `tiles`) use `ref`; the `monster` position and `enemies` list are mutated
  in place, so they use `reactive`.
- **`<script setup>`**: every component uses the Composition API's
  compile-time sugar — top-level `const`/`defineProps`/`defineEmits` are
  automatically exposed to the template, no `export default { setup() }`
  boilerplate.
- **Props down, events up**: `App.vue` owns state and passes it down as
  props (`GameGrid`, `PromptBanner`, `ScoreBar`); child components that
  trigger state changes (`TouchControls`, `GameOverlay`) emit events instead
  of mutating parent state directly.
- **`computed`**: used in `PlayerMonster.vue`/`GameEnemy.vue` to derive CSS position
  from grid coordinates, and in `PromptBanner.vue` to derive a feedback
  color from the message text.
- **Lifecycle hooks**: `onMounted`/`onUnmounted` in `useGameState` start and
  clean up the enemy-movement timer, and in `useKeyboardControls` add/remove
  the keydown listener — important so timers/listeners don't leak if the
  component tree changes.
- **Tailwind CSS v4**: configured via `@tailwindcss/vite` in
  `vite.config.js` with a single `@import 'tailwindcss'` in `src/style.css`
  — no separate `tailwind.config.js` needed. Styling is done entirely with
  utility classes directly in templates (mobile-first: base classes apply
  to small screens, `sm:` prefixes adjust for larger ones). See
  [docs/tailwind-cheatsheet.md](docs/tailwind-cheatsheet.md) for a
  reference of every utility class used in this project, grouped by
  category.

## Deployment

This is a static site, deployed to GitHub Pages via GitHub Actions
(`.github/workflows/deploy.yml`): every push to `main` builds the site with
Vite and publishes `dist/` to Pages automatically.

- `vite.config.js` sets `base: '/word-monster/'` so built asset URLs resolve
  correctly under `https://<username>.github.io/word-monster/`. Update this
  if the repo name changes.
- One-time setup (per repo): in GitHub, go to **Settings → Pages** and set
  **Source** to **GitHub Actions**. After that, pushing to `main` triggers a
  build + deploy automatically — no manual steps needed.
- To trigger a deploy without a code change, use the **Run workflow** button
  under the Actions tab (the workflow also listens for `workflow_dispatch`).
