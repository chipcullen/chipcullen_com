---
title: "Background Repeat and its Possibilities"
date: 2018-09-05T08:33:00-04:00
draft: false
slug: "background-repeat-and-its-possibilities"
---

There is a humble CSS Property that gets overlooked a lot, the humble `background-repeat`.

I recently only learned that there a few options other than `no-repeat` or `repeat` available to this, and that they have really [good browser support](https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat#Browser_compatibility).

## New Keywords

There are two CSS level 3 specification additions to the `background-repeat` property - `space` and `round`.

### `space`

```css
background-repeat: space;
```

With a repeating background image, using this keyword will repeat the image as many times as it can _without clipping the image_. Much like flexbox and `justify-content: space-between`, it will distribute the remaining space between the items that fit. The images in the background will stay their original size (or the one specified by `background-size`).

<iframe height='265' scrolling='no' title='background-size: space;' src='//codepen.io/chipcullen/embed/BOdrXL/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chipcullen/pen/BOdrXL/'>background-size: space;</a> by Chip Cullen (<a href='https://codepen.io/chipcullen'>@chipcullen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Note - if you use the `space` value, for the most part a `background-position` declaration will be ignored.

### `round`

```css
background-repeat: round;
```

I think this value is even more interesting, because what it does is actually _scales_ the repeated image such that all available room is taken up, until there is enough room for another instance of the image.

In the below example I've added an SVG background image with a border to illustrate how the image will scale up until another can fit, then they all scale down again:

<iframe height='265' scrolling='no' title='background-size: round;' src='//codepen.io/chipcullen/embed/bxrexw/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chipcullen/pen/bxrexw/'>background-size: round;</a> by Chip Cullen (<a href='https://codepen.io/chipcullen'>@chipcullen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Older Keywords

Just in case you didn't know the other keywords, they are:

```css
background-repeat: repeat;
```

This is the default for background images - they will repeat in a tile-like fashion in both dimensions.

```css
background-repeat: repeat-x; /* repeats horizontally */
background-repeat: repeat-y; /* repeats vertically */
```

If you only want a background to repeat in one direction, use these.

```css
background-repeat: no-repeat;
```

If you don't want any repetition at all.

And it supports these global values:

```css
background-repeat: inherit;
background-repeat: initial;
background-repeat: unset;
```

## Two Value Syntax

You can also specify separate repeat rules in two dimensions with the two value syntax:

```css
background-repeat: horizontal-keyword vertical-keyword;
```

So you could have:

```css
background-repeat: repeat space;
```

<iframe height='365' scrolling='no' title='background-size: repeat space;' src='//codepen.io/chipcullen/embed/pOrVeV/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chipcullen/pen/pOrVeV/'>background-size: repeat space;</a> by Chip Cullen (<a href='https://codepen.io/chipcullen'>@chipcullen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

See how the background tile clips because we use `repeat` in the horizontal dimension?

## Multiple Background Images

You can even manipulate `background-repeat` for multiple background images, so each follows different rules.

```css
background-image: url(path/to/image_1), url(path/to/image_2);
background-repeat: round round /* image_1 */, space no-repeat /*  image_2 */;
```

<iframe height='265' scrolling='no' title='background-size: repeat space; two images' src='//codepen.io/chipcullen/embed/YOxLeq/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/chipcullen/pen/YOxLeq/'>background-size: repeat space; two images</a> by Chip Cullen (<a href='https://codepen.io/chipcullen'>@chipcullen</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

So, take a fresh look at `background-repeat` - it can provide a lot of opportunities for happy discoveries.
