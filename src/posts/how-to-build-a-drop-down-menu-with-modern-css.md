---
title: 'How to Build a Drop Down Menu with Modern CSS'
date: 2024-08-27T09:00:00-04:00
permalink: 'how-to-build-a-drop-down-menu-with-modern-css/'
description: 'You can build a drop down menu with advanced functionality with CSS alone, thanks to recent advancements to the language. No onMouseOut listeners in sight!'
draft: false
tags: [css, scss]
---

We live in a golden age for CSS development. Recent advancements in the language, which are supported by all major browsers, let us build interfaces that used to require a _lot_ of javascript.

Take **drop down menus**. They're everywhere, and have been for decades. While basic drop downs have been acheivable using CSS alone for a long time (Bootstrap had a good implementation), advanced functionality has always required scripting.

I'm going to lean heavily on the `:has` selector and the new powers that it gives us as UI authors. I hope this article gives you some ideas of what you can do with it, and you come up with your own creative uses for it.

## Syntax

**For this article I'm going to use `scss` syntax** - I write Sass every day, and it's how I think. I've not tried this with [native CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting), but I imagine it's not all that different.

## Basic Dropdown with Modern CSS

### First, the markup

Let's say we're buildng the navigation for a site, and it only has one item. It's a link to an "About" page. I'm going to use an unordered list inside a `<nav>` so that other nav items could be added later. Let's add some classes to make this easier to style.

```html
<nav>
  <ul>
    <li class="menu-wrapper">
      <a href="/about" class="menu-trigger">About</a>
      <div class="menu">
        <a href="/about/blog">Blog</a>
      </div>
    </li>
  </ul>
</nav>
```

The whole implementation relies on a an outer selector, `menu-wrapper` containing _both_ the menu trigger, `menu-trigger` and the menu itself, `menu`.

### Making this work with modern CSS.

First let's make the `<ul>` horizontal and make the menu absolutely positioned so that it's taken out of the document flow. Let's also `display: none` it by default, as it won't be accessible to users on touch devices. We'll use `inset` to set it's positioning. We'll also need a `transition` for when we trigger the drop down.

```scss
nav ul {
  display: flex;
}

.menu-wrapper {
  position: relative;
}

.menu {
  position: absolute;
  display: none;
  inset: 100% auto auto 0;
  transition: opacity 0.3s ease-in;
}
```

Right now the menu will appear to just be a link that any user on any device can click.

#### Adding drop down behavior for mouse devices

We need to do is enable these functions when the user is on a mouse device. We'll use the `hover` media query to do that<sup>1</sup>. We need to set it to `display: block` so that we can animate the menu later. But we will also change the opacity to `0` so it's still visually hidden.

```scss
.menu {
  position: absolute;
  display: none;
  inset: 100% auto auto 0;
  transition: opacity 0.3s ease-in;

  @media (hover: hover) {
    display: block;
    opacity: 0;
  }
}
```

Now, we'll use modern CSS selectors - specifically `:has` - to trigger the drop down.

```scss
// on mouse devices
@media (hover: hover) {
  // if the outer wrapper
  .menu-wrapper {
    // contains a trigger that is hovered
    &:has(.menu-trigger:hover) {
      // then set the opacity of the menu to 1
      .menu {
        opacity: 1;
      }
    }
  }
}
```

This will trigger the menu - tada! We have a basic drop down.

You will notice it opens, but you can't get into it. We need to do a few more things to it to make it function the way would one expect. Specifically we need to add the menu itself to the list of `has` triggers so that it stays open while the user is hovering over it. We also need to add`pointer-events: none` while it's hidden so that hovering over it's physical location doesn't trigger weird behavior.

```scss
... .menu {
  position: absolute;
  display: none;
  inset: 100% 0 0 0;
  transition: opacity 0.3s ease-in;
  pointer-events: none; // avoids weird triggering

  @media (hover: hover) {
    display: block;
    opacity: 0;
  }
}

@media (hover: hover) {
  .menu-wrapper {
    &:has(.menu-trigger:hover),
    &:has(.menu:hover) {
      // this selector keeps the menu open
      .menu {
        opacity: 1;
        pointer-events: auto; // allows user to interact with the menu
      }
    }
  }
}
```

