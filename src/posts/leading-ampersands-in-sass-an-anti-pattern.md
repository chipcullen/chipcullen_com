---
title: "Leading Ampersands for modifiers in Sass: An anti-pattern"
date: 2018-01-05
draft: false
tags: [css, sass, scss]
permalink: "leading-ampersands-in-sass-an-anti-pattern/"
---

For several years now, I've been loving a Sass authoring pattern that looks like this:

```scss
.class-name {
  ... &--modifier {
    // styles
  }
}
```

Which would compile to:

```css
.class-name { ... }
.class-name--modifier { // styles }
```

This was great! I loved it because:

- It was terse
- It compiled to single class selectors, which kept specificity at bay

<!--more-->

I have heard, though, [people](https://twitter.com/glenmaddern/status/893296988837494784) [deplore](https://twitter.com/melaniersumner/status/935909192119959552) this pattern, and I never understood why. "It's great!", I said to myself. "It's not hard to follow", I said.

... now I know why.

The above pattern works great in very _small_ chunks of Sass. However, if you get past a 20 or so lines, **it's hard to keep the context of where you are**.

I just experienced this the hard way - I had to edit a piece of scss that _I_ had authored a while ago, which had a root selector like this that encompassed 200 lines or so of styling. Needless to say, it made current-day me's face melt.

Here are the problems with it:

## Loss of context

You end up looking at this in the middle of a file:

```scss
...
  &__block {
    // styles
  }

  &--modifer-3 {
    // styles
  }
...
```

Which is hard to grok.

## Sourcemaps can be borked

Also, when you have a long set of styles like this, your [sourcemaps](https://thesassway.com/intermediate/using-source-maps-with-sass) aren't much use when inspecting styles in dev tools. They'll point to the line of the root selector, even if your declared style is waaaaaay down the file. (Well, this is my experience. I may have a faulty setup.)

## Finding a desired class in your source code

Another issue is searching for selectors in your codebase becomes a lot harder, especially for another dev coming along after you. They probably just want to find the class in question and be done.

## Conclusion

Because our authored scss files are really artifacts that are there for other developers, this is a pattern best avoided. Excuse me, I have a _lot_ of code to go clean up.
