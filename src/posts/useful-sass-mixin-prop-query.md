---
title: 'Useful SASS mixin - "prop-query"'
date: 2013-04-28
draft: false
tags: [mixin,sass, scss]
---

Just wanted to share a little mixin that I came up with that's pretty darned useful. I call it "prop-query":

```scss
@mixin prop-query($min-size, $property, $value) {
  @media screen and (min-width: $min-size) {
    #{$property}: $value;
  }
}
```

It's a pretty simple idea - it lets you specify a one-off rule that you want to change on a per-media query basis.

## Use Case

A good use case for this might be the font size of your paragraph text inside your main area. It might looks something like this:

```css
[role="main"] p {
  font-size: 1.4em;
}
```

But when your screen gets to a certain point, say, 1000px wide, your line length gets too long. In comes prop-query:

```scss
[role="main] p {
  font-size: 1.4em;
  @include prop-query(1000px, font-size, 1.6em);
}
```

Which simply embeds a media query inside the rule, per [SASS's cool media query feature][1]. It just does so in a much more succinct, readable way.

You can even change an element's properties several times in a row:

```scss
[role="main] p {
  font-size: 1.4em;
  @include prop-query(1000px, font-size, 1.6em);
  @include prop-query(1200px, font-size, 1.8em);
  @include prop-query(1400px, font-size, 2em);
}
```

## Usage

It's pretty straightforward. You have three parameters to set - minimum screen width, your desired property, and the value. That's it. If you've set your breakpoints as variables, those can be used for the first parameter.

## Caveat

Use this _ judiciously_, as it will result in very bloated CSS very quickly. It's really designed for one-off properties that change on a per-media query basis.

[I put it up as a gist here.][2]

## Update - Sublime Text Snippet

Thanks to commenter [Scott Nix][3] - he wrapped this up in a [handy snippet for Sublime Text][4]!

[1]: https://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#media
[2]: https://gist.github.com/chipcullen/5476098
[3]: https://scottnix.com/
[4]: https://gist.github.com/scottnix/5479839
