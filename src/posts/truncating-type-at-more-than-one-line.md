---
title: How to Truncate Type at More Than One Line with Just CSS
description: Have a design where you want text to get cut off at 2 or 3 lines?
  You can do it with CSS alone.
draft: false
tags:
  - css
  - typography
permalink: truncating-type-at-more-than-one-line/
---
So, I learned something new recently and wanted to share, because it's really useful and also pretty whacky.

For years I've been [using this trick](https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/) to visually truncate text when it wanted to break the width of a container. It worked great, as long as you were okay with it staying to one line:

See the Pen [Text truncation at one line](https://codepen.io/chipcullen/pen/wvvxZQE) by Chip Cullen ([@chipcullen](https://codepen.io/chipcullen)) on [CodePen](https://codepen.io).

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

See the Pen [Line clamp](https://codepen.io/chipcullen/pen/oNNMdez) by Chip Cullen ([@chipcullen](https://codepen.io/chipcullen)) on [CodePen](https://codepen.io).

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

*   [MDN article on](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp#Example) `-webkit-line-clamp`
    
*   To the surprise of no one, [CSS Tricks has had info on this since 2013](https://css-tricks.com/line-clampin/)
    
*   The [Firefox release notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/68#CSS) when it got added