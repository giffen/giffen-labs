---
title: The Scoring Was the Bug
date: '2026-10-30'
specimens: [automatic-pocket]
excerpt: Automatic Pocket started as a drummer trainer that never really worked. In October I turned it into a bass app. It took a week of evenings, one note that registered seven times, a Bluetooth amp that kept falling behind, and a scoring system that said I couldn't play. The fix for that last one wasn't better DSP. It was a different game.
---

In February I had Claude Code build [Automatic Pocket](/specimens/automatic-pocket), a timing trainer for drummers, in one evening from a 375-line brief. I wrote it up as a story about agentic AI, and the story was true. The app was a different matter. On a real iPhone the audio jittered and it couldn't reliably hear a drum hit. A native Swift rewrite in the summer got it onto TestFlight, and then I stopped opening it.

In October I turned it into a bass app. This is how that went, including the week I was fairly sure I was a bad bassist and it turned out the app was wrong.

## Why bass

I'm learning bass. Most evenings I run scales over a 4/4 drum track, and there's a specific pleasure in feeling locked into the beat. What I didn't have was any way to know whether I was actually locked in, or just felt like it.

The first idea was the obvious one: plug the bass into the phone. That means a patch cable, a USB interface and probably a dongle, because Bluetooth can't carry a live instrument signal without lag. That's a lot of gear between someone and the first useful minute of the app. So the constraint became the design. The drums play in your headphones, your bass plays through your amp or unplugged, and the phone's microphone listens.

The other thing that changed was me. I'm on a Mac with Xcode now. The bass version is native Swift with no third-party dependencies, and on the first night I told Claude: "I'm going to bed, so don't ask me any more questions and just build until you're done. Make sensible decisions." In the morning there was an app.

By the third evening I was playing along to it, and it was fun. The drums cut out for a few bars so you have to hold the time yourself, and the metrics afterwards are the part I kept coming back to. I asked for a design pass to make it look like something people would pay for. It came back as "Late session": a navy room, ivory for anything lit, and timing colours taken from vintage bass finishes (Seafoam for locked in, Sunburst for close, Fiesta for off), with an analog needle meter in the middle like a tuner for your timing.

I also asked whether Suno could make the drum tracks. Claude talked me out of it: Suno gives you a full mix with no exact hit times and murky rights, and this app needs to know where every kick lands to the sample. The app uses a recorded acoustic kit instead, DRSKit by the DrumGizmo team and Jes Eiler of DRSDrums, licensed CC BY 4.0.

Then I started testing it with a real bass, and it got harder.

## Problem one: one pluck, seven notes

The first time I calibrated and played properly, holding a single note registered somewhere between three and seven notes.

The synthetic tests had never shown this, because synthetic basses don't have fingers. On the first device recordings, 12 to 20 percent of the "notes" the app scored weren't notes at all. They were finger noise on a string that was still ringing, fret buzz, and the click of muting a note. All three are short, bright transients, which is exactly what the detector was built to find.

Claude went through a list of ways to tell them apart, measuring each against my recordings: spectral masking, the level of the high-frequency burst, spectral flux in the bass band alone, energy rise alone. None of them separated the two cleanly. What worked was patience. Each candidate note now waits about 45 milliseconds and checks what the bass band (40 Hz to 1 kHz) did:

- It dropped by 6 dB or more: that's a mute, not a note.
- It barely moved and the transient was small: that's noise on a ringing string.
- Otherwise: a note.

On a 24-second clip of me playing, that keeps all 32 clear plucks and throws out 11 of the 14 impostors.

The phantom notes also gave me a feature idea. They were telling me something real about my playing: whether my strings were ringing when they shouldn't. That's going to be a muting trainer after launch. There's a wrinkle, though. About a fifth of those phantoms were me muting *correctly*, which is good technique. A sound alone can't tell a sloppy ring from an intended one, so a muting trainer has to know how long each note was supposed to be. That's for later.

## Problem two: the drums kept getting later

I practise through a NUX Mighty Plug Pro, a little headphone amp that plugs into the bass, with the drums coming in over Bluetooth. My timing seemed to drift late over every session. The obvious explanation was me.

The way to find out was to take me out of it. I held an earbud against the phone's mic, pressed start, and didn't play. The app measured when each drum hit actually arrived. Over Bluetooth, the delay grew by about 0.89 ms every second from the start of the stream and levelled off around 65 ms late after about 75 seconds. It reset whenever the stream restarted. Plugged directly into the phone, it stayed flat to within a millisecond.

The obvious fix is to measure that curve and subtract it. That doesn't work, because the size of the climb changed from session to session (+31 ms in one, +65 ms in another), so a stored curve would over-correct as often as it helped. So the fix is honesty. Bluetooth calibration now runs for about 20 seconds and fits a trend line. If the delay grows by 10 ms a minute or more, the app says so: in Audio setup, on Home, and on the results screen, where it tells you to take the score with a grain of salt. AirPods drifted 1.7 ms a minute, which is fine.

