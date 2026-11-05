---
title: If She's Going to Watch AI Anyway
date: '2026-11-05'
specimens: [once-upon-a-routine]
excerpt: My daughter watches a song while she brushes her teeth, and a lot of what YouTube offered was bad AI video. Pictures buried under bubbles, songs that went on forever, weird images, bad sound. So we made her one. Her favourite princesses, our dog, and a song written for the job.
---

My daughter watches a song on YouTube while she brushes her teeth. For a while, a lot of what she was watching was bad AI video.

We'd gone looking for brushing songs, and the quality was all over the place:

- Some were a picture buried under bubbles that get brushed away as the song plays.
- Some went on far too long for a kid standing at a sink.
- A lot were plainly AI, and not the good kind: weird images and bad sound.

The obvious move is to keep her away from it. We went the other way. If she was going to watch AI anyway, it might as well be made around what she likes.

So I made her a channel: [Once Upon a Routine](/specimens/once-upon-a-routine), storybook songs for the routines in a kid's day, starting with teeth.

## She picked the cast

She loves all princesses, so there are princesses. The first video has two: Lilah, with auburn pigtails and a sunflower crown, and Elara, in icy blue with a snowflake tiara. The second adds Lily, a nature princess, and Marina, a sea-farer, and one character who isn't a princess at all. Coco is our dog.

Each character starts as a character sheet that Gemini draws from one fixed prompt. Dreamina then redraws it as a clean front, three-quarter and profile sheet, and every shot that character appears in uses it as a reference.

<figure>
  <img src="/images/journal/once-upon-a-routine-coco-sheet.webp" alt="A character sheet of Coco, a black-and-tan dog in a red paw-print bandana, drawn from the front, three-quarter and side in a soft storybook style." />
  <figcaption>Coco's character sheet. Every shot he's in starts from this.</figcaption>
</figure>

## Suno is the star

The best part of the whole thing is the music. Suno does an amazing job. Brush Your Teeth is a bouncy 100 BPM song that walks through every step: a tiny bit of toothpaste, open wide, top teeth, bottom, back, front, tongue, a countdown, then spit and show off your smile.

The first take had one problem. It only had 62 seconds of actual brushing, about half the two minutes dentists recommend. Suno can extend a song from any point, so I extended it from just after "brushing time is so much fun" and got another verse, a chorus and a countdown. Everything before that point stayed identical, so none of the shots already cut to it were wasted. Brushing now runs about 80 seconds. Better, but still not two minutes.

## The animation is good, and still AI

The pictures come from Seedance, running in Dreamina. Every shot starts from a still drawn against the character sheets and a picture of the empty room, so the bathroom stays the same bathroom from shot to shot. Every cut lands on the beat.

It looks good. It's also still AI, and a lot of the weirdness gets caught before it gets anywhere near her:

- **Coco came back as a brown puppy.** Coco is black and tan.
- **Princesses cloned themselves.** A character sheet shows each girl three times, and the model sometimes takes that literally. One shot of the walk to bed had two Marinas. Keyframe prompts now state how many people are in the frame, which fixed it.
- **Hands and props are where it falls apart.** Toothbrushes go through cheeks and foam turns strange. Those shots get re-rolled, not rescued.
- **One take had a princess spit on the floor.**
- **Singing is the least reliable thing it does.** The princesses only sing in shots where nobody has a toothbrush in their mouth. One sing-along shot failed three times and became a smile shot instead.

<figure>
  <img src="/images/journal/once-upon-a-routine-brown-puppy.webp" alt="Two princesses brushing their teeth at a palace sink at night, with a small brown puppy sitting on the bath mat where a black-and-tan dog should be." />
  <figcaption>Take one of Coco. He's not brown.</figcaption>
</figure>

<figure>
  <img src="/images/journal/once-upon-a-routine-two-marinas.webp" alt="A storybook bedroom at night. A black-and-tan dog leads three girls to bed, and two of them are the same curly-haired princess in the same sea-green dress." />
  <figcaption>One princess too many.</figcaption>
</figure>

Some of it still gets through. And every stage of it costs money: Dreamina charges in credits, and a clip costs 50 of them for every 5 seconds of video. One night of work on the second video spent 894 credits, 780 of them on twelve clips. So nothing gets generated without a price and a yes first.

## The camera is the mirror

One rule shaped every shot: the camera is the mirror. The princesses stand at the sink facing the viewer, the way she faces her own mirror. When they open wide, she's looking straight at them doing it.

<figure>
  <img src="/images/journal/once-upon-a-routine-open-wide.webp" alt="Princess Elara, in an icy-blue dress and snowflake tiara, faces the viewer with her mouth open wide and her toothbrush ready." />
  <figcaption>"Open up big and wide, as wide as can be."</figcaption>
</figure>

It works. She sings the song. She stamps her feet along with the animation. And she follows along a lot more than she did with anything we found on YouTube: when they open wide, she opens wide.

## The storybook

Every video opens on the same closed storybook with the channel name on the cover. It pops open, the video's first frame fades onto the page and the camera dives in. It ends the same way in reverse, on the cover with Like and Subscribe.

Part of that is for her, so she knows when brushing starts and when she's done. Part of it is YouTube. Videos marked Made for Kids lose end screens, cards and comments, so anything you want to say at the end has to be in the video itself.

## What it took

I didn't build the pipeline by hand. Claude Code wrote it with me: Python scripts that map the song's beats, check every cut lands on one, generate stills and clips through Dreamina's command line, and assemble the final video with the Suno master on top. Captions and two thumbnails for an A/B test come out of the same scripts. How it all fits together is on the [specimen page](/specimens/once-upon-a-routine).

| | Brush Your Teeth | Bedtime Brush |
|---|---|---|
| Song | Bouncy, 100 BPM | Lullaby, 69 BPM |
| Shots | 25 | 26 |
| Brushing | About 80 seconds | 69 seconds, on purpose |
| Length with the storybook | 2:24 | 2:46 |
| Cast | Lilah, Elara | Lily, Marina, Coco |

YouTube asks on every upload whether AI made the music. It did, so the answer is yes, and the video carries the label.

## Next

[Brush Your Teeth](https://youtu.be/DJ49dyhjk6E) went up on November 4. Bedtime Brush is finished: a slow lullaby where Lily and Marina brush by moonlight, then Coco walks them off to bed and turns out to be the first one asleep. It's next on the channel.

After that, the channel grows with her: getting dressed, tidying up, bath time.

It's still AI. The difference is that it's hers.
