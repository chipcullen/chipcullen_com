---
title: "Pointer Events and Inline Elements in Chrome"
date: 2020-04-29T12:09:13-04:00
draft: false
slug: "pointer-events-and-inline-elements-in-chrome"
description: "Something interesting I learned about using pointer-events and Chrome on inline elements."
tags: ['CSS']
custom_properties: []
---

Today I learned something interesting about `pointer-events` and Chrome (from what I can tell, anyway).

Let's say you have a button set up like this:

```html
<button>
  <span aria-hidden="true"><svg ... /></span>
  <span class="visuallyhidden">Button text</span>
</button>
```

I do this kind of thing when I want to have an icon in a button. A common use case is a social sharing button.

Let's say you want to have a click event on the button, but it won't work if the `<span>` registers the click, so you do something like this:

```css
button span {
  pointer-events: none;
}
```

Oddly enough, in Chrome, the click event will still register with the span. This seems to be because `pointer-events: none` is being used on a *inline* element (in this case, a `<span>`).

You can do one of two things, then. Either swap the `<span>` for a block element like a `<div>`:

```html
<button>
  <div aria-hidden="true"><svg ... /></div>
  <span class="visuallyhidden">Button text</span>
</button>
```

OR, my preferred solution, add a display property to the CSS rule

```css
button span {
  display: inline-block; /* block also works */
  pointer-events: none;
}
```
