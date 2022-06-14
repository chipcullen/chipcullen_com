---
title: "Welcome to my New Design - 2019"
date: 2019-02-25T18:32:21-05:00
draft: false
slug: "new-design-2019"
description: "My site gets a makeover for 2019. Here's all about it."
tags: ["design"]
custom_properties:
  [
    "--background-color-page: var(--yellow-light);",
    "--background-color-header: var(--blue-light);",
    "--color-drop-cap: var(--blue-dark);",
    "--font-weight-h1: 300;",
  ]
---

Last year I made the move to [Hugo](/moving-to-hugo/), but at the time was using an [off the shelf theme](https://github.com/digitalcraftsman/hugo-steam-theme) for my blog.

As a front end dev, that's okay at first, but after a while … that's just _not cool_.

For a variety of reasons it's taken me a while to get a new, custom theme in place, but here it is!

Right now it seems very simple, but it does meet some of the goals I set for myself:

1. **A good reading experience** - was my first goal. The vast majority of my traffic comes from organic search. So, to me it was critical to let someone find their way to my site, read what they're here for, and get on with their life.
2. **A warm peronsality** - secondly, I wanted people to have the feeling that they're dealing with a friendly person. I try to author content that is approachable, and want the tone of my design to reflect that.
3. **Customizable** - this is where I think the most interesting bits are. I've laid some groundwork for Art Directed posts - in _Hugo_ - using some new CSS techniques. This post, for example, has a different page background color and nav bar color. I want to play around with that more moving forward.
4. **New units** - I wanted to play around some CSS units that I hadn't used before. Namely - `ch` and `vh` units. The `ch` units were especially handy - they are relative to a font size - namely, the width of the `0` character. Knowing that, I could put a max-width on my content well that was based on the font size (e.g. `80ch`).
5. **CSS Grid based** - Yeah, this whole site is pretty much written in `grid`. I haven't really bothered to put in a fallback, either. But then again I'm not sure the last time I had a visitor using IE.

I want to go into more detail about points **3** and **4** but those will be their own blog posts.

I hope you enjoy the new design! Let me know what you think - does it meet the goals that I set out for it?
