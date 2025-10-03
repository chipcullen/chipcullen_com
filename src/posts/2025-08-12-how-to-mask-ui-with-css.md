---
title: How to mask pieces of UI with CSS
description: The 'mask-image' rule and it's super powers.
date: 2025-08-12T01:48:00+00:00
draft: true
tags:
  - css
permalink: how-to-mask-ui-with-css/
---

Do you have an inline image that you want apply a mask to, dynamically? Do you want to fade out one edge of a card in your UI? What happens when the background changes?

CSS has got you.

I stumbled across the `mask-image` CSS property a little while ago, and was surprised I hadn't heard about it sooner. It can solve a great many UI issues elegantly! I'm not sure why more people in the front end world don't talk about it.

```css
.card {
  mask-image: linear-gradient(to top, transparent 0, black 60px);
}
```

The above bit of css will add a fade to the bottom 60px of a element with the class `card`.

`mask-image` is applied to _any element_, and allows you to declare a mask based on another image that you pass it. That image can be:

- an external image
- an SVG
- a gradient

If you've done masking in image editing software like Photoshop, you can think of a `mask-image` a bit like an alpha channel that you add to your UI via CSS.

## Gradients

In my work so far, I've only used `mask-image` with gradients, so that's what I'll start off with. You can describe a gradient, and just know that 100% black (i.e. `#000000` or `rgb(0 0 0).

## Mask Composite

```css
mask-composite: intersect;
```
