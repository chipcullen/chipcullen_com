---
title: 'How to stop page scrolling when you have an open dialog element'
date: 2024-06-12T09:00:00-04:00
permalink: 'how-to-stop-page-scrolling-with-open-dialog/'
description: 'A CSS one-liner to help with your <dialog> implementation.'
draft: false
tags: ['css']
---

I was implementing a `<dialog>` element on a recent project, but was bothered by how the page kept scrolling in the background.

I noticed that when a `<dialog>` is open, the browser adds an `open` attribute to that element.

```html
<dialog class="example-dialog" open>...</dialog>
```

Knowing that, combined with the `:has` [selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), makes this a pretty straightforward one-liner in CSS:

```css
body:has(.example-dialog[open]) {
  /* Poof! No more scrolling! */
  overflow: hidden;
}
```

A caveat here is that the `<dialog>` should not possibly need scrolling - that is, it should be pretty short in terms of content.

Hope that helps you!
