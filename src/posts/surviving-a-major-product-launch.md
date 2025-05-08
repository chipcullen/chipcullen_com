---
title: Lessons Learned Surviving a Major Product Launch
description: I recently led the biggest launch so far in my career. It was far
  from smooth - how did we get through?
date: 2024-12-19T03:00:00+00:00
draft: false
tags:
  - communication
---
I've been sitting on this for a while - but my team at PBS built out and launched a whole new version of [www.pbs.org](https://www.pbs.org), and it went live last month.

This has been, by far, the largest effort that I've led in my career. I had been at PBS for the last major redesign, but I wasn't leading it. This project started over two years ago as an idea of mine, which got buy in from the rest of the organization. After a concerted effort of the last year solid, we had an implementation and launched in mid November.

It … didn't go _smoothly_.

We didn't have to roll back, but we had to fix a lot of issues on the fly. It was very stressful on the team, and myself. But, we got it up and running.

In the intervening weeks, we've managed to sort out a lot of other issues, and we're in a much more stable place. So, how did we get through all that?

## Some context

First thing to know is that, in terms of engineering, we had a very small team working on this. 2 senior devs, an SRE, and me. For the launch itself we also had 2-3 engineers from our Operations team helping us sort out at various times. But, that's it.

As one of my team members who had come from a much larger engineering org pointed out - the team was _tiny_. At a larger company, there would be multiple teams, months of planning, etc, just for the launch. We didn't have that.

## What went wrong?

I'm going to spare the gory details of exactly what was wrong, but - the fact of the matter is that we immediately experienced some issues that we did _not_ experience in the lead up to launch, and during load testing.

**Lesson one: some issues only happen in prod, and they are very hard to anticipate.**

At that point, we had a choice - do we roll back? Or do we "fail forward" - that is, fix the issues and keep going? Thankfully, we decided on the later. (Still, it was functionally easy to roll back, which was a good thing to have in the back of our mind).

## How did we respond?

While launch day was super stressful, I look back at it with pride for the simple fact of how the team responded: we stayed calm, and worked the problem. There was never an instant of blame or finger pointing. I've [written before](/i-really-like-post-mortems/) about building a place of psychological safety, and on this most stressful of days, that effort paid massive dividends.

Not only were there no bad feelings generated, but I firmly believe that we fixed the issues we were seeing _much faster_ because of the attitude on the team.

**Lesson two: building a culture of blamelessness will allow the team to deal with stressful situations much more efficiently.**

## What were the ramifications?

In terms of that day - the site was up and semi functional, but there were significant issues for first time users for a period of about six hours. We eventually got those sorted out.

I think the biggest issue that we really dealt with, at least organizationally, is that there were important people in our chain who didn't know what was going on. That's not entirely on me, but I could certainly have been more proactive.

**Lesson three: make regular, public, updates of how it's going in places where important stakeholders know to look.**

## What happened after that?

I'd love to say that we fixed our issues and then it was smooth sailing. It wasn't.

Further issues were identified in the days that followed that needed urgent fixing. I'll be honest, at first, issues were getting reported faster than we could fix them. It was all overwhelming.

What really helped at that point was my team had a **triage meeting**. The first thing we did was generate a list of all of the known issue reports. This was important because we were hearing about things in lots of places - on Slack, via email, verbally, or things we noticed ourselves. Once we wrote it all down, we could wrap our mind around it all.

It turns out there were 8 or so urgent issues. Just knowing _that_ made the situation seem a lot less overwhelming. We then gave each issue a ranking in terms of urgency, and also identified issues that were things that other teams had to address.

At that point, I was able to create tickets, which means we could go about our normal workflow. And the team kicked butt, dealing with those issues.

**Lesson four: any major product / feature launch will likely mean lots of issue reports coming from various sources. To avoid feeling overwhelmed, capture them all in writing in one place and triage them.**

## So how is it going?

It's still not been totally sunshine-and-roses. We've had a few more major issues pop up from time to time, so we have still had drop-everything-and-react moments. But things have settled down. We are out of the woods.

At this point, we will address bugs like we did with our old, mature, product, with our existing workflows. We can also turn our attention now to _new_ features with the new site, which is the fun part!