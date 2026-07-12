# Tailwind cheatsheet

A reference for every Tailwind utility class actually used in this codebase,
grouped by what it does. This isn't the full Tailwind docs — it's a map from
"what am I looking at in this template" to "what does that class mean,"
scoped to this project's classes. For anything not covered here, search the
[official docs](https://tailwindcss.com/docs).

This project uses **Tailwind v4**, configured via `@tailwindcss/vite` with a
single `@import 'tailwindcss'` in `src/style.css` — no `tailwind.config.js`.

## How to read a class list

Tailwind classes compose in the template instead of living in a separate CSS
file — each class is one CSS property/value pair. A div like this:

```html
<div class="flex items-center justify-center gap-4 rounded-lg bg-slate-800 px-4 py-3">
```

reads left to right as: flex container → vertically centered → horizontally
centered → gap between children → rounded corners → background color →
horizontal padding → vertical padding. There's no "cascade" to worry about
within a single class list — each utility only touches the property it names.

## Layout

| Class | Effect |
| --- | --- |
| `flex` | `display: flex` |
| `flex-col` | stack children vertically (`flex-direction: column`) |
| `grid` | `display: grid` |
| `hidden` | `display: none` |
| `relative` | `position: relative` — establishes a positioning context |
| `absolute` | `position: absolute` — positioned relative to nearest `relative` ancestor |
| `inset-0` | `top/right/bottom/left: 0` — stretch to fill the positioned parent |
| `inset-x-0` | `left/right: 0` only |
| `bottom-0` | `bottom: 0` |

Used for: `GameGrid.vue` wraps the tile grid in `relative` so `PlayerMonster`
and `GameEnemy` (both `absolute`) can be positioned inside it by percentage.
Overlays (`GameOverlay.vue`, `RoundCompleteOverlay.vue`) use `absolute
inset-0` to cover the whole grid.

## Flexbox alignment

| Class | Effect |
| --- | --- |
| `items-center` | align children on the cross axis (vertical, in a row; horizontal, in a column) |
| `justify-center` | align children on the main axis |
| `justify-between` | spread children with space between them (used in `ScoreBar`) |
| `gap-4` / `gap-2` / `gap-1` | gap between flex/grid children (1rem / 0.5rem / 0.25rem) |

## Grid

| Class | Effect |
| --- | --- |
| `grid-cols-3` | 3 equal-width columns |
| `grid-rows-3` | 3 equal-height rows |
| `w-48` | fixed width, used with the 3×3 D-pad grid in `TouchControls.vue` |

The game grid itself (`GameGrid.vue`) doesn't use `grid-cols-N`/`grid-rows-N`
utilities because the column/row count is dynamic (depends on level config)
— it sets `gridTemplateColumns`/`gridTemplateRows` directly via an inline
`:style` binding instead. Utility classes are for static, known-ahead-of-time
values; reach for `:style` when the value comes from JS.

## Sizing

| Class | Effect |
| --- | --- |
| `w-full` | `width: 100%` |
| `h-full` | `height: 100%` |
| `min-w-0` | allow a flex/grid child to shrink below its content size (needed for `truncate` to work inside a grid cell) |
| `min-h-svh` | `min-height: 100svh` — small viewport height, accounts for mobile browser chrome better than `100vh` |
| `max-w-xl` | cap width at Tailwind's `xl` breakpoint size (36rem), used to keep the game board from stretching too wide on desktop |
| `aspect-square` | `aspect-ratio: 1 / 1` — used for tiles and D-pad buttons so they stay square at any width |
| `aspect-[5/4]` | arbitrary aspect ratio (5:4) — the game grid's overall shape |

## Spacing

| Class | Effect |
| --- | --- |
| `p-*` / `px-*` / `py-*` | padding (all sides / horizontal / vertical) |
| `m-*` / `mx-auto` / `mt-*` | margin; `mx-auto` centers a block element horizontally within its parent |

Scale used here: `0.5` = 0.125rem, `1` = 0.25rem, `2` = 0.5rem, `4` = 1rem, `6`
= 1.5rem. So `px-4 py-2` = 1rem horizontal / 0.5rem vertical padding.

## Typography

| Class | Effect |
| --- | --- |
| `text-sm` / `text-base` / `text-lg` / `text-xl` / `text-2xl` / `text-3xl` | font-size scale |
| `text-[0.55rem]` / `text-[0.65rem]` | arbitrary font-size values (smaller than Tailwind's smallest preset, used for tiny tile labels) |
| `font-semibold` / `font-bold` / `font-extrabold` | font-weight |
| `uppercase` | text-transform |
| `tracking-tight` / `tracking-wide` | letter-spacing |
| `leading-tight` | line-height, tightened (used where labels wrap in a small space) |
| `truncate` | single-line ellipsis overflow (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`) |
| `text-center` | text-align |

## Colors

This project uses Tailwind's `slate` (neutral dark UI), `emerald` (success /
correct / primary action), `rose` (error / wrong), and `amber` (highlight)
color scales. Each color has numbered shades (50 = lightest, 950 = darkest).

| Class | Effect |
| --- | --- |
| `bg-slate-900` | page background (dark) |
| `bg-slate-800` | panel background (prompt banner) |
| `bg-slate-950/80` | background color at 80% opacity (the `/80` suffix sets alpha) — used for the darkened game-over overlay |
| `text-slate-50` / `text-slate-100` | near-white text on dark backgrounds |
| `text-slate-400` | dimmed/secondary text (the "use arrow keys" hint) |
| `bg-emerald-600` | primary button / correct-tile background |
| `hover:bg-emerald-500` | lighter shade on hover (buttons) |
| `active:bg-emerald-500` / `active:bg-slate-600` | shade shown while a touch button is pressed |
| `text-emerald-400` | "Nice!" feedback message color |
| `text-rose-400` | wrong-answer feedback message color |
| `text-amber-200` | word label under the monster |
| `border-emerald-600/50` | border color at 50% opacity |
| `bg-emerald-800/40` | tile background tint at 40% opacity |

Colors and opacity modifiers compose as `{property}-{color}-{shade}/{alpha}`,
e.g. `bg-slate-950/80` = slate-950 background at 80% opacity. This is how
`WordTile.vue` gets its translucent tint without a separate opacity utility.

## Borders & radius

| Class | Effect |
| --- | --- |
| `border` | `border-width: 1px` |
| `rounded` | small border-radius |
| `rounded-md` | medium border-radius |
| `rounded-lg` | large border-radius |

## Effects & transitions

| Class | Effect |
| --- | --- |
| `opacity-0` | fully transparent (used on `WordTile.vue` when `tile.eaten` is true, so eating a tile fades it out rather than yanking it away) |
| `pointer-events-none` | element ignores clicks/taps — used on `PlayerMonster`/`GameEnemy` overlays so they don't block taps meant for the tile underneath |
| `select-none` | disable text selection (prevents accidental text highlighting when tapping/swiping the game board) |
| `transition-all` | animate all animatable properties that change |
| `transition-opacity` | animate only `opacity` changes |
| `duration-150` / `duration-200` / `duration-300` | transition duration in milliseconds |
| `ease-out` / `ease-linear` | transition timing function |

`transition-* duration-* ease-*` always go together: `transition-*` says
*what* to animate, `duration-*` says *how long*, `ease-*` says *what curve*.
Omitting `duration-*` falls back to Tailwind's default (150ms), which is why
some elements only specify `transition-all` with no explicit duration.

## Interactivity variants

| Prefix | Applies when |
| --- | --- |
| `hover:` | pointer is over the element (desktop) |
| `active:` | element is being pressed/clicked — this project prefers `active:` over `hover:` for the on-screen D-pad since touch devices don't have hover |

## Responsive prefixes

Tailwind is mobile-first: unprefixed classes apply at all sizes, and a
breakpoint prefix (`sm:`, `md:`, ...) overrides them starting at that width
and up. This project only uses `sm:` (640px and up), reflecting the
mobile-first layout called for in `CLAUDE.md`.

| Class | Effect |
| --- | --- |
| `sm:text-lg` / `sm:text-3xl` | larger text once the viewport is ≥640px |
| `sm:h-6` | taller element at `sm` |
| `sm:block` | show an element (the keyboard hint) only at `sm` and up — it's `hidden` by default since touch devices don't have arrow keys |
| `sm:hidden` | hide an element (the D-pad in `TouchControls.vue`) at `sm` and up — desktop uses keyboard controls instead |

`hidden`/`sm:block` and `block`/`sm:hidden` are the two patterns this project
uses to show *different* controls to touch vs. keyboard users, rather than
showing both at once.

## Misc / accessibility

| Class | Effect |
| --- | --- |
| `aria-label` | not a Tailwind class, but shows up alongside these utilities throughout — used on icon-only buttons (D-pad arrows, EAT button) and the lives display so screen readers get a text label where the visible content is an emoji/symbol |

## Arbitrary values

Square-bracket syntax (`text-[0.55rem]`, `aspect-[5/4]`) lets you use a
one-off value outside Tailwind's default scale without editing a config
file. Reach for a preset class (`text-sm`) first; use arbitrary values only
when the preset scale genuinely doesn't have what you need, as this project
does for the small tile labels and the grid's aspect ratio.
