---
title: 'Audit Quest: Global Compliance'
specimenNumber: '11'
classification: Compliance Training Game
habitat: Browser · React + Canvas
firstObserved: '2026'
status: shipped
heroImage: /images/specimens/audit-quest-hero.png
platform:
- game
- education
- pixel-art
- ai-generated-art
- react
- canvas
- ehs
- compliance
images: []
excerpt: A retro RPG that teaches EHS compliance - one auditor, eight facilities,
  global regulations
url: https://www.giffen.me/work/audit-quest/
---

## The Problem

Onboarding new EHS (Environment, Health & Safety) auditors is dry. Regulation databases are dense, training manuals are thick, and by the time someone sits through a week of compliance briefings, their eyes have glazed over three times. The information is critical—workplace safety, chemical management, fire codes, machine guarding—but the delivery doesn't stick.

I wanted to build something that made learning Enhesa's regulatory topic headings genuinely fun. Something a new auditor could play through in an afternoon and walk away with an intuitive feel for what non-compliance looks like across different jurisdictions. A game—specifically, a retro RPG.

## The Concept

Audit Quest: Global Compliance is a Dragon Quest-meets-Street Fighter 2 mashup. You build your auditor, hop on a plane to one of eight facilities around the world, and explore top-down pixel art offices, labs, and factories. When you stumble onto a compliance issue, an encounter triggers: is this a violation? What Enhesa category does it fall under? Get it right and your credibility climbs. Get it wrong enough and your audit license gets revoked. Game over.

The eight facilities span London, Madrid, Toronto, Frankfurt, São Paulo, California, Osaka, and Shanghai—each with jurisdiction-specific regulations and escalating difficulty. Story mode enforces sequential progression; practice mode lets you tackle any facility in any order.

## The Art Style Saga

This was the hardest part of the entire project, and it had nothing to do with code. It's a story in three acts, and the first two shipped before the third one was even possible.

### Act I: The Ransom Note

I started by purchasing pixel art tileset packs. Nice ones—furniture sets, office tilesets, character sprites. The problem was consistency. Every pack had a slightly different pixel density, color palette, and perspective angle. A desk from one pack next to a chair from another looked like two different games stitched together. Worse, the packs came with shadows baked into the art, drawn for whatever room layout the artist imagined—which was never *my* room layout. Tiles and shadows just never lined up. I spent days trying to normalize everything—recoloring, resizing, cropping—and the result was always off. It looked like a ransom note made from magazine clippings.

So I threw it all out and went programmatic.

### Act II: The Rectangle Years

Every room in the game got drawn with `<canvas>` `fillRect` calls. Chunky 4-pixel blocks. No PNGs, no spritesheets, no tile catalogs. A desk was a few colored rectangles. A filing cabinet was a stack of them. The player character was a 5x10 game-pixel figure with a round head, directional eyes, and a 2-frame walk animation. It sounds primitive, but the constraint forced a cohesive art style: everything looked like it belonged together because it was all built from the same atomic unit, a 4px colored square.

That version shipped. It was charming. And an earlier version of this article confidently declared it "the only path to visual coherence."

It wasn't.

![The London reception rendered as programmatic rectangles](/images/specimens/audit-quest/before-reception.png)

### Act III: The Tileset Redemption

The rectangles kept nagging at me. Games like Stardew Valley prove tile art can be gorgeous—so why did every attempt of mine look glued together? I went back with a diagnosis instead of a mood board, and the failure turned out to have three specific causes, each with a specific fix:

1. **Mixing artists.** Two packs means two opinions about perspective, palette, and outline weight. The fix was brutal: one artist, period. Everything in the game now comes from LimeZu's Modern Interiors / Modern Office / Modern Exteriors packs—thousands of tiles, one visual voice.

2. **Baked-in shadows.** Pre-drawn shadows assume the artist's room layout, not yours. The fix: use the *shadowless* variants of every sprite, and compute all shadows at runtime. Ambient occlusion is derived from the room's walkability grid; drop shadows are derived from each sprite's alpha channel. Shadows are math, not art—so they line up with any layout by construction.

3. **Non-integer scaling.** The old packs got resized to whatever dimensions the room needed, which smears pixel art into mush. The fix: LimeZu's 16px tiles render at exactly 2x into the engine's 32px grid. Integer scaling, smoothing off, every source pixel maps to a crisp 2x2 block.

