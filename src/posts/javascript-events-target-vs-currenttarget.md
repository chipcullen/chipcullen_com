---
title: "JavaScript events: .target vs .currentTarget"
date:  2018-04-27
draft: false
tags: [General, javascript]
permalink: "javascript-events-target-vs-currenttarget"
---

This seemingly comes up for me every six months or so, and I struggle to remember the whys of this. I just thought I'd share this little pointer as a reminder to myself, and hopefully it helps others.

Let's say you have a clickable element, like a `button`, and you have some kind of inner element:

```html
<button>
  <div>Inner Div</div>
</button>
```

(Why would this come up? Well, for me, I most often have to do this if I want to use flexbox inside of a button, as Firefox doesn't like `display: flex` applied directly to a button. You have to insert an inner div and then get on with life. But I digress. Or you may have an SVG icon or image inside of a button.)

Let's say you write an event handler like so:

```javascript
const btn = document.querySelector("button");

btn.addEventListener("click", function(e) {
  console.log(e.target);
});
```

What do you think will happen?

...

You'll get the `div` because, well, that's what the user has in fact clicked on (even if the handler is written for the `button`:

```bash
> <div>Inner Div</div>
```

This is a problem if you’re expecting to do something based on the _button_ - like a data attribute.

That is where `currentTarget` comes in.

```javascript
const btn = document.querySelector("button");

btn.addEventListener("click", function(e) {
  console.log(e.currentTarget);
});

// returns <button><div>Inner Div</div></button>
```

That will return you the **element that is registering the click** - in this case, the `button`.

So, the thing to keep in mind is that if you _know_ that the source of an event doesn’t have children, you can use `target`. If you don’t know, or you already know that there are children, use `currentTarget`.
