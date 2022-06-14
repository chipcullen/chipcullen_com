---
title: "How to Truncate Type at More Than One Line with Just CSS"
date: 2019-11-11T21:52:27-05:00
draft: false
slug: "truncating-type-at-more-than-one-line"
description: "Have a design where you want text to get cut off at 2 or 3 lines? You can do it with CSS alone."
tags: ["CSS", "typography"]
custom_properties:
  [
    "--background-color-header: var(--green-bright);",
    "--color-drop-cap: var(--blue-dark);",
    "--font-weight-h1: 300;",
  ]
---

So, I learned something new recently and wanted to share, because it's really useful and also pretty whacky.

For years I've been [using this trick](https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/) to visually truncate text when it wanted to break the width of a container. It worked great, as long as you were okay with it staying to one line:

<p class="codepen" data-height="215" data-theme-id="dark" data-default-tab="result" data-user="chipcullen" data-slug-hash="wvvxZQE" style="height: 215px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Text truncation at one line">
  <span>See the Pen <a href="https://codepen.io/chipcullen/pen/wvvxZQE">
  Text truncation at one line</a> by Chip Cullen (<a href="https://codepen.io/chipcullen">@chipcullen</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

```scss
.selector {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## But what about more than one line?

For _years_ I've had designers that I work with coming to me with designs where truncation happened at a second or third line. And, I've had to tell them over and over again "Sorry, no."

Well, now, it appears, we _can_:

<p class="codepen" data-height="512" data-theme-id="dark" data-default-tab="result" data-user="chipcullen" data-slug-hash="oNNMdez" style="height: 512px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Line clamp">
  <span>See the Pen <a href="https://codepen.io/chipcullen/pen/oNNMdez">
  Line clamp</a> by Chip Cullen (<a href="https://codepen.io/chipcullen">@chipcullen</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

It takes some truly bizarre CSS, though. Mainly, it takes the `-webkit-line-clamp` property (yes, `-webkit`), like so:

```scss
.selector {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

Now, the really interesting thing here is the [browser support](https://caniuse.com/#feat=mdn-css_properties_-webkit-line-clamp) for this: Safari, Chrome, Edge _and Firerfox_! So, yeah, it's pretty good to go.

The one thing to note is that [autoprefixer](https://github.com/postcss/autoprefixer) won't play nice with it for now, so you'll have to sidestep it:

```scss
.selector {
  /* autoprefixer: off */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

## Progressive enhancement

You can also set up your truncation with the old method, but use this new method when the browser supports `-webkit-box`:

```css
.selector {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@supports (display: -webkit-box) {
  .selector {
    /* autoprefixer: off */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: normal;
  }
}
```

Further reading:

- [MDN article on `-webkit-line-clamp`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp#Example)
- The surprise of no one, [CSS Tricks has had info on this since 2013](https://css-tricks.com/line-clampin/)
- The [Firefox release notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/68#CSS) when it got added
