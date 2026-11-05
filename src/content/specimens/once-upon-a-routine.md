---
title: Once Upon a Routine
specimenNumber: '13'
classification: Storybook Song Channel
habitat: YouTube · Made for Kids
firstObserved: '2026'
status: active
heroImage: /images/specimens/v2/once-upon-a-routine.webp
platform:
- Suno
- Dreamina
- Seedance
- Seedream
- Gemini
- Python
- ffmpeg
- Claude Code
- YouTube
images: []
url: https://www.youtube.com/@OnceUponARoutine
excerpt: A YouTube channel of storybook songs for one kid's routines, starting with
  brushing teeth. Her favourite princesses and our dog, a Suno song written for the
  job, and Seedance animation cut to the beat.
---

## The Concept

My daughter watches a song on YouTube while she brushes her teeth. What YouTube had was all over the place: pictures buried under bubbles that get brushed away, songs that go on far too long, weird AI images and bad sound. If she was going to watch AI anyway, we figured it might as well be made around what she likes.

Once Upon a Routine is storybook songs for a kid's routines. Each song walks through the steps at kid speed, with a cast she picked: princesses, because she loves all princesses, and Coco, who is our dog. Every video opens and closes on the same storybook, so she knows when it starts and when she's done.

Why we did it, and how it's going, is in [If She's Going to Watch AI Anyway](/journal/if-shes-going-to-watch-ai-anyway).

## Watch It

<div class="lab-embed lab-embed--video">
  <iframe
    src="https://www.youtube-nocookie.com/embed/DJ49dyhjk6E"
    title="Brush Your Teeth Song: Once Upon a Routine"
    loading="lazy"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen
  ></iframe>
</div>

## How a Video Gets Made

- **The song comes first.** Suno sings it from written lyrics and a style prompt. A song has to be made while subscribed to Suno Pro or Premier, or it can never be monetized, and that isn't retroactive.
- **A beat map.** A script finds the song's beat grid and bars and times every lyric from the vocal stem. Every cut in the video lands on a beat.
- **One file per video.** A TOML file holds every shot: start and end, who's in it, the still and motion prompts, and whether anyone sings. A script checks every cut against the grid.
- **Characters.** Each one starts as a character sheet drawn by Gemini from a fixed prompt. Dreamina then redraws it as a clean, label-free front, three-quarter and profile sheet that every shot uses as its reference.
- **Stills, then clips.** A plate of the empty room comes first, then a keyframe per shot that uses it, so the bathroom never drifts. Stills are Seedream 4.7 at 3 credits. Each clip is Seedance 2.0 Fast at 720p, starting from its keyframe, at 50 credits per 5 seconds. It beat Seedance 2.0 Mini and 2.5 Draft in a side-by-side test.
- **Every take is kept.** A compare tool plays every take of a shot side by side over the song, so picking one is a matter of watching.
- **Assembly.** It throws away Seedance's audio, lays the Suno master on top, trims each clip to an exact frame count from absolute times so cuts never drift, blurs Dreamina's "AI" badge out of the corner and wraps it all in the storybook. A missing clip falls back to its keyframe, then to a title card, so the whole video can be watched for timing before a single clip is paid for.
- **Then captions and thumbnails.** Captions are timed to the final cut. Two thumbnails go up as a YouTube A/B test.
- **Free credits get spent too.** A background job spends Dreamina's daily free grant on whatever clips are still missing, every day, until the video is done.

Everything runs through the Dreamina Canvas command line. Nothing spends credits without a price quote and a yes first.

## Rules That Save Credits

- **The camera is a mirror.** The characters face the viewer, who copies them. Front-facing is also where Seedance lip-syncs best.
- **Lip-sync only when mouths are free.** Nobody sings with a toothbrush in their mouth, and lip-sync is the least reliable thing Seedance does. When it keeps failing, the shot becomes a smile instead.
- **Character sheets clone people.** A sheet shows each character three times, and Seedance sometimes animates two of them. Video prompts say it's one girl from three angles, and keyframe prompts state how many people are in the frame.
- **Close-ups of hands and props glitch.** Brushes go through cheeks and foam turns strange. Re-roll, don't rescue.
- **Repeated choruses reuse clips.** A chorus that comes back replays the shots it had the first time, beat for beat, so it's only generated once.

## The Storybook

YouTube turns off end screens, cards and comments on Made for Kids videos, so anything a video wants to say at the end has to be in the video itself.

Every video opens on a closed storybook on a sticker-covered bedside table, with the channel name on the cover. The clasp pops, the book opens, the video's first frame fades onto the page and the camera dives in. The ending is the same in reverse, finishing on the cover with Like and Subscribe. It adds 6.4 seconds at the start and 10.2 at the end.

<figure>
  <img src="/images/specimens/once-upon-a-routine/storybook-cover.webp" alt="A padded periwinkle storybook lying closed on a child's bedside table covered in puffy stickers, crayons, a paper crown and a mushroom night-light. The cover label reads Once Upon a Routine." />
  <figcaption>The cover every video opens on.</figcaption>
</figure>

The book cost 56 credits, once. The name is drawn on afterwards, so renaming the channel costs nothing. Dreamina's audio models only do text-to-speech, so the sound effects are synthesized: a music-box sting, whooshes, twinkles and a thump, plus the creak and rustle from the opening clip itself.

## Videos

| Video | Cast | Song | Status |
|---|---|---|---|
| Brush Your Teeth | Lilah, Elara | Bouncy, 100 BPM, 2:07 | [Published](https://youtu.be/DJ49dyhjk6E) 2026-11-04 |
| Bedtime Brush | Lily, Marina, Coco | Lullaby, 69 BPM, 2:29 | Finished, going up next |

The storybook adds 16.6 seconds to each, so they run 2:24 and 2:46.

Brush Your Teeth has about 80 seconds of brushing. The first Suno take had 62, so the song was extended from just after "brushing time is so much fun" with another verse, a chorus and a countdown. It's still short of the two minutes dentists recommend. Bedtime Brush keeps brushing to 69 seconds on purpose, so it stays short at bedtime.

## Status

Active. Two videos so far, both about teeth. The channel is meant to grow with her: getting dressed, tidying up and bath time are next.

Monetization is a long way off and has an open question. YouTube needs 1,000 subscribers and 4,000 public watch hours first. Dreamina's terms say generations are "generally provided for private, non-commercial use", and I haven't found the clause for paid plans that overrides that.

Every upload answers yes to YouTube's AI question, because Suno made the music, and the video carries the label.
