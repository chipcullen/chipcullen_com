---
title: "Sass’s trailing ampersand and modular code"
date: 2013-12-02
draft: false
tags: [SASS, Sass, scss]
permalink: "sass-trailing-ampersand-modular-code/"
---

I recently learned of a feature of [Sass](https://sass-lang.com) that I think is extremely powerful, and little known about. I’m not even sure if it has a proper name[\*](#footnote), so I’ll make one up and call it the “_insert_ parent selector”. And it can help you deal with exceptions or variations that might make otherwise modular code become unruly.

And all it comes down to is a trailing ampersand - “&”.

If you’ve been using Sass for any length of time, you have probably used the more well known nested selectors:

```scss
p {
  color: black;
  a {
    color: red;
  }
}
```

Which compiles to this in CSS:

```css
p {
  color: black;
}
p a {
  color: red;
}
```

And that’s awesome. It’s one of the most powerful features of Sass, and one of the most compelling reasons to switch to a preprocessor.

Let’s say you’re trying to create modular chunks of CSS that pertain to the components in your project. Using nested selectors like the ones above, it’s pretty easy to create self-contained chunk of code:

```scss
.search-form {
  label {
    color: purple;
  }
  input\[type="search"\] {
    color: green;
  }
}
```

But, like most things in development, it’s the _exceptions_ that screw up your best laid plans. What happens to your search form on the search results page, and maybe it has moved from the top right of the page to the `<main>` content area?

That’s where the “insert parent selector” comes in. You can nest a _parent selector inside the original selector_.

```scss
.search-form {
  label {
    color: purple;
  }
  input\[type="search"\] {
    color: green;
  }
  main & {
    color: black;
  }
}
```

By inserting the _trailing_ ampersand (“&”), you will create a compiled piece of CSS that looks like this:

```scss
main .search-form { … }
```

That is **very** powerful. This allows you to truly create modular chunks of code that are really easy to manage.

Think of the possibilities - use [Modernizr](https://modernizr.com)? Now it is really easy to keep variations based on Modernizr-supplied body classes, e.g. `.no-svg &`.

Use the [HTML5 Boilerplate](https://html5boilerplate.com) trick of attaching IE classes to the root HTML element? Ditto for `.ie8 &`.

There are a few rules that I’ve been able to figure out around the “insert parent selector”:

Whatever preceeds the ampersand will be inserted before _all_ selectors that it is nested within. So:

```scss
.foo {
  .bar {
    .test & { …
      }
  }
}
```

Will compile to:

```css
.test .foo .bar { … }
```

However, it _will_ respect nested media queries:

```scss
.foo {
  @media (min-width: 600px) {
    .test & {
        …
    }
  }
}
```

Will compile to:

```css
@media (min-width: 600px) {
    .test .foo { … }
}
```

Even this:

```scss
.foo {
    .test & {
        @media (min-width: 600px) {
            …
        }
    }
}
```

Will still compile to the same thing:

```css
@media (min-width: 600px) {
    .test .foo { … }
}
```

It will also work as expected within an [extend directive](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#extend):

```scss
%testextend {
    .test & { … }
}
.foo {
    @extend %testextend;
}
```

Will compile to:

```css
.test .foo { … }
```

I only learned about this feature of Sass recently, while I was mid-project. Based on this little feature, though, I was able to refactor several large pieces of code, and probably cut down my .scss files by almost a hundred lines. This feature has had me radically rethink how I architect my .scss files, and will allow me to truly create some modular pieces of code.

Further reading:

- [The ampersand & a killer Sass feature](https://www.joeloliveira.com/2011/06/28/the-ampersand-a-killer-sass-feature/) by Joe Oliveira.
- [Referencing Parent Selectors using the ampersand (&) character](https://thesassway.com/intermediate/referencing-parent-selectors-using-ampersand) by Adam Stacoviak

- As far as I can tell, it’s only been referred to as “a trailing ampersand”, which isn’t that fun of a name.
