---
title: "Using CSS Custom Properties and Logical Properties Together"
date: 2022-05-22T06:48:14-04:00
draft: false
permalink: "using-css-custom-properties-and-logical-properties-together/"
description: "How to combine custom properties and logical properties for layout super powers."
tags: [css]
custom_properties: [
  "--background-color-header: var(--green-bright);",
  "--color-drop-cap: var(--grey-dark);",
  "--font-weight-drop-cap: 500;"
  ]
---

Let's say you have a large website, with lots of views, with lots of components. And the designs for these components have spacing that shifts across breakpoints. It would be very easy for components over time to 'drift' and not line up with their neighbors. How can you wrangle that?

**CSS Custom Properties + CSS Logical Properties**

These will allow you to have less code, that is more consistent, at scale.

## What are CSS Custom Properties?

That's the proper name for [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*):

```css
:root {
  --brand-color: blue;
}

body {
  color: var(--brand-color);
}
```

## What are CSS Logical Properties?

CSS Logical properties are sort-of-newish properties that control layout in a _logical_ way rather than in a physical way. The idea is that these values are writing-direction agnostic.

```css
/* phyiscal property */
margin-left: 10px;
/* logical property */
margin-inline-start: 10px;
```

There are [a bunch of properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) that have been added that follow this idea.

If you are most used a left-to-right, top-to-bottom language (e.g. English, Latin-based languages), it's easiest to think of it like this:

- `top` and `bottom` are together the `block` direction
  - top is `block-start`
  - bottom is `block-end`
- `left` and `right` are together the `inline` direction
  - left is `inline-start`
  - right is `inline-end`

It gets more nuanced than that, but that is enough for this article.

## Why are Logical Properties better?

The shorthand is cleaner. That's really it. When I'm talking about spacing in a component, and keeping it consistent _across_ components, I'm generally talking about the padding or margin that is just inside the boundary of the component. And generally, I'm most concerned with the `left` and `right` as _one set of values_ being the same.

```css
padding-right: 10px;
padding-left: 10px;
/* vs */
padding-inline: 10px;
```

Same for the `block` direction:

```css
padding-top: 10px;
padding-bottom: 10px;
/* vs */
padding-block: 10px;
```

Sure, that's one less line of code - but it's one less invitation for inconsistency to creep in.

Overrides are also much cleaner:

```css
.card {
  padding: 10px;
}

@media (min-width: 800px) {
  .card {
    padding-left: 20px;
    padding-right: 20px;
  }
}

/* becomes */

@media (min-width: 800px) {
  .card {
    padding-inline: 20px;
  }
}
```

## Creating your Custom Properties

Across large projects components tend to have one set of values for their left and right visual margins. It is very important to keep these values consistent so that components feel unified as the user scrolls down the UI. Vertical margins, on the other hand, can be much more varied. They can intentionally have wildly different margins as a way to form visual emphasis.

Here is what I have found works really well - creating _spacing_ custom properties. And, having one for the `inline` direction, and one for the `block` direction.

```css
:root {
  --spacing-inline: 2rem;
  --spacing-block: 4rem;
}
```

These can then be used for either `margin`, `padding`, or `inset` values as needed.

```css
.card {
  padding-inline: var(--spacing-inline);
  margin-block: var(--spacing-block);
}
```

## Why is this better?

It's much, much easier to wrangle this in a responsive design. You can augment your custom properties like so:

```css
:root {
  --spacing-inline: 2rem;
  --spacing-block: 4rem;
}

@media (min-width: 800px) {
  :root {
    --spacing-inline: 4rem;
    --spacing-block: 8rem;
  }
}
```

**You don't need to maintain breakpoints in your component.** And your spacing across components will be much easier to keep consistent.

I can say from personal experience that this change alone has allowed me to **remove** a _lot_ of code from a lot of components, and given me the confidence that my components will be consistent moving forward.

## Bringing it all together

To demonstrate how this all can work together:

```css
:root {
  --spacing-inline: 2rem;
  --spacing-block: 4rem;
}

@media (min-width: 800px) {
  :root {
    --spacing-inline: 4rem;
    --spacing-block: 6rem;
  }
}

@media (min-width: 1200px) {
  :root {
    --spacing-inline: 5rem;
  }
}

.card {
  padding-inline: var(--spacing-inline);
  padding-block: var(--spacing-block);
}

.card--spaced {
  padding-inline: var(--spacing-inline);
  padding-block: var(--spacing-blocked);
  margin-block: var(--spacing-blocked);
}

.card--big {
  padding-inline: calc(var(--spacing-inline) * 2);
  padding-block: calc(var(--spacing-block) * 2);
}
```

I hope this gives you some ideas on how you can use CSS Custom Properties as well as Logical Properties to make your components more consistent.