The architecture made the migration safe: the tile compositor sits in front of the old rectangle renderer as the preferred path, and any object without a sprite silently falls back to rectangles. The game was playable at every commit while coverage climbed to 100%—about 80 object types. Most came straight from the packs; the gaps got kitbashed from other themes (a hospital gas cylinder, grocery checkout counters standing in as conveyor belts) and the last 14—forklifts, stamping presses, scaffolding—were hand-drawn in LimeZu's palette so you can't tell where the pack ends and the forgeries begin.

![The same reception, rebuilt from tiles](/images/specimens/audit-quest/after-reception.png)

Same room, same data, same camera. The room JSON didn't change at all—only the renderer did.

## The Character Creator

Upgrading the rooms exposed the characters. A 5x10 blob of rectangles standing in a detailed tiled office looked like a placeholder someone forgot to replace. So the characters became proper 16-bit sprite sheets—16x32 frames, six-frame walk cycles, four directions.

That created a new problem: the character select screen showed AI-generated portraits of six premade auditors, and the in-game sprite no longer resembled any of them. Rather than chase likeness across two art pipelines, I replaced the premade roster with a character creator. Skin tone, outfit (suits and blazers through overalls and hi-vis), hair, glasses, and—because this is an EHS game—a hard hat. The creator composites LimeZu character-generator layers into a sprite sheet at runtime, and the animated preview you're looking at *is* the exact sheet the game renders. The mismatch isn't fixed; it's structurally impossible.

![The character creator, hard hat equipped](/images/specimens/audit-quest/character-creator.png)

The NPCs got the same treatment, with a bug worth confessing: the first pass assigned NPC appearances by hashing their encounter ID onto a stack of premade sheets—which included fantasy characters, so a Frankfurt machine shop was briefly staffed by what can only be described as a zombie. NPCs now compose facility-appropriate outfits from the same generator layers: suits and sweaters in the offices, overalls and hi-vis with hard hats on the industrial sites.

![Frankfurt manufacturing, staffed by actual workers](/images/specimens/audit-quest/frankfurt-npcs.png)

For assets that need more fidelity than tiles—the title screen, encounter scene illustrations, victory screens—I used AI image generation through Replicate's FLUX 1.1 Pro Ultra model and Stability AI, driven over MCP.

## What We Built

**11 game screens** forming a complete game loop:
- Title screen with AI-generated pixel art background and the Enhesa corporate logo
- Story Mode (sequential progression) and Practice Mode (any facility, any order)
- A character creator that composites your auditor—skin tone, outfit, hair, glasses, hard hat—into the actual in-game sprite sheet
- Street Fighter 2-style world map with 8 facility markers and cross-platform flag emojis
- Flight animation with jurisdiction briefing
- Top-down facility exploration with real-time movement across each facility's continuous floor
- Two-phase encounter battle system (spot the violation, then classify it)
- Facility summary with real-world fun facts for each location
- Score-dependent game over and victory screens with AI-generated art (4 tiers from "Clipboard Carrier" to "Legendary Auditor")

**8 fully playable facilities across 3 continents:**
1. London Office — corporate headquarters with server room, meeting room, kitchen
2. Madrid Data Center — cooling systems, raised floors, electrical infrastructure
3. Toronto Pharma Lab — clean rooms, chemical storage, quality control
4. Frankfurt Manufacturing Plant — heavy machinery, assembly lines, loading docks
5. São Paulo Construction Site — scaffolding, earthworks, active worksites
6. California Warehouse — distribution center, forklift operations, storage racking
7. Osaka Chemical Lab — hazmat handling, fume hoods, waste management
8. Shanghai Food Processing — cold storage, production lines, sanitation zones

Each facility has 4-5 interconnected rooms, 14 encounters, AI-generated scene illustrations, and jurisdiction-specific compliance scenarios.

**A tile-based rendering engine with a programmatic safety net:**
- Rooms bake to a static layer from LimeZu wall and floor tiles at exact 2x integer scale
- Ambient occlusion computed from the walkability grid; drop shadows computed from sprite alpha—no baked shadows anywhere
- ~80 object sprite types (desks, server racks, forklifts, fume hoods, stamping presses) with kitbashed and hand-drawn pieces filling every gap in the packs
- 16-bit character sprites composited from generator layers at runtime, shared by the player and NPCs
- Any object without a sprite falls back to the original 4px-rectangle drawers, so partial coverage was always shippable

