---
title: "Moving to Hugo"
date: 2018-08-28T09:19:01-04:00
draft: false
---

## Welcome to the newly hugo-ified ChipCullen.com

I've been fairly quiet on the blog front for a few months because I've had some other personal projects taking up my free time.

But, one thing I've been wanting to do for a while was to move my site to a static site generator. I'm not going to go over the typical reasons why - security, speed, etc - because I had a very different reason, honestly.

This blog for the most part is about development, and I show a lot of code examples. And, frankly, I wanted to smoothest, easiest authoring experience when it came to code examples.

Specifically I wanted:

- Github flavored markdown
- Especially code _fences_
- A fast site builder

After trying out a bunch of options, I landed on [Hugo](https://gohugo.io). It supported all of what I wanted out of an authoring experience, as well as it's _super_ fast.

### What are code fences?

That's the name for it when you author something in markdown and can have a block of code marked out like this:

````markdown
    ```css
      .some-selector { ... }
    ```
````

For someone who writes posts that feature a lot of code blocks, this is super helpful. As a bonus, the default syntax highlighting in Hugo is pretty good.

I had previously been running a Wordpress site, but found the markdown options to be ... not great. I also didn't like needing to resort to special fields / short codes to get decent syntax highlighting.

Also, as a developer, I have _no_ problem authoring via a git-based workflow.
