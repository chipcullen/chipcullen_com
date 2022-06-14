---
title: "A little known Media Query: Aspect Ratio"
date: 2022-01-03T17:30:17-05:00
draft: false
slug: "media-query-aspect-ratio"
description: "Did you know? You can make a media query based on a viewports aspect ratio, not just it's width."
tags: [CSS]
custom_properties: []
---

As we are eagerly looking forward to [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries), and an overall push towards [intrinsic design](https://css-tricks.com/tag/intrinsic-design/), I wanted to point out that there is a kind of media query that often gets overlooked: **[aspect ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio)**.

```scss
// width / height
@media (min-aspect-ratio: 16/9) {
  // something you want to happen at a wider than 16:9 aspect ratio
}
```

That is, you can create a media query that is based on the _viewport's aspect ratio_ - not simply it's width.

To be fair, use cases for this are few and far between. Some that I can think of:

- If you are displaying some kind of takeover element, basing it on the overall aspect ratio would make a lot of sense. Think: a photo gallery in lightbox mode.
- You're building some kind of widget that is used via an iFrame that you are counting on. Think: if you are building a video player that is embedded on other sites
- Adjusting "[macro layouts](https://web.dev/learn/design/macro-layouts/)" without measurement-based media queries. While this may be more device friendly, it may be harder to communicate about.
- I could see this being useful in things like games that are built to the viewport size

There are three variations of this media query:

```scss
// wider than 16:9
@media (min-aspect-ratio: 16/9) {...}
// narrower than 16:9
@media (max-aspect-ratio: 16/9) {...}
// exactly 16:9
@media (aspect-ratio: 16/9) {...}
```

## Support for the Aspect Ratio Media Query

Now, this might be the part where you expect me to tell you that this only works in one current browser or something.

[It actually has great support](https://caniuse.com/mdn-css_at-rules_media_aspect-ratio), and has for a while. It was in IE9 and Safari 4.2!
