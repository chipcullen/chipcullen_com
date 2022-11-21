---
title: "How to have Dark & Light Mode Images that also works with User Choice"
date: 2022-04-15T17:16:35-04:00
draft: false
permalink: "how-to-have-dark-mode-image-that-works-with-user-choice-yo/"
description: "When we added a 'dark mode' to PBS.org's appearance, we wanted to allow users to have a choice to turn it on. That introduces some complexities that you need to account for."
tags: [css, media-queries]
custom_properties: []
---

When we launched a "dark mode" design on [PBS.org](https://www.pbs.org), we were excited at the better experience we were offering our users. We were going to make use of color preference media queries, and listen to a user's device settings to switch the color scheme.

There are lots of posts out there on how to apply changes to CSS for a 'dark mode' design, but I want to focus on what we had to do for _images_ on the site.

There were images that we wanted to be one way in 'light' mode, and a different way in 'dark' mode. Usually these were logos. In light mode we would have a full color version of the logo, but in dark mode we'd want the reversed (read: white) version of the logo.

That's actually pretty easy when you're relying on the user's color preference that they set in their device's OS:

```html
<picture>
  <source srcset="dark-mode.png" media="(prefers-color-scheme: dark)">
  <img src="light-image.png" alt="An image with two color modes">
</picture>
```
(Taken from this tutorial: https://dev.to/dailydevtips1/light-and-dark-mode-image-in-html-lji)

And this does indeed work well.

However, we wanted to introduce some UI that would allow a user to toggle the light or dark mode. This originally presented us with a logical challenge that we had to work through at the design phase, but what we ended up with was this:

- By default, we listened to a user's system setting
- A signed in user could choose light or dark, and override their system preference

I'm going to gloss over the UI piece of this, but we have three radio buttons that allow a user to choose:

- System
- Light
- Dark

If they chose one of the last two options, we store that choice in `localStorage`, with the key `appearance` and a value of either `light` or `dark`. If they choose "System" we simply clear localStorage.

What we then have is a small bit of JavaScript that we have in the `<head>` of all of our pages:

```javascript
var appearancePref = localStorage.getItem('appearance');
if (appearancePref) {
  document.querySelector('html').classList.add('appearance--' + appearancePref);
}
```

It's in the `<head>` so that we can append the `appearance-` class to our HTML element before the page renders, avoiding any flashes of one style then switching to another.

Now that we have all that in place, we had to come back to the question of images. I'm going to share our solution, but I will admit, it's not great.

We had to end up with some repetitive HTML like so:

```html
<picture>
  <source srcset="dark-mode.png" media="(prefers-color-scheme: dark)" class="image-appearance--system">
  <img src="light-image.png" alt="An image with two color modes">
</picture>
<img src="dark-image.png" alt="An image with two color modes" class="image-appearance--dark">
<img src="light-image.png" alt="An image with two color modes" class="image-appearance--light">
```

Then, to make the right version of the image appear, we needed the following CSS (this is in SCSS):

```scss
// If either appearance class is enabled, hide system images
html[class*='appearance'] {
  .image-appearance--system {
    display: none;
  }
}

// by default hide image-appearance--dark + image-appearance--light images
.image-appearance--dark,
.image-appearance--light {
  display: none;
}

// if the user has chosen dark, show the dark image
html.appearance--dark {
  .image-appearance--dark {
    display: inline-block;
  }
}

// if the user has chosen light, show the light image
html.appearance--light {
  .image-appearance--light {
    display: inline-block;
  }
}
```

The order and specificity took a while to come to. This is what it took to make the right things render and the right time.

If the user has expressed no preference, we rely on the `<picture>` element to listen to the system preference with the built in media query. But we need to toggle to the other images manually if the user has chosen an option.

If you are working on implementing a 'dark mode' on your site - I hope you find this helpful! Leave a comment if you have a better approach to the dark mode / light mode / user choice problem.
