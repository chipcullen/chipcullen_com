---
title: "Why SVG is so cool (or: what happens when you're late to the party on something)"
date: 2014-01-08
draft: false
tags: [general, learning, svg]
---

This post is more confessional than anything else. In 2014 one of the things I wanted to learn more about was SVG - Scalable Vector Graphics.

_Man, am I late to this party._

I will confess that until _very_ recently, I really didn’t know much about SVG, and had not really explored it or understood it. I knew the basic idea that it was a web-native vector format, and they were scalable, but that was about it. I also knew that IE8 and below didn’t support it, and as my day job still requires supporting IE8, I kind of ignored it as ‘not usable’ right now.

## Okay, so what’s so cool?

The “aha!” moment for me was when it dawned on me - _SVG elements are composed of child elements which are styleable and scriptable_!

THAT is what I think is so cool about SVG - _you can have control over the inner pieces_ of a placed graphic.

It’s pretty much like anything else in HTML. So instead of this:

```html
<div>
    <h2>A title</h2>
    <p>Yadda yadda</p>
</div>
```

You can realize that SVGs are just this:

```html
<svg>
    <circle />
    <rect  />
    <path />
</svg>
```

Those child elements can have classes and ID’s applied to them. You can style them (to a certain extent) with CSS. You can manipulate them with JavaScript. Heck, [you can even use CSS animations on them](https://codepen.io/chippper/full/vBxEm).

## Good job, welcome to 2003

I know the SVG standard has been around for over 10 years. I realize that I’m kind of a big dummy for not picking up on this until now.

But you know what - there is a LOT to know about our industry, and there are only so many hours in the day. I was bound to miss something, and this is me (perhaps embarrasingly so) admitting to something I didn’t know.

I hope that maybe writing about this will set a lightbulb off in someone else’s head, and get them excited to find out more.

I’m also curious to hear what other people only learned recently, and felt ‘late to the party’ about. Is there something out there that you’ve heard tons of buzz about, but still haven’t a clue what it is?

It’s only natural to be reluctant to acknowledge what we _don’t_ know about - but, I think sometimes just putting it out there and saying it will perhaps prompt us to fill in that gap.
