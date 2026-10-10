---
title: Where Brown Note Is Actually At
date: '2026-10-09'
excerpt: Eight months after launch, Brown Note has 55 real users and about three of them show up in a given week. Two podcasts and a listing on the Crohn's & Colitis Foundation site didn't change that. Here are the real numbers, what I think is actually broken, and the redesign I'm about to do.
---

In February I shipped [Brown Note](/specimens/brown-note), an anonymous peer support app for people with IBS and Crohn's. You're stuck on the toilet, you write a short note, and a stranger who gets it writes back. I built it in 24 days for about $354, and I wrote about that [here](/journal/building-an-app-then-vs-now).

That post was about how fast you can build now. This one is about what happens after you build it. The short version: not much.

I want to write this down honestly before I change anything, so that in a few months I can tell whether the changes worked or I just moved the furniture around.

## The numbers

These come straight from the production database. I removed myself, staff, my test accounts, and the 11 accounts I had to shadowban. What's left are people I don't know.

| | |
|---|---|
| Real accounts | 55 |
| Notes written | 36 |
| Replies written | 96 |
| "This helped" hearts | 102 |
| Active in a given week (now) | 1 to 4 |
| Active in a given week (peak) | 14, launch week |
| Came back within 7 days of signing up | 8% |

The website barely matters. 44 of the 55 used the mobile app, and those people wrote 34 of the 36 notes and 95 of the 96 replies. Since March, almost every signup has come through the app. The website is a launch-week artifact.

## What I did for distribution

I'm not a marketer, but I did more than post it and hope.

- **The App Store and Google Play launch.** The week the app went live, 10 people signed up and 14 were active. That's still the best week Brown Note has had.
- **[About IBD, episode 204](https://aboutibd.com/2026/06/23/brown-note-helping-people-with-ibd-find-hope-and-support-with-andrew-giffin-about-ibd-podcast-episode-204/).** Amber Tresca had me on in June to talk about why I built it. Her audience is exactly the people Brown Note is for.
- **The [Crohn's & Colitis Foundation's Helpful Apps page](https://www.crohnscolitisfoundation.org/helpful-apps).** Brown Note was added this summer, listed next to Headspace and a handful of IBD apps. For a hobby project, that's real validation.
- **[Curiosity and Connection, episode 19](https://www.youtube.com/watch?v=GcqtAOieHFM).** Nga Do and I talked in September about using Claude to build it. It has 17 views on YouTube.

Here's what that bought me. Between the last week of June and the start of August, 15 people signed up. Outside that window it's about one a week. July was Brown Note's best month for activity: 13 notes and 39 replies. Then August came, and it was back to one signup a week.

The September podcast didn't move anything I can see.

So distribution worked a bit. The podcast and the listing roughly tripled signups for six weeks. The problem is that the bump didn't stick.

## Where the funnel leaks

App Store Connect for the last 30 days shows 640 impressions, 23 product page views, and 8 first-time downloads. Over the same window, 5 people signed up, and 1 of them came back after the first day.

There are two leaks. One is at the top: very few people see the app, and very few of those tap in. The other is after signup, and it's the one that matters. People who install Brown Note do sign up. They just don't come back.

Pouring more podcast listeners into a bucket like that doesn't fill it. The bigger problem is the loop, not the reach.

## What's actually broken

I spent a few evenings digging through the data. Here's what I found, starting with the worst.

**Nobody knows when someone writes back.** This is the big one. You write a note in a vulnerable moment, close the app, and that's it. The app has no unread tracking, so even if you open it again, nothing tells you a reply is waiting. Push notifications exist, but the app asks for permission the second you log in, before you have any reason to care. Only 6 of the 44 app users ever said yes. **38 of the people using Brown Note can't be told that someone replied to them.** The core promise is "you're not alone," and the app never tells you when someone showed up.

**Replies are slow, and fewer are real than I thought.** 64% of notes got a reply from another real person. None got one within an hour. Worse, of the 75 replies on real people's notes, 39 came from me, my testers, or accounts I'd shadowbanned. I was propping it up without really admitting it.

**The community was three people.** Three strangers wrote 45 of the 96 real replies. They were the regulars, each showing up on 23 to 31 different days. All three stopped by mid-September, and weekly actives went from 7 to 3. When you have this few people, losing three is losing the community.

**The gamification pointed at the wrong thing.** The home screen shows a streak counter, a nugget balance, and "+15 Nuggets" as the reason to write a note. The pitch is points, not people. And some of it didn't even work:

- The daily login reward has never paid out.
- Three stickers, including First Responder, could never be earned, because their criteria were never wired up.
- Exactly one real user has bought a sticker from the shop.

I built the reward system before I built the reason to come back.

## What I'm changing

The goal isn't growth. I want a solid group of regulars who find Brown Note helpful and nice, and come back because someone there needs them or wrote back to them. Every change below serves that.

**Close the loop.**
- Tell people when someone replies, by push and by email, and show the unread replies the moment they open the app.
- Ask for notification permission right after someone sends their first note, which is the moment they actually want to hear back.
- When someone taps "This helped," tell the person who wrote the reply. That's the reward that keeps helpers around, and right now they never hear it.

**Make helping the front door.**
- New members can reply to someone before they've posted anything.
- The helper queue shows notes with zero replies first.
- People who opt in get a heads-up when a note is waiting.

**Tell the truth about waiting.** After you send a note: "Most notes hear back within a few hours. We'll tell you the moment someone does." No promises of instant support.

**Kill the streak.**
- Stickers reward showing up in a given week, not consecutive days.
- First Responder becomes "the first reply on a note that had none," which is what it should have meant all along. It's no longer about speed.
- Nuggets and the shop move out of the way.

**App first.** The app gets the redesign. The website gets a lighter pass so it isn't broken, and it'll still work for the handful of people who use it.

**What I'm not doing:**
- AI replies. The whole point is that a real person wrote back.
- A rebrand. I spent an evening having two frontier models redesign the logo, and it was fun. It also had nothing to do with why people leave.
- New features for the shop.

There's one part software can't fix. Brown Note needs a few more people willing to reply. I'm going to ask for them directly, starting with the people who heard the podcasts.

## What I want out of it

Here's what I'm aiming for in the 90 days after the relaunch, written down so I can't fudge it later:

| | Now | Target |
|---|---|---|
| Real people active in a week | 3 | 20+ |
| Came back within 7 days | 8% | 25% |
| Notes that get a real reply | 64% | 90% |
| People we can tell about a reply | 11% | 90% |

If I hit those, Brown Note is a small thing that works. If I don't, I'll know the problem wasn't the notifications and I'll write about that instead.

Next post: what I changed, why, and the relaunch.
