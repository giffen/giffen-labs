---
title: The Bridge Machine
date: '2026-07-06'
excerpt: I finished Throughline months ago. It was technically complete, live, and
  quietly not landing. The fix wasn't more engineering — it was changing the question
  the product asks. A note on the difference between a finished feature and a product
  that lands.
---

Three months ago I wrote up [a music graph](/journal/the-dimension-spotify-cant-measure) I'd built to explode artists into individual songs and connect them by traceable musical dimensions. That essay was about *discovery* — producer beats genre, artistic voice is the thing Spotify can't measure, your dislikes are as informative as your loves. Good findings. I stand by all of them.

What I didn't write about was what happened next, which is that I kept building it, got it to a genuinely finished state, put it online — and it just sort of sat there.

This is a note about that. Not the "here's what I learned about music" part. The "here's what I learned shipping it" part.

## What actually got built

The April version had ~70 songs I'd fingerprinted mostly by hand, one evening at a time. Since then it grew up. There are now **1,471 songs across 254 artists**, joined by ~1,950 annotated edges, and — after fighting a graph that kept fracturing into disconnected islands — it's a single connected component, so any song can reach any other.

More importantly, I stopped fingerprinting by hand. Every song now runs a pipeline: `yt-dlp` pulls the audio, Demucs splits it into four stems (drums, bass, vocals, and everything else), librosa measures each stem, and Claude Sonnet reads those numbers alongside a dimension guide and assigns all 18 values with a written rationale. The first version of that analyzer was rule-based — threshold buckets on the librosa numbers — and it was worse than useless: it collapsed the entire vocabulary to a handful of values per dimension, so every mid-tempo song looked identical. I deleted the whole rule engine and replaced it with one LLM call whose most important instruction is *abstain rather than default to the center*. That's the version that made the catalog able to grow past a hundred songs without turning to mush.

So: bigger, automated, connected, live. Technically, done.

And still not landing.

## The apology on the homepage

Here's the tell I ignored for too long. The homepage was a search box. And there was an empty-state message underneath it that *apologized* for the catalog being small.

Think about what that means. The moment you put a search box in front of someone and say "it's about music," their first move — every single time — is to type their favorite song. My catalog is fifteen hundred songs of one person's taste. So the opening interaction of the entire product failed almost every time, and I'd written a polite little paragraph to soften the failure.

I had built a demo whose first move was to start a fight with Spotify's hundred-million-track search, and then lose it, and then say sorry. In about five seconds.

The worst part is that the one thing the project could do that Spotify *structurally cannot* — take two songs and build the annotated, playable path between them — was sitting right there. As a search suggestion chip. Below the box that was busy losing.

## Changing the question

The fix wasn't a feature. It was changing the question the product asks.

A search box asks "what do you want to find?" — and for a small catalog that's a question the user almost always answers with a miss. So I stopped asking it. The homepage is now two fields: **from** and **to**. Name two songs, and Throughline plays you the shortest route between them.

That one change moves the failure mode out of the product. When *you* supply both endpoints, and both come from the catalog, there's nothing to apologize for. The question went from "find me a song" (which invites a miss) to "connect these two" (which can't produce one). Same graph, same data, same engine. Different question.

The output is the part I'm proud of. It's not a list — it's a journey that plays itself. Each song holds the screen for a beat, the reason it connects to the next one fades in, and it drifts onward. *Car → Just Like Heaven → Here's Where the Story Ends → Alison → Digital Bath → Change* — Royel Otis jangle-pop dissolving into Deftones across five hops, and every hop tells you why it earned its place. It's a music video assembled out of the graph, and it makes the reasoning — the entire point of the project — the thing you watch instead of the thing you skim.

One small engineering decision matters more than it should: the journey's timing is *decoupled* from the audio. A hop advances on its own clock, not when a track ends. That sounds minor until you've watched a live demo die because one YouTube embed hung or a browser blocked autoplay. Decoupled timing plus a one-click fallback means the story always advances, even when the audio doesn't. The difference between a demo that always runs and a demo that runs if the network is feeling generous is the whole ballgame when someone's watching over your shoulder.

## Making a journey a thing you can send

The last piece was letting a journey leave the tab. Every one now has a permalink — `throughline.giffen.me/j/{from}/{to}` — that boots straight into the player. And because link unfurlers don't run JavaScript, a paste into Slack or iMessage would normally just show a bare URL. So a server route renders the Open Graph tags *and* draws a 1200×630 preview card on the fly — the two endpoints, the hop count, the first reason, the tagline — with Pillow, no headless browser, so it renders anywhere the app runs.

Now a journey you build is a card you can send. That's the difference between a thing you demo once and a thing that travels.

## The lesson I keep re-learning

None of this was hard to build. The journey player, the reframed homepage, the share cards — a few days of work, and most of it wiring together pieces the project already had. The pathfinding query existed. The edge annotations existed. The playback existed. I just kept them pointed at the wrong question.

The thing that was actually broken couldn't be found in the code, because it wasn't in the code. The product was feature-complete and mis-framed, and those look completely different from the inside. When something you built isn't landing, the instinct is to add — another feature, more catalog, better polish. I spent real time on a security-and-accessibility cleanup pass that was genuinely good work and did absolutely nothing to make the thing take off, because take-off was never gated on any of it.

What it was gated on was the first question the interface asks. I had a product that could do something no one else can do, and I was hiding it behind a question that made it look like a worse version of something everyone already has.

That generalizes past this toy. A feature-complete thing that isn't landing usually has a positioning bug, not an engineering one — and positioning bugs are invisible to the person who built the thing, because they're standing inside the frame. The move is to ask what question your interface forces on the user in the first five seconds, and whether that question is one your product is actually good at answering.

Throughline is [live](https://throughline.giffen.me). Name two songs you'd never think to connect and watch it find the line between them. It finally does the thing it was always supposed to: it turns "here's more music" into "here's *why*." It just took me a while to stop asking the wrong question first.
