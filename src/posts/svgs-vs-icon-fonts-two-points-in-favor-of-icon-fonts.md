---
title: "SVGs vs. Icon Fonts: Two points in favor of Icon Fonts"
date: 2015-09-19
draft: false
tags: [icon fonts, svg, Web Typography]
---

There was some [interesting discussion on Twitter](https://twitter.com/netmag/status/644797891056373761) about SVG sprites and their superiority to icon fonts. While I agree that SVGs are by and large superior, there are two crucial points that I feel icon fonts _can_ present an advantage:

- Overall file size
- Internet Explorer support (but not the way you think)

<!--more-->

## File Size

When you have a set of icons that you'd like to use on a given project, the larger the set of icons, the more likely an icon font will have a smaller overall file footprint.

On one recent project, I generated an icon font with the excellent IcoMoon, which consisted of 29 icons. IcoMoon allows for exporting the same set as an SVG sprite.

- The icon font was 7kb
- The SVG sprite was 17kb

That's only a difference of 10k, but that's still an increase of 240%. For even larger icon sets it can be even more pronounced.

[See this post by IcoMoon's author about this very point.](https://icomoon.io/#post/429)

I'm not saying icon fonts will always and forever be smaller than SVG sprites - it's just been my limited experience thus far.

## Internet Explorer

If you are looking to utilize an SVG sprite in a manner similar to an icon font, which would be inserting `<svg>` elements into your markup, but relying on the `<use>` element inside to reference your sprite - see [this CSS Tricks article on the technique](https://css-tricks.com/svg-sprites-use-better-icon-fonts/).

The problem is that you probably _want_ your SVG sprite to be an external file, right? You don't want your pile of SVGs to be in the `<head>` of every document. Well, you _can_ reference an external file, and still employ the `<use>` element.

Except in Internet Explorer. (Whomp whomp)

Even the _new_ Microsoft browser, the `<use>` element referencing an external file is _not supported_.

Enter: [SVG4Everybody](https://github.com/jonathantneal/svg4everybody). Which is a great solution - it just ajax's your SVGs into the document in Internet Explorer.

But, you _don't_ have to do all that if you are using an icon font. It works, and works as far back as IE6.

Because of these two reasons, on a recent project I decided to go with an icon font. For now. I may revisit this decision as a future enhancement, as SVG [_does still present many advantages_](https://css-tricks.com/icon-fonts-vs-svg/).
