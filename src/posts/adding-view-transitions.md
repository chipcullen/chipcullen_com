---
title: "Adding the View Transitions API to my personal site"
date: 2023-06-22T12:00:00-04:00
permalink: "adding-view-transitions-api/"
description: "How I added smooth page transitions to my site using the View Transitions API."
draft: false
tags: [css, view-transitions]
---

Last night I added some View Transitions to this very site, in production.

In order to see them, you need to have Chrome 114 or later [editor's note: I originally thought you needed 115, but I found that the below flags exist in 114, and the feature works], and have these flags enabled:

- [chrome://flags#view-transition](chrome://flags#view-transition)
- [chrome://flags#view-transition-on-navigation](chrome://flags#view-transition-on-navigation)

Not only is this site using the View Transition API, but it's using the _MPA_ API.

... and by MPA - I mean _website_.

FULL CREDIT: I got the idea, and copied and pasted liberally from, [Dave Rupert's excellent blog post](https://daverupert.com/2023/05/getting-started-view-transitions/) about doing the same thing.

I added this meta tag, and I was in business:

```html
<meta name="view-transition" content="same-origin" />
```

A few key differences that I needed to make that are different from what Dave did:

- Because my header changes from the home page to my post view, I made the root `html` element my `view-transition-name` element.

```css
:root {
  ...
  view-transition-name: root;
}
```

I also found that I needed to take the reverse tack when accommodating users who prefer reduced motion:

```css
@keyframes fade {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

/* Old stuff coming out */
::view-transition-old(root) {
  animation: fade 0.2s linear forwards;
}

/* New stuff coming in */
::view-transition-new(root) {
  animation: fade 0.3s linear reverse;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.001s;
  }
}
```

But that works pretty well in my testing.

And the best part - **this is a progressive enhancement**. If you don't have a browser that supports view transitions, my links are ... links. But if you _do_ have support for view transitions, it's a pretty slick experience.

Personally I think that this is one of the most exciting things to happen to the web platform in a long time. This will make it dead simple for websites to make experiences that feel smoother and more intuitive, something that "apps" have had an advantage in for a long time.
