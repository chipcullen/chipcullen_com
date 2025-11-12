---
title: Changing the number of an item in an ordered list
description: A neat HTML trick I just learned
date: 2025-11-11T07:00:00+00:00
draft: false
permalink: how-to-change-the-number-of-an-item-in-an-ordered-list/
---
Today, I found out a neat HTML trick, and just want to write it down.

Let's say you're making an ordered list, and want the first two items to start 1, 2. Then, for some reason, you want to jump to 5. This HTML will do just that:

```html
<ol>
  <li>One</li>
  <li>Two</li>
  <li value="5">Five</li>
</ol>
```

Note that subsequent `<li>` 's will start iterating from that new value.

```
<ol>
  <li>One</li>
  <li>Two</li>
  <li value="5">Five</li>
  <li>Six</li>
<ol>
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VYaLKez" data-pen-title="HTML OL's" data-user="chipcullen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">

<span>See the Pen <a href="[https://codepen.io/chipcullen/pen/VYaLKez](https://codepen.io/chipcullen/pen/VYaLKez)">

HTML OL's</a> by Chip Cullen (<a href="[https://codepen.io/chipcullen">@chipcullen</a>](https://codepen.io/chipcullen">@chipcullen</a>))

on <a href="[https://codepen.io">CodePen</a>.</span>](https://codepen.io">CodePen</a>.</span>)

</p>

<script async src="[https://public.codepenassets.com/embed/index.js"></script>](https://public.codepenassets.com/embed/index.js"></script>)