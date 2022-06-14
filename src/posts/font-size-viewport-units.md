---
title: "Don’t use Viewport Units for Font Size on their own"
date: 2022-01-05T17:10:18-05:00
draft: false
slug: "dont-use-viewport-units-for-font-size-on-their-own"
description: "Be sure to pair viewport units with a relative unit when using them on font sizes, or you'll introduce an accessibility issue."
tags: [CSS, typography, accessibility]
custom_properties: []
---

A quick pointer on something I just became aware of - that is, using viewport units (`vw` or `vh`) for `font-size` declarations presents an accessibility issue. It will actually prevent users from being to increase the size of text by zooming in or out.

```css
/* don't do this */
font-size: 10vw;
```

Instead, pair it with a relative unit. If using it straight up like this, you can do so inside `calc`:

```css
/* using calc - adjust as necessary */
font-size: calc(10vw + .5rem);
```

Or, if using with a function such as `clamp`, you don't need `calc`:

```css
/* using clamp */
font-size: clamp(10rem, 10vw + .5rem, 16rem);
```

I want to dig into the best way to pair viewport units and relative units - but that's another post.