**An IP-safe encounter system:**
- Encounters are JSON templates with `PLACEHOLDER` stubs
- Enhesa subject matter experts fill in proprietary content manually—regulations, scenario descriptions, teaching explanations
- No Enhesa IP ever touches an LLM
- Two-phase design tests both violation identification and Enhesa category classification
- 8 EHS categories cover the full Enhesa taxonomy: Fire Safety, Chemical Management, PPE, Electrical Safety, Ergonomics, Waste Management, Machine Guarding, and Permits/Signage

**A built-in map editor** so Enhesa's compliance experts can craft scenarios without touching code:
- Accessible at `/?editor`
- 6 tools with keyboard shortcuts: walkable tiles, walls, doors, encounter triggers, typed objects, and eraser
- Visual room builder with floor style picker, wall color selector, and a full object palette
- JSON export/import for sharing level designs
- This was critical: the people who know compliance best aren't developers, so the editor lets them place encounter triggers exactly where they make narrative sense

**A credibility and ranking system** with 8 auditor tiers from "Clipboard Carrier" to "Legendary Auditor," tracked in real-time on the HUD.

## How Long It Took

About two weeks of part-time work for the original game: 8 facilities, 100+ encounters, the programmatic rendering engine, AI-generated art assets, a built-in map editor, and a polished game loop with story mode progression. The tileset redemption arc—rooms, sprites, character creator, NPC wardrobe—was a later two-day sprint, verified end-to-end with scripted Playwright walkthroughs of every zone in every facility before it shipped.

Claude Code handled roughly 90% of the implementation. I drove architecture decisions, art direction, and all the iteration on visual style. The lesson that took two attempts to learn: pixel art tilesets aren't inherently incoherent—*mixing* them is. One artist, shadowless sprites, runtime shadows, and integer scaling turned the approach I'd written off into the best-looking version of the game.

## Tech Stack

- **Frontend**: Vite + React + TypeScript, fully client-side, hosted on Vercel
- **Rendering**: HTML5 Canvas compositing LimeZu 16px tilesets at 2x integer scale, with runtime-computed shadows and a programmatic `fillRect` fallback for anything without a sprite
- **Characters**: LimeZu character-generator layers composited into sprite sheets at runtime—one pipeline for the player, the creator preview, and every NPC
- **State Management**: React Context + useReducer (no external libraries)
- **AI Art Pipeline**: Replicate MCP (FLUX 1.1 Pro Ultra) + Stability AI MCP for the title screen, encounter scenes, victory/game over screens
- **Data**: Static JSON in `public/data/` for rooms, encounters, facilities, and jurisdictions
- **Editor**: Custom map editor with visual tile painting, typed object placement, and JSON export/import

## Key Challenges

1. **Art style consistency**: The single hardest problem, and it got solved twice. First by abandoning tilesets for programmatic rectangles (coherent, but flat). Then properly: single-artist tilesets, shadowless sprites with all shadows computed at runtime from the walkability grid and sprite alpha, and strict integer scaling. The original failure was never "tilesets look bad"—it was three fixable engineering problems wearing an art-direction costume.

2. **Filling the gaps in a tileset**: No pack covers stamping presses, LOTO stations, and HACCP checkpoints. Full coverage meant kitbashing sprites from unrelated themes and hand-drawing the rest in the pack's palette and outline style—close enough that the forgeries pass inspection next to the originals.

3. **Protecting proprietary content**: Enhesa's regulatory database is their product. The encounter system had to be designed so that all the scaffolding (game mechanics, UI, scoring, categories) could be built without ever seeing real content, and experts could inject it later through plain JSON editing.

4. **Making compliance fun**: The whole point collapses if it feels like a quiz with pixel art wallpaper. The RPG framing—credibility as HP, encounters as battles, ranks as levels—gives the learning loop stakes and progression that a flashcard deck can't.

5. **Cross-platform rendering**: Small things bite hard. Windows doesn't render flag emojis natively, so country flags on the world map showed up as two-letter codes on half our users' machines. Solved it with Twemoji SVGs from a CDN. Encounter data validation silently dropped scenarios with mismatched category names—25 encounters across 3 facilities were invisible until we wrote validation scripts to catch them.

## Outcome

A complete, playable EHS compliance training game. Eight facilities across three continents, each with unique environments, jurisdiction-specific regulations, and AI-generated encounter illustrations—now rendered in proper 16-bit tile art, with a character creator whose preview is pixel-identical to the sprite you play. An auditor can play through all eight in story mode, building credibility from facility to facility, and walk away with a working mental model of Enhesa's regulatory categories—without once opening a training manual.
