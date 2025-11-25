---
title: The Return of the Font Combinator!
description: The Font Combintaor is back, better, and more standards driven than ever!
date: 2025-11-24T07:00:00+00:00
draft: false
tags:
  - typography
permalink: the-return-of-the-font-combinator/
---
I am super excited to share that I have _rebuilt_ the Font Combinator!

[https://font-combinator.com/](https://font-combinator.com/)

## What is the point of this tool?

This was originally inspired by a type specimen book that I had back in my print design days. It would let you quickly combine headline, subhead, and body copy fonts to see how they looked. That's what this tool does, using system fonts and [Google Fonts](https://fonts.google.com/).

## Why did you build it?

I had built a similar tool years and years ago. It was based on a pile of jQuery and depended on a plugin for the UI. I lost interest in maintaining it, and just took it down for the last few years.

Recently I was able to re-build it, though, using Web Standards!

## Features I'm proud of

*   _No_ framework
    
*   No build step or bundling. It uses ES6 imports straight up.
    
*   Uses Web Components
    
*   Specifically makes heavy use of styled select menus
    
*   Changes are tracked as query parameters so that you can copy & paste the link and send it to someone
    

It's literally an HTML, a CSS file, and a handful of JavaScript files. And it all just ... _works_.

And, now, I can choose to update it ... or not. It can stay pretty much as-is for years. Don't get me wrong, I have ideas for more features. But I have no dependencies to keep track of.