---
title: "How We Removed jQuery from a large app"
date: 2021-02-25T16:34:23-05:00
draft: false
slug: "how-we-removed-jquery"
description: "How we went about removing jQuery from a large application that had depended on it for many years."
tags: []
custom_properties: []
---

Last month my team at work accomplished paying off the single biggest piece of technical debt I have ever been a part of - we removed jQuery from PBS.org.

PBS.org is a sprawling application that uses Python/Django on the backend, and a mix of front end technologies. Among those front end technologies was extensive use of jQuery that touched every page of the site, and was still actively used in many components.

## Why remove jQuery?

This is not a slam on jQuery. It's a wonderful library if it solves your problem. If you are productive with it, keep using it! To be honest, I have a soft spot for it - I first made things happen with JavaScript because of jQuery.

However, we had moved on as a team with how we built front end components. Our code had evolved into being either "with jQuery" or "without". We have long wanted to standardize on the later.

## What are the benefits?

- Removal of a hefty asset which was loaded on every page of our site
- A more consistent code base. No longer will we have a mix of `$.ajax` and `fetch`

## What were the biggest organizational challenges?

As ever, time was the constraint. We've wanted to do this for years, but the reality was that this was going to take a concerted effort of several weeks. We needed organizational buy-in, and got it when our product manager gave us a window of time to clear up some technical debt before feature work resumed.

In the end, this effort took us six weeks, which included the holidays. During the time that we were working, we were pretty focused on just this.

## How did we approach this?

This was a large, messy, sprawling, problem. In order to make an actionable plan, though, I first needed to perform an **audit of where we used jQuery**.

I made a spreadsheet with every result for the string `jQuery` or `$` in our site, and made note of which files they were used in. I then went file by file and tried to figure out _in what way jQuery was being used_. I made note of whether or not jQuery-dependent libraries were being employed, or what methods were being prominently used.

## What was the overall landscape of jQuery usage?

- We had imported jQuery in 47 files
- There were two libraries still in use that still required jQuery
- Lots of jQuery methods in use, such as `.ajax`, `.isPlainObject`, `.trigger` etc
- Lots of the usual DOM manipulation and class toggling

## What was the plan of attack?

### 1. Remove the libraries that relied on jQuery

Slick Carousel had been used in all of our carousels at one time, but over time we've built new carousels using react and had in those cases used react-based carousel libraries. One of my team members set about replacing our remaining slick usage with a vanilla JS based library, [Splide](https://splidejs.com/).

We also had been using qTip for our popovers, but found a vanilla JS library to replace that, which was comparatively simple.

### 2. Have a standardized replacement for some of the trickier methods

For replacing `.ajax` we standardized on using `.fetch` across the site. This took a while to do, as we had made extensive use of `.ajax`, and the syntax adjustment to a promise was not a straight find-and-replace.

`.trigger` was also a method that we relied on - that is, triggering a custom event. However, this one turned out to not be that much of a lift, as vanilla JS custom events are pretty straight forward.

`.isPlainObject` was replaced by a method from [lodash](https://lodash.com/docs/4.17.15#isPlainObject).

### 3. Replacing basic DOM manipulation

At this point I made stand alone tickets for each file in our project to do the grunt work of removing basic DOM manipulation. I did a lot of this work so that my team members could focus on the more challenging work that I've already mentioned.

I'm not gonna lie - this was drudge work.

For a lot of this, the site [youmightnotneedjquery.com](http://youmightnotneedjquery.com/) was invaluable (though it isn't HTTPS).

One cool thing I learned: jQuery's `.closest` method has a [drop-in equivalent in plain JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest).
### 4. Bonus: trying for typescript conversion

All along we were also trying to migrate as many files as we could to [TypeScript](https://www.typescriptlang.org/). All of our new files are authored in TypeScript, so this was a chance to update old ones. Our success here was mixed - sometimes we could do the conversion easily. Other times the file was so complex that we didn't want to attempt it.

To be totally honest - a lot of the time the jQuery removal was maybe 15% of the time spent - the other 85% of the time was spent with making TypeScript happy.

### 5. Last step - removing the package from our build & templates

The above work was released to production as it was done, piece by piece.

This was the happy, final task - namely, removing the package from our dependencies, and removing it from our template files. (We had included jQuery as a page-level asset across our HTML, with app-specific code loaded after).

## What was the aftermath?

I'd love to say that the clouds parted and the sky opened in song, but alas the rollout of this removal was pretty quiet. We did get a lot more Sentry issues because we no longer had jQuery there to check if something was defined (or it failed quietly).

I was hoping to see an improvement in our Lighthouse score, but sadly that really didn't change much. I am surprised, our JS footprint had is greatly reduced.

I hope this insight on how we approached this helps you, if you're looking at tackling any large-scale deprecation. Let me know in the comments if you have any specific questions that I can help with!
