---
title: "New tool: ColoRosetta"
date: 2020-12-18T15:40:47-05:00
draft: false
slug: "colorosetta"
description: ""
tags: []
custom_properties: []
---

I launched a small side project a couple weeks ago, and I wanted to share more about it:

[ColoRosetta - a utility for translating colors](https://colorosetta.com)

The point of this tool is to be a one-to-many color translation tool. I've wanted something like this for years - a way to see one color, but see how it translates into multiple color spaces at once.

A couple things to point out about it:

-  It translates to color spaces with an alpha channel (rgba, hsla and hex8) and will also translate _from_ those spaces back to non-alpha colors. It assumes a white background for the translations. Ever have an RGBA value but want to know what it's 'flattened' value is? Now you can find out.
- The source of truth is the color in the query parameter in the URL - which means you can send URLs to others and they'll get the translations
- There is a color picker - this is dependent on how your browser responds to `input type="color"` - for instance, Chrome supplies it's own color picker, which sadly lacks an eye dropper.
- My favorite bit, though, is how I managed to get the favicon to update with the color. I got some help from very smart coworkers on this - I'll do a write up on how I pulled that off at another time.

## Tech used

- React and Create React App - this was a fairly small app, honestly
- Typescript
- A lot of pieces borrow from [The Contrast Triangle](https://contrast-triangle.com)

I hope you find it useful! Let me know if you're using it by leaving a comment below. I've decided to not include any kind of analytics, so I really don't know who is using it.
