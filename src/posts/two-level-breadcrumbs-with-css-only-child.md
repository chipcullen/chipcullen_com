---
title: "Two level breadcrumbs with CSS :only-child"
date: 2015-10-03
draft: false
tags: [css, pseudo-selectors, Sass]
---

There was a situation where we had some breadcrumbs being produced by a CMS. The problem was that the breadcrumb appeared on the top-level page as well as it's children pages. On the top level page it came across very redundant, and this single level breadcrumb would appear right above the page title. However, we wanted the breadcrumb trail to still appear on the second level pages.

Ideally, this kind of situation would be dealt with at the template level, and the markup would simply be absent. In this case, we couldn't change the template, we could only change the CSS.

The solution was the **CSS :only-child pseudo selector.**

<!--more-->

The markup on the top level page looked like this:

```html
<ul class="breadcrumbs">
  <li>Item One</li>
</ul>
```

While the second level pages looked like this:

```html
<ul class="breadcrumbs">
  <li><a href="#">Item One</a> ></li>
  <li>Item two</li>
</ul>
```

This is all that needed to be added to the CSS (as Sass):

```css
.breadcrumbs {
  li {
    display: inline;
    &:only-child {
      display: none;
    }
  }
}
```

You can see it working here:

<p data-height="268" data-theme-id="0" data-slug-hash="GpWmGK" data-default-tab="result" data-user="chipcullen" class='codepen'>See the Pen <a href='https://codepen.io/chipcullen/pen/GpWmGK/'>Smart Breadcrumbs with CSS :only-child</a> by Chip Cullen (<a href='https://codepen.io/chipcullen'>@chipcullen</a>) on <a href='https://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
