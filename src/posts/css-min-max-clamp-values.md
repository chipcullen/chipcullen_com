---
title: "CSS min(), max() and clamp() Functions"
date: 2020-04-30T09:15:37-04:00
draft: false
slug: "css-min-max-clamp-functions"
description: "A quick look at the relatively new, but well supported, min(), max() and clamp() functions and how you might use them."
tags: ['CSS']
custom_properties: []
---

## Intro

I've seen a lot of chatter lately about how some new CSS functions - `min()`, `max()` and `clamp()` are actually well supported. Even Safari supports `clamp()` as of 13.1.

## Intended audience

This post assumes that you're an advanced and experienced writer of CSS.

## Wait, CSS _Functions_?

A CSS function is a value that we can pass in as part of a rule that actually performs some logic. We've had one function for a while now - `calc()`.

```css
 /* whatever 100% is minus 32 pixels */
  width: calc(100% - 32px);
```

We just have three more functions that we can use.

## min()

`min()` is pretty straightforward - you pass it a list of comma separated values, and the *smallest* option is used.

```css
/* will be 100px or 10vw wide, whichever is smaller */
  width: min(100px, 10vw);
```

The order of the values doesn't matter:

```css
/* does the same thing */
  width: min(10vw, 100px);
```

You can even have _more than two_ if that helps:

```css
/* will be 100px, 10vw or 50% wide, */
/* whichever is smallest */
  width: min(10vw, 100px, 50%);
```

Technically you can have only one value for `min()` and `max()` but ... that would be rather silly, wouldn't it?

### Use cases for min()

Rather unintuitively, the thing that `min()` is really good at is creating a **maximum** value for something.

```css
/* will use a relative font size of 10vw, up to 5rem */
  font-size: min(10vw, 5rem);
```

```css
/* the third column will be 10vw wide up to 200px
  this is an alternative to minmax(),
  which is grid-specific */
  grid-template-columns: 1fr 1fr min(10vw, 200px);
```

```css
/* the image will be responsive
  and take up it's container width, up to 400px */
  img {
    width: min(100%, 400px);
  }
```

```css
/* will create relative padding using vh and vw units,
  but cap it at 20px */
  padding: min(5vh, 20px) min(5vw, 20px);
```

The above example builds on ideas [I started with here](/responsive-spacing-with-viewport-units/).

## max()

`max()` works just like `min()` but it will choose the *largest* value in the list provided.

```css
/* will be 100px or 10vw wide, whichever is larger */
  width: max(100px, 10vw);
```

As with `min()`, you can one or more values, and the order doesn't matter

```css
/* will be 100px, 10vw or 50% wide, whichever is largest */
  width: max(10vw, 100px, 50%);
```

### Use cases for max()

As the inverse of `min()` - the use case for `max()` is to establish a **minimum** value that a thing can be. I tend to write my CSS mobile first, that is, smallest use case first and then work my way up. Consequently, I don't think I'll be reaching for `max()` that often, if I'm honest.

```css
/* will use a relative font size of 10vw,
  but at least 5rem */
  font-size: max(10vw, 5rem);
```

```css
/* the third column will be at least 200px wide,
 but 10vw above when that is larger
 this is an alternative to minmax(),
 which is grid-specific */
  grid-template-columns: 1fr 1fr max(10vw, 200px);
```

```css
/* the image will be a minumum of 200px wide,
  but 100% wide beyond that */
  img {
    width: max(100%, 200px);
  }
```

## clamp()

`clamp()` is reallllly interesting, and I think will be what CSS authors really should reach for in a lot of responsive implementations.

While it's a related idea to `min()` and `max()` it is different in specific ways:

- Order matters
- It only takes *3* parameters

Those 3 parameters are

1. The minimum
2. The target value (ideally a relative unit)
3. The maximum

You use it like:

```css
/* will be 10vw wide, with a minimum of 100px
  and a maximum of 200px */
  width: clamp(100px, 10vw, 200px);
```

If you want to think of it another way, [as noted by MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp), it evaluates like this (using the previous example):

```css
 /* don't actually do this */
 width: max(100px, min(10vw, 200px));
```

### Use cases for clamp()

`clamp()` makes a lot of [intrinsic web design](https://www.youtube.com/watch?v=AMPKmh98XLY) ideas possible - that is, implementations that are responsive but not needing media queries.

```css
/* will be 10vw, with a minimum of 2rem
  and a maximum of 5rem
  to me, this is the responsive typography dream */
  font-size: clamp(2rem, 10vw, 5rem);
```

```css
/* the image will be responsive and
  take up it's container width,
  with a minimum of 200px and a maximum of 800px */
  img {
    width: clamp(200px, 100%, 800px);
  }
```

```css
/* will create relative padding using vh and vw units,
  with minimums of 8px and maximums of 20px */
  padding: clamp(8px, 5vh, 20px) clamp(8px, 5vw, 20px);
```

### clamp() and grid

From my experimentation, `clamp()` is *not a valid value* for use in CSS Grid. So, this is not a thing:

```css
/* not a thing. don't do this. */
  grid-template-columns: 1fr 1fr clamp(100px, 10vw, 200px);
```

## A note on using Sass / SCSS

Sass had `min()` and `max()` functions way before they were implemented in CSS. In order to not break existing Sass code, it works like this - if you pass in a Sass feature (like a variable), it will use the _Sass function_

```scss
  width: min($variable1, $variable2); // will use Sass's min()
```

If you are using Dart Sass, and if the function uses straight values, it will use CSS's function

```scss
  width: min(100px, 10vw); // works as before in Dart Sass
```

However, if you're using **LibSass or Ruby Sass, it will _always_ use the Sass `min` or `max` functions**, and consequently you may see this error:

`Internal Error: Incompatible units: 'px' and 'vw'.`

In order to use it with with those versions of Sass, you need to use the following syntax:

```scss
  width: unquote('min(100vw, 100px)');
```

or, with variables:

```scss
  width: unquote('min(#{$variable1}, #{$variable2})');
```

## Conclusion

I hope this post gives you an idea of how `min()`, `max()` and `clamp()` work, and more importantly, gives you some ideas of how you might use them. If you have some other use cases, let me know with a comment below!
