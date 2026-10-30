---
title: Love Will Tear Us Apart, Unstuck
date: '2026-10-29'
specimens: [love-will-tear-us-apart]
excerpt: In April I wrote about the app I couldn't ship. Proximity was too hard to test alone, iOS was hostile to the whole idea, and the music APIs didn't want it to exist. Nine days of rebuilding later it's on TestFlight with its App Store listing filled in. Almost none of the April problems got solved. They got designed out.
---

In April I wrote [The App That Won't Ship](/journal/the-app-that-wont-ship), about [Love Will Tear Us Apart](/specimens/love-will-tear-us-apart): an app that plays your song when you walk up to someone you care about. I ended it with a promise. When I came back to it, there'd be a second post, and it would either say "here's the build" or "here's why I finally killed it."

This is the build. It's on TestFlight, the App Store listing is filled in, and I'm one two-phone test and a demo video away from submitting it.

## What I came back to

I opened the project again on October 19, on a new Mac with Xcode. The first build crashed at launch. iOS 27 requires an app lifecycle that the version of Expo it was built on doesn't have.

The crash was the least of it. Since February the app had been through three art styles: a Joy Division *Unknown Pleasures* look, a generic cream-and-pink "playful" redesign, and a candy-coloured isometric one with blocky avatars. It was all three at once. The database had been changed by hand in the dashboard, so the code and the live tables no longer agreed. And the core loop, your song plays when you reunite, only worked if both people had the app open on the same screen at the same moment. Which is a long way of saying it never worked.

What I told Claude was: "I'm not even sure this project works. I guess commit what we have, and then we can go back to the drawing board."

## The decision that unstuck it

The next night I wrote one message that turned out to be the whole redesign:

> I don't think we can use Spotify, but we can use YouTube for the music. I also want the cool tapping of phones and cool animation when you share / connect with someone. Have it so when you're connected with someone you can push a notification to their phone telling you how close they are. This should resolve most of the technical issues.

It did. The design doc Claude wrote from it put the idea in one line: *v2 swaps passive tracking for deliberate actions.* The app stops trying to notice when two people are close. People show it on purpose instead.

- **Connect** by holding two iPhones together. Ultra Wideband measures the distance down to centimetres. The two floating islands slam together and a red string gets tied between your characters.
- **Tug the string** when you're apart. Their phone buzzes with how far away you are. When they open it, their phone replies automatically, so you both learn the distance. It works like Marco Polo, and neither phone tracks anything in the background.
- **Reunite** by holding the phones together again. TOGETHER! slams onto the screen, there's confetti, and your song plays.

That one change removed background location from almost the entire app, and with it most of what I spent April complaining about.

## April's blockers, one by one

**"You cannot test a proximity app alone."** Still partly true. The tap needs two phones and two people. But the loop got cheap. Claude built a test rig where the simulator runs against a local copy of the backend, and a scripted second user, "Sam", sends tugs, starts trips and reunites from the command line. Under that sit about 400 app tests, 100 database tests and 50 server tests. By the time I did a real two-phone test, most of the bugs were already gone. The real tests were me and my wife.

**"The OS is hostile to the use case."** It still is. The app just doesn't fight it anymore. There's exactly one place it uses location in the background, and it's a feature you start yourself (more on that below).

**"Music APIs don't want this product to exist."** I swapped them out. Spotify no longer offers previews to new apps anyway. Your song comes from YouTube: search for it or paste a link, then drag a scrubber to drop the needle on the chorus. YouTube's terms say the player has to be visible while it plays, so it plays inside a little voxel TV that pops up during the reunion.

**"How close is close?"** A few centimetres. The tap fires just before the phones touch, which also keeps iOS's NameDrop sheet from taking over.

**"Does it re-trigger?"** It doesn't trigger by itself at all. In the first build I tested with my wife, we were 0 m apart and I still had to go to another screen to set off the reunion. I wanted the interface to notice, not the music. A couple who live together are zero metres apart every evening, and nobody wants confetti every night when they get home. So nothing plays by itself, but when the app knows you're close, Home itself changes to a prompt to hold your phones together.

**"What about indoors?"** Irrelevant, once the trigger is a tap.

**"Who consents to what?"** Consent is built into how it works. Connecting takes both phones together, or the other person choosing to open your invite. Your person only ever sees a distance, never a map, and a new distance only exists because their phone reported its own fresh position. You can't silently ping someone over and over to triangulate them. Either person can disconnect at any time, without asking.

And "enemy" became **Rival**. As I put it to Claude: "It's not a real enemy, it's just a joke." Think of the guy at work you're competitive with. With the paid unlock you can label him a Rival, and his page becomes a thunderstorm, and when you meet up the screen says FACE-OFF!.

## What April got wrong

At the end of the April post I listed what "done" would take. Here's how that list did:

| April said | What happened |
|---|---|
| Local audio only for v1 | Wrong. YouTube solved it better than bundled files ever could. |
| Symmetric consent | Right, and it went further than I'd planned. |
| Bluetooth first, location as backup | Half right. The phones do find each other over Bluetooth and Wi-Fi, but only while you're holding them together. The tap made proximity a gesture, not something running in the background. |
| Play once per session, no loop | Too timid. It never plays by itself at all. |
| Test with three real pairs of people | So far, one pair. Still owed. |

The pattern is the lesson. In April I treated proximity as an engineering problem I'd eventually grind through with a better architecture. The fix was a product decision. I didn't need a better way to run location in the background. I needed to not run it.

## The one place it does track you

The exception came from Uber. I asked Claude how Uber lets you watch the driver come in, and whether we could do that. It became **On my way**. When you're heading to your person, you start a trip, and they watch your island drift toward theirs until you arrive.

It's the only time the app uses location in the background, so it gets the strictest rules. The traveller starts it. The iOS location indicator stays on the whole time. The other person sees a distance, never a position. It stops when you arrive, when you reunite, when you tap Stop sharing, or after three hours. Then the trip's distances are deleted.

By default it only goes one way. My one change to the design was letting the person waiting choose to share their distance back, for that trip only: "This way good actors aren't punished, but bad actors can't do the triangulation."

The first version of the trip card read "61 min left · +60 MIN · STOP". After the first real test I told Claude I had no idea what On my way did. Now it says what it does before it starts, and the traveller gets one button: Stop sharing.

## The first real test failed

The first time my wife and I tried it, we couldn't connect at all. I sent her an invite over WhatsApp, and WhatsApp doesn't turn custom app links into something you can tap. She had a link and nowhere to put it.

I bought two domains that night. Claude set up the invite domain so links open the app directly, and built a one-page marketing site on the other. Later, when I asked that an invite should work even for someone who doesn't have the app yet ("if the person clicks and installs the app there should be a prompt to connect and then boom, you're in"), it found that iOS can't carry a link through an App Store install. The workaround: the invite page copies the link, and the app's first screen offers Apple's own Paste button.

## The other walls

- **The 3D.** The native 3D route couldn't show a lit scene on iOS 27, so the voxel world runs three.js inside a WebView. Shadows rendered pure black until they were switched to a different shadow technique. The dead-end branches are still in the repo.
- **"It crashed as soon as we connected."** The first TestFlight crash came from the connect flow stacking a second Home screen on top of the first. The crash reports didn't include the error message. That came out of the phone's full system log, pulled over USB with an admin password.
- **TestFlight hid every new build**, because the early builds were numbered 2.0.0 and the new ones 1.0.0.
- **The paid version found the scariest bugs.** I wanted multiple connections and labels in the first release. Fresh code reviews after each stage of that rebuild caught: holding phones together on Home could connect two strangers, one person's trip distance could appear on someone else's page, tapping a notification never opened the right page on a real iPhone, and one $4.99 purchase could unlock any number of accounts. Those are the bugs that make an app creepy or free. All fixed before they shipped.
- **PING was nerdy.** It didn't fit a world of floating islands and red string. Now you **tug** the string, and a heart (or a star, or a spark) runs down it. A rival zaps you instead.

## What it is now

A tiny voxel world for two people, in the style of Crossy Road, which is what I asked for. When Claude came back with the first look, I told it: "The art direction is perfect, super cute." You build a little person. I added bald and beards to the character creator after realizing I couldn't make myself without them. You give your person a vibe, a signature move and a catchphrase. Sign in with Apple is the only sign-in. Phone-number sign-in got dropped because, as I put it at the time, it adds nothing.

It's free for one connection. A one-time $4.99 unlock gives you as many connections as you like, each with a label (Partner, Friend, Family or Rival) and its own sky. No subscription, no ads, no tracking. It's a fun app, and it should cost a one-time purchase, not an arm and a leg.

## What the model did

Claude Opus 5.5, running in Claude Code, wrote all of it: about 120 commits in nine days, much of it overnight on instructions like "Go build as much as you can without asking me anything. Flag your decisions and we can tweak if needed." Then it did most of the launch paperwork: the listing, screenshots, age rating and in-app purchase through App Store Connect's API, and the privacy answers (which have no API) by driving Chrome. The tax and banking forms were mine.

The habit I'd steal is the flagging. The design doc marks every decision Claude made without me as a "(call)", so I knew which ones to check first. After the paid-version rebuild it wrote a rulings report listing every judgment it made on my behalf, each one ending with what it would cost if it was wrong. That made "don't ask me anything" safe to say.

In April I wrote that you can't prompt your way past two phones, two people, real distance and real OS throttling. That was half right. The physics didn't change. What changed was the cost of building. When the build is that cheap, you can afford to throw out the architecture you were attached to and try a completely different product decision. That's the part I couldn't see in April.

## Where it stands

Version 1.0.0 is on TestFlight and attached to its App Store version. The listing, screenshots, privacy labels, age rating and in-app purchase are filled in, and the agreements, banking and tax forms are done. Before I hit submit: one more full two-phone pass on the latest build, including the first real purchase in Apple's sandbox, and a short video for App Review, because the reviewer only has one phone and this is a two-phone app.

In April I wrote that the lab entry still said `status: backlog`. Today it says `in-progress`. The next post will either say it's in the App Store, or explain why App Review said no.
