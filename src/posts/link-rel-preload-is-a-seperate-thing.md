---
title: "The Link with rel=preload is a Seperate Thing"
date: 2022-05-11T20:57:16-04:00
draft: false
slug: "link-rel-preload-is-a-seperate-thing"
description: "Note to self."
tags: [CSS]
custom_properties: []
---

Filed under: "writing this down so I remember next time".

You ever read advice about using `rel="preload"` on stylesheet or some other asset?

I don't know why, but this part wasn't obvious to me:

_Adding a `<link>` tag with `rel="preload"` is a **new** instance of the `<link>` tag and does **not replace** you original `<link>`._

I don't know why this was not immediately apparent to me. It just ... wasn't.

```html
<!-- original -->
<link rel="stylesheet" href="./style.css">
```

```html
<!-- this WILL NOT replace the original; this will not cause styles to render -->
<link rel="preload" href="./style.css" as="style">
```

```html
<!-- this is what you actually need. both. together. -->
<link rel="preload" href="./style.css" as="style">
<link rel="stylesheet" href="./style.css">
```

The `<link rel="preload">` is a _hint_ to the browser that this asset is important to the page you're on, and should be downloaded early on.

You *only* want to use it for critical assets that affect the early rendering of your page.