Much better!

#### Improving the experience for keyboard users

Now, let's make it even better for keyboard users who still have a mouse. We want the menu to be visibile if the trigger is in focus, or if anything inside the menu itself is in focus.

```scss
@media (hover: hover) {
  .menu-wrapper {
    &:has(.menu-trigger:hover),
    &:has(.menu-trigger:focus-visible), // if the trigger is in focus
    &:has(.menu:hover),
    &:has(.menu:focus-within) {
      // of if some item inside the menu is in focus
      .menu {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}
```

Here is the result (with some colors thrown in):

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZEdxXyM" data-pen-title="Drop Down with Modern CSS" data-user="chipcullen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chipcullen/pen/ZEdxXyM">
  Drop Down with Modern CSS</a> by Chip Cullen (<a href="https://codepen.io/chipcullen">@chipcullen</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
<br />
<br />

## Even more advanced usage

Let's say you have a search menu like so:

```html
<nav>
   <ul>
    <li class="menu-wrapper">
      <a href="/about" class="menu-trigger">About</a>
      <div class="menu">
        <a href="/about/blog">Blog</a>
      </div>
    </li>
    <li class="menu-wrapper">
      <a href="/search" class="menu-trigger">Search</a>
      <div class="menu">
        <form name="q" action="/search">
          <input type="search" placeholder="Search" aria-label="Search">
          <button role="submit">Go!</button>
      </div>
    </li>
  <ul>
<nav>
```

And you have the following requirements:

- that if the user has clicked into the search input, the menu should stay visible.
- If the user has entered any text (and not yet hit Go), the menu should stay visible

The first one is already addressed by this selector 😎:

<!-- prettier-ignore -->
```scss
  &:has(.menu:focus-within);
```

The second requirement is actually _super easy_ by adding this selector:

<!-- prettier-ignore -->
```scss
  &:has(input:not(:placeholder-shown));
```

Which is true if the placeholder _isn't show_ - which happens when the user enters text.

So the finished chunk of code looks like this:

<!-- prettier-ignore -->
```scss
@media (hover: hover) {
  .menu-wrapper {
    &:has(.menu-trigger:hover),
    &:has(.menu-trigger:focus-visible), // if the trigger is in focus
    &:has(.menu:hover),
    &:has(.menu:focus-within),
    &:has(input:not(:placeholder-shown)), { // if an input has text
      .menu {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}
```

## Bringing it all together

Let's bring this all together then, and DRY out our code a bit with the `:is` selector:

```scss
nav ul {
  display: flex;
}

.menu-wrapper {
  position: relative;
}

.menu {
  position: absolute;
  display: none;
  inset: 100% auto auto 0;
  transition: opacity 0.3s ease-in;
  pointer-events: none;

  @media (hover: hover) {
    display: block;
    opacity: 0;
  }
}

@media (hover: hover) {
  .menu-wrapper {
    &:has(
        :is(
            .menu-trigger:hover,
            .menu-trigger:focus-visible,
            .menu:hover,
            .menu:focus-within,
            input:not(:placeholder-shown)
          )
      ) {
      .menu {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}
```

Which results in:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="abgKPYJ" data-pen-title="Dropdown menu with 2024 CSS" data-user="chipcullen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/chipcullen/pen/abgKPYJ">
  Dropdown menu with 2024 CSS</a> by Chip Cullen (<a href="https://codepen.io/chipcullen">@chipcullen</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
<br />
<br />

You could further DRY it out with some more clever nesting with the initial `.menu` selector, but I think it hurts readability at that point.

## Conclusion

I hope this article gives you some ideas on how Modern CSS lets us accomplish things that used to require a lot of finicky scripting. With a little creative thinking, it's amazing what you can build with the tools we now have!

<hr />
<br />

<sup>1</sup> I know that it's not necessarily that simple to use the `hover:hover` media query, but I'm not trying to focus on that with this post. In my experience this usually covers most of _my_ use cases. If you're worried about users on devices that don't work as expected with `hover:hover`, you may have to adjust the media query here.
