---
title: Automatic Pocket
specimenNumber: '05'
classification: Drum Machine for Bassists
habitat: iPhone, iPad · App Store
firstObserved: '2026'
status: active
heroImage: /images/specimens/v2/automatic-pocket-bass.webp
platform:
- iOS
- Swift
- SwiftUI
- AVAudioEngine
- DSP
- Claude Code
- music-tech
images: []
excerpt: A drum machine for practising bass. Pick a beat, press Play, and a drummer
  plays fills, switches the groove up and drops out so you hold the time. Scoring
  your timing is one button away. It started life as a drummer trainer that never
  quite worked.
---

## What It Is

Automatic Pocket is a drummer to practise bass with. Pick one of 36 beats, set the tempo and press Play. No microphone, no headphones, nothing to set up. It works on the phone speaker.

The drummer behaves like one. It plays a fill at the end of the phrase, switches the beat up for a section and comes back, and drops out for a few bars so you have to hold the time yourself. You can change the tempo, the beat or what the drummer's doing without stopping, and you can draw your own beats.

If you want to know how tight you are, **Score my timing** is one button on Home. Put headphones on, play a note on every kick, and an analog needle shows whether you landed early, late or on it.

## How It Got Here

This specimen has been three different animals.

In February it was a **drummer** timing trainer, built in one evening by Claude Code from a 375-line brief. The brief was good and the demo was impressive. The app wasn't good. On a real iPhone the audio jittered and it couldn't reliably hear drum hits. A native Swift rewrite over the summer got it as far as TestFlight, and then it sat in the drawer.

In October I turned it into a **bass timing trainer**. I'm a beginner bassist, and I'd been running scales over 4/4 drum tracks and wanted to know whether I was actually locked in or just felt like it. The name still fit. Nothing else made the trip, and the old React Native code is deleted. How that went, including the week the app said I couldn't play, is in [The Scoring Was the Bug](/journal/the-scoring-was-the-bug). That version, 3.0, went on the App Store on November 2.

In November it became a **drum machine**. I'd added a Just drums button for evenings I didn't want a score, and it turned into most evenings. I play longer to a drummer than to a test. Version 4.0 opens on the drums, and the scoring moved behind a button. Why is in [Less Like Practice](/journal/less-like-practice).

## The Drummer

- **36 beats** in six shelves: rock and pop, funk and soul, hip-hop and electronic, Latin and Caribbean, swing and shuffle, plus bare clicks for slow practice. Any tempo from 40 to 200. Tap a beat to hear a few bars; picking one never changes the tempo.
- **Changes without stopping.** Tempo, beat and the drummer's tricks can all change while the drums play. The new drums take over on the same beat of the same bar, about 0.12 s later.
- **Fills.** Each style has its own written fills. One lands at the end of every 4, 8 or 16 bars, half a bar or a whole one, never the same fill twice running, with a crash on the one after.
- **Switching it up.** Optionally, the drummer plays the beat as written for 8 or 16 bars, then a B section for as many, and back. B is the same beat with the time on another cymbal: hats move to the ride, a ride comes down to the hats. Five beats where the hats are the point (Disco, House, Trap, One Drop, Steppers) have a hand-written B instead. The kick can stay or get busier.
- **Drops out and drifts.** The drums cut out for a few bars, on a schedule or at random, or the drummer slowly drifts the tempo and you follow.
- **Your own beats.** A step grid with ten drums, 1, 2 or 4 bars, straight 16ths or triplets, swing, and ghost, normal or accent hits. It loops while you draw. Press and hold a built-in beat to start from a copy.
- **The kick bar.** The kick pattern sits on screen with a line moving in time, so you can see what to lock to.

## Score My Timing

The kick game from 3.0 is still here, behind one button. The groove already knows where its kicks are, so the app never has to guess what you meant to play.