Wired is perfect. But as I told Claude, nobody's going to buy a dongle for this app. Most people will use what they already have, so the app has to tell you when your gear is lying to you.

(A smaller one in the same vein: I couldn't calibrate with an AirPod in my ear, because turning it up loud enough for the mic to hear meant turning it up loud enough to hurt. Calibration now tells you to take the earbud out and hold it against the phone.)

## Problem three: the scoring didn't work

A week in, playing along with the drums was a lot of fun. The scoring wasn't. My best take scored 39 out of 100.

Claude's first read was that I was rushing by 10 to 24 milliseconds. Before arguing, we checked the measurement. A wired no-play test scored the drums to within a millisecond, so the app was measuring correctly. My notes really did vary by 20 to 33 ms, even on plain quarter notes.

Then Claude rendered one of my takes against the drums so I could hear it. I'm a beginner, so I was ready to believe it. But I didn't think I was that far off the kick. What I said was: "How much is a millisecond anyway?" The answer turned out to matter. Musicians routinely play 10 to 30 ms ahead of the beat (researchers call it negative mean asynchrony), with about 20 ms of spread, and that's close to the threshold where you can even hear which of two sounds came first. A grade that calls normal human timing sloppy isn't strict. It's wrong.

The second problem was structural. The app had an "Auto" mode that guessed, bar by bar, whether I was playing quarters, eighths, sixteenths or triplets, and scored every note against that guess. When I played a late quarter note, it sometimes decided I'd played an early sixteenth. Claude prototyped a way to score consistency against my own repeated riff instead, and it moved scores by about five points either way. Not worth building.

So the measurement was fine. Two things were broken: the app had to guess what I meant to play, and the grade was too harsh for people.

## The fix was a different game

The next day I noticed something on the groove picker. Every groove already shows its pattern, kick drums included. So I asked: what if the rule is just *play a bass note on every kick*? It makes it a game. And it's what bass players actually do with a drummer.

Nothing has to be guessed anymore. The groove knows where the kicks are. Your kick note is whichever note lands closest to each kick, and everything else you play is free. When Claude laid out the design, I added one rule: "Don't penalize extra notes. It's not the way." You can walk a line between kicks, play a fill, come back to the kick, and the app only cares about the kick.

The grade changed too. Your lean (the median of where you land against each kick) is free up to 25 ms at the default setting. Only the spread around your own spot is scored. We tuned it against my real takes: I said my best one should be closer to 70, and it now scores 70.0. My other three went from 28, 29 and 30 to 67, 63 and 58. Those four takes are test fixtures now, so a future change can't quietly undo the grading.

Then I made the call: "Kick scoring is the app now. Auto gets you nothing." Auto mode, the fixed note grids and the speaker-only scoring all came out. Scored sessions now require headphones, because on the speaker the phone's own kick drum covers the note it's asking you to play. And every screen works in landscape, because when I plug in USB I end up turning the phone sideways.

I want to be honest about what that tuning means. The grade is calibrated against one bassist: me, a beginner. My best take scores 70 because that's what it sounded like to me. That's a reasonable starting point and an obvious failure mode, and the fix is other bassists' recordings.

The last thing I added was no score at all. Some evenings I just want to put on the drums and play. So there's a Just drums button next to Start: the groove plays, nothing listens and nothing is scored, so unlike a scored session it works on the phone speaker.

## What the model did, and what I did

The drummer version died on the things that are genuinely hard for one person working in the evenings: sample-accurate audio on a real phone, hearing an instrument through a phone mic, Xcode. This time Claude Opus 5.5, running in Claude Code, handled all of it: the spectral-flux detector, the note confirmation, the latency investigation, the needle meter, and more than 90 automated tests. It ran the experiments that ruled ideas out, including its own first diagnosis.

The most useful thing it built wasn't a feature. It was the recordings. Every session can save the raw mic audio along with a log of everything the app knew: every drum hit, every note it detected, and why it kept or rejected each one. A separate checker script finds the attacks in the audio independently and reports where the app disagrees. That turned my evenings into a loop. I'd play, Claude would pull the recording off my phone, and by the next session the detector would be better. In February the highest-leverage input was the brief. In October it was the recordings.

What the model couldn't do was know the scoring was wrong. The numbers said I was rushing, and my ears said I wasn't. The fix wasn't better signal processing. It was a different game, and that came from playing the thing every night with a bass in my hands. The frontier models took the build off my plate. What's left is taste and testing, and you can't do either without the instrument.

## Where it stands

The bass version is on TestFlight. It isn't on the App Store yet. The App Store listing is written. Before launch it still needs one more on-device pass, an iPad layout and a price. Claude's recommendation is free to try with a one-time unlock somewhere around $7 to $10. I haven't decided.

After launch, the first big addition is a jam mode. I've been improvising with a band, and I want to pick a key and a chord progression and just play over drums and keys, with no score. iReal Pro already owns jamming over changes, so if I build it, it has to sound as good as the drums do.

For now it's the kick game, a needle, and me most evenings, trying to get my best take past 70.
