# dope.security — parallax recreation

A single-page recreation of [dope.security](https://dope.security): midnight-terminal canvas, one violet signal, Whyte Inktrap + GrandSlang + mono-stamp typography, and the site's full scroll choreography (scroll-linked hero video, pinned Gen 1→3 horizontal scroller, stopover transition, CISO card deck, drifting coordinates).

Built with Next.js 16 (App Router) and plain CSS. No UI library, no animation library — the scroll engine is ~80 lines of `requestAnimationFrame`.

---

## Requirements

- Node.js 20.9+ (developed on Node 24)
- npm 10+

## Getting started

```bash
# 1. install dependencies
npm install

# 2. run the dev server
npm run dev
```

Open <http://localhost:3000>.

If port 3000 is already taken by another project, pick a free port:

```bash
npm run dev -- -p 3111     # http://localhost:3111
```

## Production build

```bash
npm run build     # compiles + type-checks, output in .next/
npm start         # serves the build on http://localhost:3000
```

Use `npm start -- -p 3111` for a different port.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (fails on TypeScript errors) |
| `npm start` | Serve the production build |
| `node scripts/fetch-media.mjs` | Re-download fonts and media from the live CDN |

## Project structure

```
app/
  layout.tsx        Root layout — loads the 3 fonts via next/font/local, sets metadata
  page.tsx          Page composition (section order)
  globals.css       Every style: design tokens first, then one block per section
  fonts/            Whyte Inktrap (300/400/500/700), Whyte Mono, GrandSlang Roman + Italic
  icon.png          Favicon
components/
  Chrome.tsx        Fixed frosted nav + fixed coordinate strip (drifting GPS)
  Hero.tsx          Video hero, boarding-pass ticket, scroll-linked parallax
  Features.tsx      Stamped "FEATURES" heading + 8 outlined rows with scramble-in
  GenScroller.tsx   Pinned 5-panel horizontal scroller (Gen 1 → Gen 3)
  Stopover.tsx      Pinned image/bloom crossfade into "Fly Direct."
  Testimonials.tsx  CISO card deck + marquee
  Passion.tsx       "Dope is passion" display + first-class-experience copy
  Trilogy.tsx       Tabbed product UI with floating app chips
  Compare.tsx       4-up competitor rail on a route line
  TrialCta.tsx      Production-trial CTA
  Footer.tsx        Coordinate footer, link columns, SOC 2 badge
lib/
  scroll.ts         useViewProgress() — the only scroll math in the app
public/media/       Mirrored video, images, SVG art (≈12 MB)
scripts/
  fetch-media.mjs   Re-downloads all mirrored assets
```

## How the scroll works

All scroll-driven movement goes through one hook in `lib/scroll.ts`:

```ts
useViewProgress(ref, (p) => { /* p: 0 → 1 */ }, "view" | "pin");
```

- `"view"` — `p` goes 0 → 1 as the element travels from the bottom of the viewport to the top. Used by the hero, features, trilogy, compare.
- `"pin"` — `p` goes 0 → 1 while a sticky stage is pinned. Used by the Gen scroller, stopover, and CISO deck.

Components write the value into a CSS custom property (`--p`, `--hy`, …) and CSS does the rest, so no React re-render happens on scroll. The Gen scroller additionally maps `p` through a hold-and-travel curve so each panel dwells before sliding.

One singleton rAF loop and one passive scroll listener serve every section.

## Responsive & accessibility

- Below 900px the pinned sections un-pin into vertical stacks; the CISO deck becomes a horizontal scroll-snap carousel.
- `prefers-reduced-motion: reduce` disables every animation and collapses pinned sections into plain readable stacks. Nothing is left at `opacity: 0`.
- All interactive elements are real links/buttons and keyboard focusable. Hover states also fire on `:focus-visible` where it matters.

## Editing content

- **Copy** lives in the component files (each section keeps its data in a small array at the top, e.g. `ROWS` in `Features.tsx`, `CARDS` in `Compare.tsx`).
- **Colors, radii, spacing, type scale** are CSS custom properties at the top of `app/globals.css`. Change them there, not per-section.
- **Section order** is the JSX order in `app/page.tsx`.

## Assets & licensing

Fonts (Whyte Inktrap, Whyte Inktrap Mono, GrandSlang) and imagery/video are mirrored from the live dope.security CDN into this repo for a personal/portfolio recreation. They are **not** licensed for redistribution or commercial use.

To use open substitutes instead, replace the three `localFont` calls in `app/layout.tsx` with `next/font/google` (e.g. `Inter_Tight`, `Instrument_Serif`, `JetBrains_Mono`) and keep the CSS variable names `--font-whyte` / `--font-mono` / `--font-slang` unchanged — no other file needs to change.

If any mirrored asset URL stops working, re-run `node scripts/fetch-media.mjs` after updating the URLs in that script from the current live page.

## Notes

- Internal routes linked in the page (`/vs/*`, `/our-story`, `/dope-swg`, …) are not part of this build; they 404 by design. External links point at the real dope.security pages and trial endpoints.
- The hero and Gen videos are muted, inline, and loop automatically. If a browser blocks autoplay, the poster frame remains and the layout is unaffected.
