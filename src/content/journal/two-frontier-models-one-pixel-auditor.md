---
title: Two Frontier Models, One Pixel Auditor
date: '2026-10-06'
excerpt: I pointed the newest models from OpenAI and Anthropic at the same game, a retro EHS audit RPG, and let them build, test and critique each other's work. What they were good at, where they failed, and what I'd do differently.
---

Audit Quest was already finished. Eight facilities, 110 encounters, a tileset renderer I'd [rebuilt after writing it off](/specimens/audit-quest). Then I got access to the newest models from both labs and wanted to know what they'd do with something real, not a benchmark.

So I ran an experiment on a project I care about. OpenAI's Codex (the logs say `gpt-6-astra`, with `gpt-5.6-sol` and `gpt-5.5` showing up around the edges) took the polish pass. Claude Sonnet 5 had done the earlier tileset and world-life work, and during this stretch it ran QA agents. Here's what happened, including the parts that didn't go well.

## The setup

My brief to Codex was one sentence: take it to the next level in polish, graphics and sound, with a Super Nintendo Pokémon vibe.

Its first message back, after poking at the running game in a browser, was a good diagnosis: the foundation was fine, and the real gap was cohesion. Dialogue windows, menus, exploration feedback and music all felt like separate decisions rather than one cartridge game.

Then it went and did a lot. Cream-and-indigo RPG windows, sprite portraits, clipboard markers on inspectable objects, a minimap, touch controls, reduced-motion support. A new original title theme, distinct sound cues for every kind of interaction, all synthesized live in Web Audio with no audio files. Floor materials, wall palettes and baked shadows across all eight facilities.

That's an enormous amount of surface area for one session, and it's the first thing worth saying: **the speed is real**. The second thing is what the speed costs.

## What it broke

After the first pass I couldn't get into a facility. I told Codex so. It reasoned (sensibly) that the new height-constrained game frame was pushing buttons out of reach on small screens, fixed that, and I still couldn't get in.

It asked which browser I was using. Firefox, blank screen. That was the actual clue. The new music fade called `AudioParam.cancelAndHoldAtTime`, which Firefox doesn't implement, and the exception unmounted the entire game during a screen transition. Nothing to do with layout.

Two lessons I'll keep:

1. **Name the browser in the bug report.** The model's first theory was plausible and wrong, and one question fixed it.
2. **Its tests had to be able to fail the way mine did.** Its first entry tests passed because they navigated before music started, accidentally bypassing the crash. The fix included making the tests wait for non-silent audio, then adding Firefox and a deliberately-broken-audio variant. A green test that can't see the bug is worse than no test.

## The thing I told it not to lose

My second instruction mattered more than the first: *remember it's still an EHS audit game. Don't lose that to Pokémon.*

Codex generated a pixel-art "cozy town at golden dusk" title background. It was gorgeous and completely wrong for the game. It kept the image as an unused asset and shipped the original industrial, global title art, and its notes say that's why. I didn't have to talk it out of anything. Giving the model the constraint that defines the product, once, in plain language, held for the rest of the session.

## Using the models to review each other's work

I asked for a full playthrough with end states and notes, including content from an EHS perspective. In parallel, I had Claude spin up three QA agents: one per facility, one on encounter copy, one on game flow.

The two reviews found very different things.

**Claude's agents were strong on the data layer.** Breadth-first search confirmed every walkable tile was reachable and every encounter trigger sat on a reachable tile. They found a duplicate ID and six encounters whose explanation named a category that contradicted the correct one.

They were also honest about what they couldn't conclude. Mid-run they reported that someone was live-editing core files in the same repo, which invalidated the live gameplay checks, and said so rather than papering over it. (They attributed the edits to another Claude session. Going by the timestamps, it was Codex.) Then the session hit a usage limit before the later facilities were tested.

**Codex's review went somewhere Claude's didn't.** It completed Story Mode in Firefox: all eight facilities, 110 inspections, 650 credibility, 1,100 points. It also lost on purpose, tested retry, and labelled its synthetic test fixtures as synthetic in the filenames. It called its own run "answer-key-assisted automated play, not a blind human playtest." I trust a report that opens by listing its own limits.

Then it did what my Claude setup had deliberately not done: it questioned the content. A handful of the explanations in the answer key stated rules more broadly or more confidently than the real regulation supports. It linked primary sources for each and proposed revisions. It also found that the final report was grouping mistakes by the category the player *chose* rather than the category that was right, so numbers didn't add up.

Why didn't Claude catch the content issues? Partly my fault. My project notes told it the encounter content was vetted and final, so it checked internal consistency and stopped there. That instruction was a reasonable thing to write and a blind spot to leave in place. **Memory and instructions steer a model, and they also fence it in.** If you want an independent review, give the reviewer a context that hasn't been told what's off-limits.

## What I'd actually recommend

After a few weeks of this, my working rules:

- **Give each model a job whose failure mode the other catches.** One built fast and broke Firefox. The other mapped data thoroughly and stayed inside its brief. Neither review was sufficient alone.
- **Never let two agents edit one working tree.** The Claude QA agents tested a moving target for hours. Use branches or worktrees. I know this and still got burned.
- **Tests are the handoff.** What carried over between models and sessions wasn't summaries, it was Playwright scripts: `test:entry`, `test:gameplay`, `test:scene`. A later model can run them without trusting an earlier model's account of what works.
- **Ask for evidence labels.** "Real run" versus "synthetic fixture" versus "not tested" was the most useful formatting convention in either review.
- **Fix the cheap criticism, defer the expensive one.** Both models were happy to list more work than I'd ever do. The high-priority items (wrong rules, broken reports, dead-end end states) got fixed the same day. Save games and rebalanced ranks got written down and left. One facility's encounter images 404ing in production got fixed a few days later, once I'd decided it was real enough to fix.
- **Check the access path early.** Getting the newest model working in Codex took me several false starts: an upgrade that wouldn't take, an uninstall, a cache clean. Do it before you plan the afternoon around it.

## What I'm not claiming

This isn't a benchmark. It's one game, one person, a few sessions, with different tools wrapped around different models, so I can't tell you how much of each result is the model and how much is the harness. I also haven't had qualified EHS reviewers go over the corrected content, and the review itself says as much: a risk-based pass, not a certification.

What I can say is narrower and more useful. A good-enough model will happily build you a lot of game, and a different one, pointed at the result with a skeptical brief, will find a surprising amount that's wrong. The workflow that worked wasn't picking a winner. It was making them argue.
