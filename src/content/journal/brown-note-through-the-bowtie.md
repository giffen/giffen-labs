---
title: Brown Note Through the Bowtie
date: '2026-10-10'
excerpt: I ran Brown Note's numbers through Winning by Design's Bowtie, a model built for recurring revenue businesses. It made the problem obvious. Brown Note doesn't have an awareness problem. It has an onboarding problem, and nothing to do unless you're having a bad day.
---

In [the last post](/journal/where-brown-note-is-actually-at) I laid out where [Brown Note](/specimens/brown-note) is at: 55 real users, about three of them active in a given week, and a summer of podcasts that bumped signups for six weeks and then faded.

I came out of that with a list of problems. A list is useful, but it doesn't tell you which problem matters most or how they connect. For that I needed a model, and the one that fit best came from an unlikely place: B2B sales.

## The Bowtie

The Bowtie is from [Winning by Design](https://winningbydesign.com/bowtie/), the revenue consultancy founded by Jacco van der Kooij. It's the backbone of his book [Revenue Architecture](https://winningbydesign.com/resources/books/revenue-architecture/). All credit to him and his team. I'm borrowing it, simplifying it, and pointing it at a free app, which is not what it was built for.

It starts from a simple observation. The classic sales funnel ends when the deal closes. That made sense when you sold something once. In a recurring business it's backwards, because most of the value shows up after the sale: the customer has to get value, keep getting it, and then grow. A funnel that stops at "closed" ignores the part that actually pays.

So van der Kooij took the funnel, laid it on its side, and mirrored it.

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/images/journal/bowtie-model-mobile.png" />
    <img src="/images/journal/bowtie-model.png" alt="The Bowtie model. On the left, an acquisition funnel narrows through Awareness, Education and Selection into a knot labelled Commit. On the right, it widens again through Onboard, Impact and Expand, with first impact, recurring impact and growth as the goals of each stage." />
  </picture>
  <figcaption>The Bowtie, simplified. After Winning by Design.</figcaption>
</figure>

**The left side is acquisition.** People become aware of you, learn what you do, and select you. It narrows, because most people drop out along the way.

**The knot is the commit.** In B2B that's the signed deal.

**The right side is where value happens, and it should get wider.**
- **Onboarding** exists to deliver a *first impact*, the first moment the customer gets what they came for.
- **Adoption** is about *recurring impact*, getting that value again and again.
- **Expansion** is growth: they do more, spend more, and bring others.

The part I find most useful is that the Bowtie is a measurement model, not just a picture. At every stage you track how many people are in it, how many convert to the next stage, and how long it takes. Once you put real numbers on each stage, the bottleneck stops being a matter of opinion.

## "But Brown Note doesn't make any money"

Correct. Nobody pays for Brown Note, and that's not changing.

The model still fits, because Brown Note is a recurring business. The currency just isn't dollars, it's people coming back. Nobody gets anything out of signing up. Everything Brown Note is for happens on the right side of the knot: someone writes back, it helps, and you come back the next time you're stuck, or the next time someone else is.

## Brown Note's bowtie

Here's how the stages map, with the real numbers. The left side comes from App Store Connect and only covers the last 30 days. The right side covers all real users since launch, with me, testers and shadowbanned accounts removed.

| Stage | What it means for Brown Note | Number |
|---|---|---|
| Awareness | Someone sees it in the App Store | 640 impressions |
| Education | They open the product page | 23 views |
| Selection | They download it | 8 downloads |
| Commit | They create an account | 55 since launch |
| Onboard | They write their first note or reply | 21 |
| First impact | A reply lands: they heart one on their note, or someone hearts theirs | 12 |
| Recurring impact | They do something in 3 or more different weeks | 4 |
| Expand | Regulars carry the replies and bring people in | not measured |

A heart is a rough stand-in for impact. Someone can feel helped and never tap it. But it's the only signal the app has that a reply actually landed, so I'm using it.

<figure>
  <picture>
    <source media="(max-width: 640px)" srcset="/images/journal/bowtie-brown-note-mobile.png" />
    <img src="/images/journal/bowtie-brown-note.png" alt="Brown Note's bowtie. The left side is greyed out, showing 640 App Store impressions, 23 product page views and 8 installs over 30 days. The knot shows 55 signups since launch. Instead of widening, the right side collapses from 55 to 21 onboarded, 12 reaching first impact and 4 recurring, while a dotted outline shows the widening shape it should have." />
  </picture>
  <figcaption>The right side should fan out. Brown Note's collapses: 55 sign up, 4 become regulars.</figcaption>
</figure>

The left side isn't great either. Only 3.6% of people who see the listing tap in. But the people who install do sign up, and pouring more of them into the knot just runs them into the same wall. So I'm leaving the left side alone for now. The problem is the right side.

## Where the right side breaks

### The knot to onboarding: 55 to 21

This is the biggest leak. 34 of 55 people signed up and never wrote a note or a reply.

Timing is the tell: 20 of the 21 people who ever posted did it on the day they signed up. If you don't post on day one, you never do.

The design explains why. When you open Brown Note for the first time, there's exactly one thing to do: write about how rough things are right now. Most people who sign up after hearing a podcast aren't on the toilet mid-flare. They're curious, or they want to help. The app has nothing for them.

Helping is locked until you've posted. The app literally says "Post your own message first to unlock replying!" Not one person has replied before posting. The people who showed up wanting to help were turned away.

### Onboarding to first impact: 21 to 12

Getting someone to write a note isn't the goal. The goal is that a reply reaches them and helps. Three things get in the way.

**Replies are slow.** The median wait for a first reply is 9.3 hours, and a quarter of notes wait more than 43 hours. Over half the replies on real people's notes came from me, my testers, or accounts I'd shadowbanned.

**Helpers are aimed at the wrong notes.** The Help screen serves a random note from everything still open, and a note stays open until it has 5 replies. In practice it stays open for months. Right now 50 of the 53 open notes are older than 30 days. 81 of the 96 real replies went to notes more than a week old, and 28 went to people who never opened the app again. The few helpers I have spend their kindness on old notes while new ones wait in line.

**Nobody's told.** The app asks for notification permission the moment you log in, before you have any reason to want it, and iOS only lets an app ask once. 6 of 44 app users said yes. There's no email and no unread marker. Even when a reply lands, most people never find out.

Speed matters. When someone's first note got a reply within 24 hours, 9 of 13 came back. When it took longer, 3 of 8 did. Those are small numbers, but they point the same way as everything else.

### First impact to recurring impact: 12 to 4

This is the most interesting number in the whole exercise. **Every one of the 4 regulars had a reply of theirs hearted in their first week, before they became a regular.** They got the helper's first impact early, and they kept coming back. Four is a tiny sample, but it's four for four.

Helpers rarely get that moment. 60% of replies never got a heart, and when one does arrive, only the handful of people with notifications turned on find out. The three strangers who carried Brown Note through the summer, writing 45 of the 96 real replies, all stopped by mid-September. Weekly actives went from 7 to 3.

Meanwhile the home screen pushes a streak counter, a nugget balance, and "+15 Nuggets" as the reason to write. None of that is the impact anyone came for.

### Expand

There's nothing to expand yet. You can't grow a group of regulars you don't have.

## Other lenses that helped

The Bowtie shows where it breaks. A few other models helped me understand why.

### The Cold Start Problem: the hard side

Andrew Chen's [The Cold Start Problem](https://andrewchen.com/) is about getting networks off the ground. Two ideas from it fit Brown Note almost too well.

**The hard side.** In any network, a small group does most of the work and is hardest to keep: drivers at Uber, sellers on a marketplace. Brown Note's hard side is helpers. Chen's advice is to solve a real problem for the hard side first. I built rewards for the easy side (writing notes) and locked the hard side out until they'd been the easy side.

**The atomic network.** This is the smallest group that keeps itself going, where there are enough people that everyone sticks around. For Brown Note it's the smallest group where a new note reliably gets a reply in a few hours. For one summer, three strangers *were* that network. When they left, it stopped working.

### The Fogg Behavior Model: the missing prompt

BJ Fogg's [Behavior Model](https://www.behaviormodel.org/) says a behavior happens when motivation, ability and a prompt show up at the same moment: B = MAP.

Brown Note has the first two. The people who care about this really care, and writing two kind sentences is easy. What it doesn't have is the prompt. Nothing tells a helper that a note is waiting. Nothing tells a writer that someone answered. Nothing tells a helper that their reply mattered. With prompts reaching 6 people out of 44, the behavior mostly doesn't happen, however motivated people are.

### Jobs to Be Done: an episodic job

Clayton Christensen's [Jobs to Be Done](https://www.christenseninstitute.org/theory/jobs-to-be-done/) asks what job a person is hiring your product to do.

Brown Note's main job is "keep me company while I'm stuck in here." That job is real, but it's episodic: it shows up during a flare and disappears when the flare passes. A product built around a job like that gets opened once in a while at best. That's the "nothing to do unless you're in distress" problem in one sentence.

There's a second job hiding in the data: "let me be useful to someone who gets it." That one doesn't wait for a bad day. You can do it any day of the week, and it's the job all four regulars were doing.

## What it adds up to

Put the lenses together and the story is pretty clear:

- **Upstream is small but not the bottleneck.** More traffic would hit the same wall.
- **Onboarding only offers the episodic job.** People who aren't in distress have nothing to do, and the ones who want to help are locked out.
- **First impact is slow and silent.** Replies take hours, go to old notes, and mostly arrive without anyone being told.
- **Recurring impact depends on helpers hearing that they mattered,** and the app almost never tells them.

So the question I'm working on now is: **what should a new person's first impact be?**

The original promise, "someone was there for me," only works if you arrive having a bad day, and it depends on reply speed and notifications Brown Note doesn't have yet. The alternative, "I was there for someone," is available to anyone on day one, and it's the path every regular took.

The data points one way. The next post will cover what I decided, what I built, and the relaunch.
