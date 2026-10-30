---
title: Love Will Tear Us Apart
specimenNumber: '03'
classification: Long-Distance Companion
habitat: iPhone · TestFlight, pre-launch
firstObserved: '2026'
status: in-progress
heroImage: /images/specimens/v2/love-will-tear-us-apart.webp
platform:
- iOS
- Expo
- React Native
- three.js
- Supabase
- Ultra Wideband
- YouTube
- Claude Code
images: []
url: https://lovewilltearusapart.com/
excerpt: A tiny voxel world for two people. Hold your phones together to tie a red
  string between your islands, tug it to see how far apart you are, and when you're
  back together, your song plays.
---

## The Concept

Two people, two little floating islands, one red string between them.

You make a small voxel version of yourself. You and your person hold your phones together, the islands slam into each other, and the string gets tied. From then on, wherever you both go, the gap between your islands matches the last distance between you. When you're back together, you hold your phones together again: confetti, your signature moves, and the song you picked for each other starts playing.

It's deliberately small and deliberately unserious. It doesn't summarize anything and it doesn't have a chat box. It's built for the days you're apart.

## How It Works

- **Connect.** Hold two iPhones together. Ultra Wideband measures the gap down to a few centimetres, and the other person's island drifts in as the phones get closer. Not in the same room? Send an invite link. If they don't have the app yet, the invite page holds onto the link and the app's first screen offers to paste it, so they go from link to connected without hunting for anything.
- **Tug the string.** A heart (or a star, a glow, a spark) runs down the string and their phone buzzes with how far apart you are. Opening it sends a reply automatically, so you both learn the distance. Neither phone tracks the other in the background to make that happen.
- **On my way.** Heading to them? Start a trip and they watch your island drift in, closer and closer, until you arrive. They can choose to share theirs back for that trip. It's the only time the app uses location in the background, and the iOS location indicator stays on the whole time.
- **Together again.** Back together, hold your phones together right on Home. Nothing plays by itself: a couple who live together are zero metres apart every evening, and that shouldn't set off a celebration.
- **Your song.** Search YouTube or paste a link, then drop the needle on the chorus. It plays in YouTube's own player inside a little voxel TV.
- **Make your little person.** Hair (bald included), beards, a beanie, a vibe that sets how you idle, a signature move and a catchphrase. Tap your character and they do it.
- **More people.** A one-time $4.99 unlock lets you connect with as many people as you like and label each one: Partner, Friend, Family or Rival. Each label gets its own sky. Friend is golden hour, Family a warm evening. Rival is a thunderstorm with rain and lightning, and a meetup says FACE-OFF!. The free version covers one connection.

## Back From the Dead

In April this specimen was marked dormant, and I wrote [The App That Won't Ship](/journal/the-app-that-wont-ship) about why. I couldn't test proximity alone, iOS throttles background location, Spotify and Apple Music don't want another app playing their songs, and the consent model for something called "enemy" was not good.

In October I came back to it on a new Mac with Xcode. It crashed at launch on iOS 27, it had been through three art styles since February, and its core loop only worked if both people had the app open on the same screen at the same moment. I started over. The fix for nearly every April problem turned out to be one product decision: stop trying to detect when people are close, and have them show it on purpose by holding their phones together.

The rebuild took nine days. How it went, including what April got right and wrong, is in [Love Will Tear Us Apart, Unstuck](/journal/love-will-tear-us-apart-unstuck).

## Privacy by Design

The first question anyone should ask about a location app is how it could be used to control someone. These are the rules the app is built around:

- **A distance, never a map.** Your person sees how far apart you are, rounded. Never coordinates, never a pin.
- **No triangulation.** A new distance only exists because the other phone reported a fresh position of its own: when its owner opens the app, tugs, replies, or starts a trip. You can't silently ping someone over and over to work out where they are.
- **No history.** The server keeps your latest position only. Trip distances are deleted when the trip ends.
- **Mutual by construction.** Connecting takes both phones together, or the other person choosing to open your invite. Either person can disconnect at any time, without the other's permission.
- **Labels are private.** If you've labelled someone a rival, only you know.
- **No ads, no tracking.** Sign in with Apple is the only sign-in, and deleting your account removes everything.

## Under the Hood

- **Expo SDK 58 / React Native**, kept over a native Swift rewrite because Android is on the list for later. The native pieces (Ultra Wideband tapping, StoreKit purchases) are small Swift modules inside the Expo app.
- **The voxel world** is generated from code and rendered with three.js inside a WebView, after the native 3D route couldn't show lit frames on iOS 27.
- **Tapping** uses Apple's Nearby Interaction (Ultra Wideband) for distance and MultipeerConnectivity to find the other phone. The tap fires a few centimetres apart, before the phones touch, so iOS's NameDrop sheet doesn't take over. Phones without UWB connect by link and reunite with a both-press-at-once button.
- **Supabase** for accounts, row-level security and Edge Functions. Pushes go directly to Apple's push service, and purchases are verified on the server against Apple's signed transactions.
- **Tested without a second person.** A scripted second user runs against a local backend from the command line: about 400 app tests, 100 database tests and 50 server integration tests. Real two-phone runs still happen in person.
- **Supports the folded screen** on iPhone Duo.

## Status

In progress, and close. Version 1.0.0 is on TestFlight and attached to its App Store version. The listing, screenshots, privacy labels, age rating and in-app purchase are all filled in. What's left before submitting: one more full two-phone test pass, including the first real purchase in Apple's sandbox, and a short demo video for App Review, since the reviewer only has one phone.

Android comes later.
