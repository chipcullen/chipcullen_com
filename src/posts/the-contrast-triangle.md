---
title: "The Contrast Triangle"
date: 2020-02-11T08:27:09-05:00
draft: false
slug: "the-contrast-triangle"
description: "I've launched a new tool to help check three colors at once, for when you have hyperlinks without underlines."
tags: ["accessibility"]
custom_properties: []
---

Let's say you're building a site, and you're working with a designer. They come to you with some solid designs, and you're ready to go. You're also a conscientious front end developer and you like to make sure the sites you build are accessible. The designs you're working from have some body copy, but you notice that the links inside the body copy are missing underlines.

You are now in **[The Contrast Triangle](https://contrast-triangle.com)**.

In order for your text and links to be accessible, they both need to have sufficient contrast from the background, _as well as from each other_. This creates a [three-way design constraint](/accessible-links-without-underlines).

I've found myself in this situation many times over the years (some designers _really_ don't like underlines). I've also found it hard to articulate the issue with removing underlines. And every color contrast tool I've ever seen takes _two_ inputs, but this situation calls for three.

[So I built a three-way color contrast checker to help with this situation. Check it out!](https://contrast-triangle.com)

## Nerdy bits

My motivation was really a classic "scratch your own itch" situation. Still, in order to do this, I knew there were some pieces I was going to need to figure out.

Things I knew I wanted:

- To make this a react app. We use react at work, and I wanted to have another opportunity to get better at it.
- It would work based on query parameters so that people could easily send links back and forth if they were having discussions around this
- I wanted it to have a lot of tests
- Later into the project I converted to TypeScript
- It was going to be pretty static, as I was going to host on Netlify

### Query parameters

I knew I wanted this thing to be driven by query parameters pretty early on, just so users would have useful URL's. What I didn't realize was that what I was doing apparently isn't very common.

Basically, I was **saving state in query parameters**. I wanted those parameters to be the source of truth. I knew I could get away with this because there were really only three values the user would care about - the three colors required.

My thought was a user comes to the site, enters in some colors, and they instantly have a URL that they can share that shows their results.

Apparently, the whole state-in-query-parameters thing isn't very common. I only found one package in the react ecosystem that did what I wanted to do, and was fairly lightweight.

### Calculating Contrast

The biggest unknown for me, at the outset of this project, was how one calculates contrast. I knew that the other color contrast checkers did ... something, but I wasn't sure what.

This turned out to not be that hard. Basically, you determine **luminance** for the colors you are comparing, and derive the ratio of one luminance against the other. You can determine luminance pretty easily if you have rgb values.

### Translating Colors

This was the part that turned out to be a lot more complicated. I knew I wanted to support almost every color format:

- rgb and rgba
- hex 6, hex 3, hex 4 & hex 8
- named colors
- hsl and hsla

But in order to calculate luminance, I had to take all of those colors and convert them to rgb. So, I had to figure out:

- How to determine which color format
- Deal with alpha channels, if present
- Convert to RGB

It was this part of the project where **tests** really came in handy. In the course of writing some tests, I discovered edge cases and false assumptions that needed to be accounted for.

### React and Create React App

This is a pretty straightforward create react app, uh, app. I didn't really do anything fancy to the base project. I think I only added packages for Sass, typescript and testing.

## Check it out!

I hope you find this little tool helpful. [Give it a try](https://contrast-triangle.com), and let me know what you think in the comments.
