---
title: "Firefighting 101: How to Manage Breakages"
date: 2021-10-04T22:54:26-04:00
draft: false
slug: "how-to-manage-breakages"
description: "A playbook for tech managers in dealing with significant outages."
tags: [management]
custom_properties: [
    "--background-color-page: hsla(0, 0%, 88%, 1);",
    "--background-color-header: var(--red);",
    "--color-header: var(--grey-slight);",
    "--font-weight-h1: 522;",
    "--color-drop-cap: var(--red);",
    "--font-weight-drop-cap: 422;",
]
---

Today was the day Facebook went down for six hours. While I haven't dealt with breakages at that scale, I have been through a few 'fires' in my time.

Having seen them through to the other side, I thought I'd share a playbook for tech managers on dealing with significant outages.

## The Playbook

1. Breathe
2. Triage
3. Notify (the first time)
4. Assess
5. Notify (again)
6. Address, Test & Deploy
7. Verify
8. Notify (a third time)
9. Reflect

## 1. Breathe

When you become aware of an outage/significant breakage (write down how you found out, btw), the first thing to do is - *take a breath*. Your team needs you to be calm and rational. If you are, they are more likely to be. And calm is the state of mind you need to be to fix the problem and not make it worse.

Remember, with few exceptions, what you're probably working on is _not_ a life or death matter. As a coworker told me once when something broke "hey, it's not like we're curing cancer". Keep some perspective.

(This goes doubly true for executives.)

## 2. Triage

This is the rough first stage of trying to sort out what's what. Bad outages rarely come alone - it's usually some combination of factors. Based on your knowledge of systems, or those who you rely on, start making a list of affected pieces and who is responsible for them.

## 3. Notify (the first time)

As a manager, your most important task in these situations is **communication** - much more so than the actual fixing of the broken thing. I would say plan on 60-80% of your time being spent communicating about the problem.

The first significant piece of communication that you need to send out is right after triage. That is, when you know there is a problem.

Send an email, post in a slack room. Whatever your organizations usual procedure is - follow it. You don't even have to have the problem terribly well defined - it can be vague at this point. Just make sure several levels above you are made aware.

**It is critical that your higher ups know almost as soon as you do if there is a problem.**

You do _not_ want to hide a problem, if there is one. That's a one way ticket to looking for a new job.

Most (reasonable) leaders can deal with the fact that things break. Stuff breaks in tech all the time. What they _cannot_ deal with is being caught unawares.

Helpful things to include:

- The service/application that have been observed to be broken
- The time of the earliest notification of the issue
- The fact that your team is looking into it, and pausing work on other issues

## 4. Assess

This is probably one of the more frustrating phases of dealing with a fire. It can take two minutes, or it can take two weeks. And you really can't know ahead of time what it will be.

The first point of your assessment should be - **what is the impact of the breakage**? How many users are affected (or, in what situation are they affected)? Is it all users or only some? Is there some core experience that is broken, or is your application down altogether?

This is now the time when you break down the issue at a detailed level. Try to nail down steps to reproduce. Look at code. Review git history.

The most fundamental question is: **what has changed that would cause functioning software to break in this way?**

In order of ease of identification/remediation:

| Thing to check      | Possible Resolution |
| ----------- | ----------- |
| Was configuration changed that would be responsible?  | Revert the configuration and see if the problem is resolved |
| Was there a recent code push that seems related to the outage? | If possible, roll back. If rolling back isn't possible, you're going to have to "roll forward".  |
| Was there an interruption to an API that your application relies on? | Report the impact of the outage to those responsible for the API |
| Are there operational level interruptions? That is, is there a problem with how the application is being hosted? | Report the impact of the outage to those responsible for infrastructure |
| (And this is by far the hardest to pin down) Is there an interruption to an external dependency? | See if it's a known issue, if there is a way to revert, or any other work around. Possibly replace the dependency altogether.|

These may seem obvious or intuitive, but I present them here for someone who might not think of these in the stress of the moment.

For vague problems that are of a more chronic nature (as opposed to a sudden breakage) this is also the point that you want to define: **what does fixed look like?** Is there a metric that you're hoping to hit? Know what that is, because if you don't you could spend weeks and weeks dealing with this issue.

## 5. Notify (again)

Now that you have a firm handle on the problem, and what might be a fix, you now need to communicate this up the chain again. The first communication was basically "hey there's a problem"; this second communication is "we think we know the source of the problem and this is what we're going to do to fix it".

This is important in several ways - first, it shows that you're actively working the issue. Second, it lets others know that a further change is coming (that hopefully turns out to be a fix).

Helpful things to include:

- The service/application affected
- What the cause seems to be
- What the fix will involve
- An estimate of when the fix will happen

## 6. Address, Test & Deploy

This is where your team actually fixes the thing. If you're doing your job as a manager, they have a free hand to work on this fix, and are kept out of needless meetings or status updates. (Those are _your_ job)

I put "Address, Test & Deploy" because this is a nebulous point. Depending on your project, and the source of the breakage, the fix can vary wildly.

Testing may be pulling code down and trying it out locally. It could be looking at the change in a QA environment. It could be simply monitoring production.

Deploying a fix could mean changing a configuration somewhere.

It's hard to say.

## 7. Verify

This is a crucial step - _verify_ that your fix actually resolves the issue. Go back to how you found out about the issue and see if it seems resolved from that perspective. That means if someone emailed you to let you know that your service is down, go back to that person and check if it's restored for them. If you found out because you had errors in your logs, see if the errors are lessening.

Don't just deploy and walk away.

If you defined "fixed" in a formal way, make sure you're meeting that criteria.

## 8. Notify (a third time)

I told you there was a lot of communication involved. Now comes a fun communication - letting people know that the problem has been fixed.

Helpful things to include:

- The service/application affected
- When the fix went live
- How long the breakage was
- How many users were affected (if known or guessed at)
- Thank the team members involved, including those in other teams

## 9. Reflect

Within a few days of the incident, hold a meeting to reflect on the breakage. Invite all those involved - not just engineers, but product owners, support staff, and yes, executives.

We practice [blameless postmortems](https://www.atlassian.com/incident-management/postmortem/blameless) when it comes to incidents. And to be honest - at this point I'm _excited_ for them. I love these conversations. The point is to try to improve systems so that incidents like this don't happen in the future. Human error is never the cause. The cause is always - how did the system let the humans down?
