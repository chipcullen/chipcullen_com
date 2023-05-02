---
title: "A new website: now on Eleventy!"
date: 2022-11-30T21:58:09-05:00
draft: false
permalink: "a-new-site-on-eleventy/"
description: "Announcing the new version of my personal website - this time around I built it in Eleventy."
tags: [general]
custom_properties: []
---

Sorry for the radio silence on this website for the last few months. I've been working in secret in rebuilding the site, on a different platform.

But wait - didn't I just rebuild the site a [few year's ago](/moving-to-hugo/)? Yes I did. [Hugo](https://gohugo.io/) is a great site generator, and I think it's a great project. But for my site's needs, it was time to move on.

## Why leave Hugo?

1. Hugo has a [built in syntax highlighter](https://gohugo.io/content-management/syntax-highlighting/) for code examples, which was really easy to use. Really, there was nothing to do. However, for my particular brand of front end development, and the code examples that are some of the most important content that I publish, that syntax highlighter wasn't that great. The code was hard to read - especially when I had examples of things like nested Sass.
2. This is more of a preference, but, I'll just say it: the template language is ... fugly. I always struggled to do even simple tasks when adjusting my markup.
3. I'm not a Go developer. There were a lot of assumptions underlying the project that I simply didn't share.

## Enter: Eleventy

I've heard lots of people in the front end community rave about Eleventy for a few years. After playing with it for a bit, I was convinced that it would be a better fit for my site. It addressed some of my major concerns:

1. The syntax highlighter [recommended by Eleventy](https://www.11ty.dev/docs/plugins/syntaxhighlight/) is based on Prism.js, which handles my code examples MUCH better than the Hugo one.
2. It supported multiple template languages, including [Nunjucks](https://mozilla.github.io/nunjucks/), which makes way more sense to me.
3. It is JavaScript based, which means I am able to understand some of the behind the scenes functionality much more readily.

## But what about performance?

Not going to lie - Hugo's biggest selling point is it's speed, and it lives up to the hype. It is wicked fast.

That said, Eleventy is _pretty darned_ [fast](https://www.11ty.dev/docs/performance/). Is it _as_ fast as Hugo? No. But, for my set of content (at the moment about ~70 pages), it's more than acceptable. Honestly, in my day-to-day working with it, I haven't really noticed the slow down. If I was working on a site with hundreds of pages, I might have a different perspective on this.

## Any drawbacks?

All that said, I did bump my head on a few things with Eleventy. It wasn't all roses and sunshine.

- No built in Sass support. In order to develop with Sass, I had to look around quite a bit to figure out how to incorporate it in my project. Ultimately I ended up using [Michelle Barker's](https://css-irl.info/) [Eleventy Parcel project](https://github.com/mbarker84/eleventy-parcel) as a starting point, which includes Sass support.
- It is _way_ too difficult to inspect content objects when you're developing a page
- No "draft" state. That was out of the box in Hugo. Not a _huge_ deal, but it was a nice feature.
- There are multiple documentation sites out there. The old ones _are_ clearly marked as deprecated, but it is still confusing when Googling an issue.
- The flexibility of multiple template languages also makes it hard to understand some pieces of documentation, which may or may not be in the language you've chosen.
- I generally feel like it could include a few more "batteries". I had to add custom code to output simple things like the current year.

## Conclusion

Overall I'm very happy with how this has turned out. The new framework let me work quickly, and I was able to understand the overall approach much better. I think the site conveys a lot of my personality, and looks very different from a lot of other sites out there.
