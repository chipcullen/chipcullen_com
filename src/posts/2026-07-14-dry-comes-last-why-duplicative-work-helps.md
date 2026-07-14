---
title: "DRY comes last: why duplicative work helps"
description: I've found this pattern of working to really help in my career -
  but it runs counter to a lot of instincts. Let me explain why I duplicate code
  first, then worry about abstractions.
date: 2026-07-14T09:36:00+00:00
draft: false
permalink: DRY-comes-last/
---
> Premature optimization is the root of all evil. - Donald Knuth

> Premature abstraction is, at best, a distraction. - Me

I just wanted to share a pattern that I've found works for me, in my career. It runs counter to a lot of developer instinct, and I've had to explain this point of view many times.

When building multiple pieces of related, even very-duplicative functionality, I will *intentionally duplicate code* - the long, slow, dumb way. At first. 

What about DRY (Don't Repeat Yourself)? This is a northstar that many developers instinctively adhere to.  I agree that is a goal that we should ... *eventually* ... aim for. 

Trying to make DRY code from the get go often *slows down* progress and leads to more work - or worse, wasted work. Days can be spent building abstractions that ultimately aren’t needed or can't handle all scenarios. 

Let’s say we’re building two widgets - Widget A and Widget B. They both do similar things but there is some amount of variance. 

I will start with Widget A, and build it out to the point where it works. Then I literally copy & paste it's code to create Widget B. I then get Widget B to a working state. 

*Only then* do I evaluate the two and figure out what is duplicate functionality that can be made into an abstraction. 

My contention is that DRY makes sense when you know *exactly* what you’re repeating. And you can’t know that until you’ve built out both things. 

Another benefit of duplicate code in this scenario is that you have a much freer hand in building Widget B. You can just alter it to your hearts content. If you begin with an abstraction, you will have to be much more careful about modifications to said abstraction, and making sure it doesn’t affect other consumers of it. 

I’m just being realistic here. I long ago admitted to myself that I cannot perfectly anticipate duplicate scenarios. I have to see what is *really* needed, then and *only then* can I build abstractions. 

## When to make an abstraction?

My rule of thumb is: 

**Only make an abstraction if the functionality has been repeated three times.**

If it’s only twice, it’s often (not always) easier to keep duplicate code. 

What this approach solves is:

- Faster ideation on duplicate-ish pieces

- More complete picture of what is needed from an abstraction

- Avoids mistakenly wasting time on abstractions that don’t work

I have personally seen this approach head off a few major mistakes. We had some workflow files for two projects that seemed to share similar requirements. I insisted that we do the dumb-duplicate-approach first. What we found was that the workflows ultimately had just enough differences that an abstraction wouldn't have been possible. But we couldn't have know that ahead of time.

I hope this post gives you some food for thought, and helps you avoid premature abstractions.