- **The rule.** Your kick note is the note closest to each kick, within 75 ms (or half the gap to the next kick, if that's shorter). Every other note is free. Fills, walking lines and ghost notes cost you nothing.
- **Lean is free, up to a point.** Players sit a little ahead of or behind the beat, often on purpose. The app takes your median offset (your lean) and lets up to 25 ms of it slide at the default Relaxed setting (15 ms at Normal, 8 ms at Tight). Only the excess counts.
- **Spread is what's scored.** How tightly your kick notes cluster around your own spot, multiplied by the share of kicks you actually played.
- **Live words.** LOCKED IN, RUSHING, DRAGGING or LOOSE, worked out from your last eight kick notes.
- **Hide the kicks.** Ear-training mode removes the kick markers from the bar, so you have to hear them.
- **Feel targets.** Push (−12 ms), Dead on, Laid back (+12 ms) or Deep (+25 ms). The scoring window centres on wherever you're aiming.
- **Practice programs.** Lock in, Hold the time, Lay back, By ear, Follow the drummer, Ghost drummer.

The results screen leads with the score, then one takeaway line ("Took 13 bars to settle in. From bar 14 on you were at ±19 ms, which scores 80."), then every kick plotted by position in the bar, the notes a listener would actually hear as off, and the whole take bar by bar. A scored take never fills or switches the beat up.

## Under the Hood

- **Native Swift and SwiftUI**, iOS 17+, with no third-party dependencies. Audio runs on `AVAudioEngine`, the DSP on Accelerate's vDSP FFT, and the charts on Swift Charts.
- **A recorded acoustic kit.** Ten voices, three of them toms, played from samples with velocity layers, so ghost notes are actually soft. The samples are [DRSKit](https://drumgizmo.org/wiki/doku.php?id=kits:drskit) by the DrumGizmo team and Jes Eiler of DRSDrums, used under CC BY 4.0. Each hit is trimmed to start within 0.3 ms of its first sample, because the drums are the timing reference.
- **Sample-accurate playback.** The app computes the timeline ahead of time. The audio thread just walks a preallocated array, with no locks and no memory allocation. A live change builds the new timeline and swaps it in on the matching beat.
- **Louder on the speaker.** Scoring runs iOS audio in measurement mode, which turns off the mic's automatic processing and costs the speaker a lot of its level. Drums on their own don't listen, so they play in the normal mode.
- **Hearing a bass through a phone mic.** Legato bass notes barely change the overall level, so the simple volume-spike detection that works for drums fails on bass. The detector looks for sudden spectral change instead: a 1024-point FFT every 2.7 ms, measured against each frequency bin's own noise floor so a quiet unplugged bass and a loud amp behave the same. Each attack is then pinned down to about 1 ms.
- **Confirming the note.** Finger noise on a ringing string, fret buzz and the click of muting a note all look like plucks to that detector. So each candidate waits about 45 ms and checks whether the bass band (40 Hz–1 kHz) actually rose. On a clip of real playing this keeps all 32 clear plucks and drops 11 of 14 impostors.
- **Latency calibration.** For each output (wired, USB-C, Bluetooth), the app plays clicks, hears them back through the mic and measures the round trip. Bluetooth calibration runs longer and fits a trend line, because some receivers add more delay the longer they play.

## Field Notes

The honest limits, as of today:

- **It's tuned to one player.** Me, a beginner. The beats, the fills and the switch-ups are what I wanted to play along to. Whether anyone else wants the same thing is the open question.
- **Detection has been verified on one bass**, mine, in quiet rooms. Amps, louder rooms and other players will need tuning.
- **The grade is calibrated against one bassist.** My best take scores about 70 at Relaxed, because that's what it sounded like to me.
- **Some Bluetooth receivers drift.** A NUX Mighty Plug Pro added close to a millisecond of delay every second until it levelled off around +65 ms. The app detects this during calibration and warns you, but it can't correct for it, because the drift changes from session to session.
- **Hammer-ons and slides** may not register as new notes. Note length (whether you mute when you should) isn't scored yet.

## Status

On the App Store since November 2, 2026, for iPhone and iPad. It's free, with no account and no in-app purchases. [Get it on the App Store](https://apps.apple.com/app/automatic-pocket/id6759693937).

Version 4.0, the drum machine, went to Apple for review on November 11, 2026, under the new name Automatic Pocket: Drum Machine. Until it's approved, the App Store has 3.0, where Just drums is the button next to Start. The app has more than 150 automated tests, including my own recorded takes as fixtures.

Next: a jam mode (pick a key and a progression, play over drums and keys, no scoring) and a muting trainer.

---

## The app

The app's own page, with setup help and support, is at [giffenlabs.ca/automatic-pocket](/automatic-pocket). It collects no data; the [privacy policy](/automatic-pocket/privacy) has the details.
