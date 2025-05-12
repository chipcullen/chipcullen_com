---
title: "My current approach to AI "
description: As a developer I see AI as just another tool to rely on. I look at
  it as one source of input - a helpful one, but that's it.
date: 2025-05-12T09:38:00+00:00
draft: false
permalink: my-current-approach-to-ai/
---
I read a quote somewhere that "AI won't take your job, but someone who uses AI better than you will take your job." That rings true to me.

I have been making greater use of AI in the past couple years. Nothing I do is revolutionary - in fact, I see that as a plus right now. I'm definitely not "vibe coding" or anything like that.

My top uses of AI in my development work:

*   **Code completion** - in my editor (VS Code) the AI assistant (Github Copilot) will help me - sometimes\* - suggest the way to complete the code I'm intending to right. This can either be because of a comment that I write first, explaining the function that I'm intending to write and it does just that. Or sometimes just when I'm in the middle of the function it takes my beginning as cue.
    
*   **Unit tests** \- this is where I use ChatGPT. I'll bring it a function that has some business logic in it, and ask it to write unit tests for it. This is a place where, for me, AI really shines. It does the grunt work of structuring a _bunch_ of tests, and saves me the hassle. Sometimes the tests even point out ways to improve the function that I started with originally. I still need to read through the tests, though. I've found that while it can write 10 or more unit tests quickly, it still gets it about 20% wrong. Thankfully it usually gets it wrong in the same pattern, so it's easy to spot errors.
    
*   **Code explanation** \- this is again using VSCode & Copilot. We've been doing a lot of work lately migrating old functionality from one code base in python to a new codebase in typescript. The `Github Copilot: Explain` feature has been invaluable in this regard. It gives a good starting-point analysis of ancient code (that no one on the team wrote) and, well, explains it. I could probably do the same thing with enough time and just staring at the code, but this is a lot faster. What has been really valuable to me is that it has _spotted obscure forks of logic_ in the code that I wasn't understanding when I read through the code. That has led me to understand requirements of these functions, question them, and in many cases intentionally remove them in our new code.
    

\* I say sometimes because I find that the suggestions are in this maddening middle realm of being helpful enough of the time that I keep the feature enabled, but wildly wrong enough of the time to be aggravating. I am trying to find the middle ground, but I still find myself cursing the code completion at least five times a day.

Places that I think AI still aren't good at:

*   CSS - generally. It just sucks at it. I think that writing good CSS takes a lateral kind of thinking that AI has a hard time approximating. Put it this way - the same reason some people feel the need for something like Tailwind is the same reason AI can't write CSS.
    
*   Orchestration - AI still can't see the big picture. This is where I spend more of my time thinking because of AI, which really is a good thing.