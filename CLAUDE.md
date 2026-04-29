# giffenlabs.ca

Astro 5 + Tailwind v4 static site. Personal field guide for Andrew Giffen.

## Site Purpose

This is the *opposite* of giffen.me. No executive positioning. No hiring
narrative. A field-guide-style catalogue of the apps, prototypes, and
writing that exist outside the CTPO story.

If something would impress a Series-A founder hiring a CTPO → it goes
on giffen.me. If it's a builder-for-builders artifact → it lives here.

## Aesthetic

Natural history field guide. Aged parchment, ink illustration,
taxonomic structure. Handmade without being precious.

- Background: `#F5F0E8` parchment, with SVG noise + warm vignette
- Ink: `#2C1810` body, `#5C3317` bark accent, `#8B6914` ochre, `#4A6741` field green
- Headings: Playfair Display (serif). Body: Source Serif 4. Labels: IBM Plex Mono.
- Decorative corner brackets on cards (CSS `::before/::after` + bracket-bl/bracket-br spans)
- Status dots (active/in-progress/dormant/shipped) on every specimen.

Theme tokens live in `src/styles/global.css` under `@theme { ... }`
(Tailwind v4 inline theme).

## Routes

- `/` — full-viewport hero + two-column index (Specimens, Journal)
- `/specimens` — grid of specimen cards
- `/specimens/[slug]` — full-bleed hero + taxonomy table + field notes + prev/next
- `/journal` — grouped-by-month entry list
- `/journal/[slug]` — clean reading view

## Content

`src/content/specimens/*.md` and `src/content/journal/*.md`. Glob loader.
Schemas defined in `src/content.config.ts`.

Specimen frontmatter requires: `title`, `specimenNumber`, `classification`,
`habitat`, `firstObserved`, `status`, `excerpt`. Optional: `platform[]`,
`heroImage`, `images[]`, `url`.

Hero images go in `public/images/specimens/[slug]-hero.png`. If absent,
the page renders a topographic-pattern fallback with the specimen number
in oversized type. Hero is rendered framed (object-fit: contain on a
parchment mat with drop shadow), never cropped — the plates are meant
to be displayed whole, like a museum exhibit.

## House illustration style

All hero images use **Google Nano Banana 2** on Replicate
(`google/nano-banana-2`, ~$0.04 / image, ~25s). The locked prompt
template — do NOT deviate from this structure, only swap the bracketed
parts:

```
A vintage natural history field guide illustration plate on aged cream
parchment paper, drawn in dark sepia ink with watercolor wash.
[SUBJECT: cross-section / specimen / diagram of <thing>, with each
component drawn as an ink illustration and labelled in tiny handwritten
naturalist cursive with thin pointer lines]. Decorative corner brackets.
Title in spaced small caps serif at the top: <TITLE> — PLATE <N>.
Subtitle in italic serif: <one-line subtitle>. Aged paper texture,
foxing spots at edges, slight tea-stain. Color palette strict: cream
parchment background, dark brown ink, warm bark accent, ochre highlights,
occasional field green for ornamental accents. Sibley bird guide
aesthetic crossed with 18th century naturalist's notebook. Hand
illustrated, ink and watercolor wash, no digital sheen, no photograph.
```

Inputs: `aspect_ratio: "3:2"`, `output_format: "png"`. Save outputs as
`public/images/specimens/[slug]-hero.png`. Update the specimen
frontmatter `heroImage` to match.

The structure is doing the work, not luck. Every plate so far renders
on-palette with legible labels and coherent latin/cursive annotations.
Stick with the template.

## Workflow

- `npm run dev` — local dev on :4321
- `npm run build` — static output to `dist/`
- `npm run check` — astro check (TS)
- Deploy: Vercel, static.

## Notes

- Tailwind v4 plugin's vite types disagree with Astro's bundled vite.
  Cast to `any` in `astro.config.mjs` — runtime is fine.
- No analytics, no tracking, no cookie banners. Site does not explain itself.
- No about page, no contact form, no "hire me" — those belong on giffen.me.
