---
title: "How to make better Pull Requests: Adding Steps to Test"
date: 2018-12-18T20:33:41-05:00
draft: false
slug: "how_to_make_better_prs_adding_steps_to_test"
description: "Do your pull requests languish for days before someone finally gets around to looking at it? Is the feedback that you get unhelpful? Are you finding nasty bugs in your code only when someone looks at your PR's?

I've been there. And I know a better way - follow along!"
---

Do your Pull Requests (PRs) seem unfocused? Do they languish for days before someone finally gets around to looking at it? Is the feedback that you get unhelpful? Are you finding nasty bugs in your code only when someone looks at your PR's?

I've been there. And I know a better way - follow along!

---

At my current position we have adapted our process such that now our _Pull Request_ stage is one of the most crucial parts of our workflow. _This_ is the stage when we not only look at the code, but also evaluate the functionality (i.e. QA) and make sure that everything works, and nothing breaks unexpectedly.

In our workflow, the [next stop after a PR gets merged is production](https://en.wikipedia.org/wiki/Continuous_delivery). So, we have to take them pretty seriously.

What helps most when opening a Pull Request is writing out, clearly, a few pieces of information so that potential reviewers are much more quicly orientated.

- The objective of the work / the bug you're trying to fix
- **Steps to test** your solution

## Adding the objective / bug

You have to keep in mind the mentality of the other reviewers on your team who you're asking to look at your Pull Request. They're busy with their own work - they would probably much rather be solving their problems.

Spell out simply and clearly the _point_ of your Pull Request. I can't tell you how many PR's I've seen with no 'description' at all. The titles of your Pull Request, 98 times out of 100, are _not_ enough information to go on.

Remember that your teammates aren't looking at your ticket - they don't necessarily know what it's about. And even if they are familiar with the work needed, they might not have that information top of mind when they get around to looking at your work.

Within your Pull Request's description - either add some semblance of the acceptance criteria provided, or the steps to reproduce a bug.

## Adding Steps to Test

The biggest thing that I've seen help PR's along is adding clear steps to test your work. They should be **easy to follow**, **short**, steps **in order**.

Something like this, if you're fixing a bug (in this case, a weird layout overlap):

> - Start from the `master` branch
> - Visit the /about/ page
> - Note that the author names are overlapping the author photos
> - Pull down this branch
> - Refresh the /about/ page
> - Note that the overlap is fixed

Or if you're adding a feature:

> - Pull down this branch
> - Visit the /store/ page
> - Note the new promotional component at the top of the page
> - It should pull the featured image from our CMS's API
> - The headline and supporting text are pulled from our CMS
> - The component layout works across breakpoints
> - Clicking the Call to Action button takes you to the catalog page for the featured item

## Why spell all this out?

First and foremost, what you are now doing **is making your PR _actionable_** for your reviewers. They don't have to think about _how_ to evaluate your PR. Sure, they can nit pick coding decisions, but you're done the hard work in terms of laying out _what_ they should be looking at.

You want to make this as _easy as falling off a log_ for your reviewers. The less that they have to _think_ about your PR, the faster they'll actually look at it. Your objective should be to remove as much friction as possible for reviewers of your PR.

There is one big drawback to this approach - opening PR's takes a _lot_ longer. Sometimes it takes me close to half an hour just to fully fill out my PR description.

But I think this time will more than be made up for by the speed with which your PR's get approved. Also, if you are the one opening a PR, you're asking of _someone else's time_ - isn't it up to you to make it as easy as possible for the other parties?

## Clarity of thought

Another major benefit that I'll point out to adding steps to test to your PR is that it causes _you_ to stop and think about what you're trying to acheive. Because you're trying to articulate these steps, it forces you to crystalize what is happening. You may find yourself considering important edge cases at this step that you weren't originally.

Or, maybe there are multiple permutations of what you're trying to make happen, and only some work. I have found also that when you're doing work that touches many places in your project, it's important to list different views _individually_ and mention what to look for.

## A blueprint for automated tests

The last benefit that I'll mention is that when you've done a good job listing out all of the ways your work should be evaluated - you now have in your posession a very good _test plan_.

If the PR that you just authored doesn't contain automated tests already, you at least already have a very good guide of how to go about authoring them.

## Conclusion

I hope that with some care and some forethought, you can open Pull Requests that are actionable for your reviewers. By adding **steps to test** your work you remove friction for your reviewers, which makes them more likely to get your work reviewed faster. Along the way you'll be forced to think very carefully about your work so that you can articulate these steps, which will hopefully lead to better, more complete work.

Happy coding!
