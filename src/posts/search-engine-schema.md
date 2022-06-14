---
title: "A (Brief) intro to Search Engine Structured Data"
date: 2019-08-15T08:12:10-04:00
draft: false
slug: "a-brief-intro-to-search-engine-structured-data"
description: "What is structured data, how does it help search engines understand your content, and how to add it to your site."
tags: []
custom_properties: []
---

## A Caveat

I feel a little weird writing this blog post, because of a few factors:

- I am _not_ a Search Engine Optimization (SEO) expert by any means. I've worked _with_ such experts, and respect their knowledge and ability, and won't pretend to be anything close.
- I've seen almost _no mention_ of this subject in my usual reading circles of web development blogs. Any information on this tends to be found exclusively in SEO blogs. But this seems so crucial that I'm surprised it hasn't come up more.

So, I don't know if I'm missing something, but I'm here to share something that I've learned about structured data and it's impact on a website.

## What is structured data?

Structured data is a blob of structured data that is added to individual web pages. That data is constructed in such a way that a search engine crawler can parse it, and get a better understanding about your content.

## Why should I care about structured data?

If your site is primarily **content based** (as opposed to say, a single page app), and you care about getting traffic from search engines, **you should probably care**. This is one of the best ways that you can signal to search engines certain things about your content that they might not otherwise understand.

[To quote Google](https://developers.google.com/search/docs/guides/search-features):

> Structured data can help Google properly classify your page in search results, and also make your page eligible for future search result features.

## Okay, I'm listening. What does this look like?

The short version is that you add data into your page that isn't generally seen by normal users, but they could if they 'view source'd it.

There are three ways to introduce this data:

- A specially tagged **JSON object** that includes certain keys that search engines are looking for
- **Microdata** in the form of attributes that are added to individual pieces of markup
- **RFDa** ... I'll be honest, I didn't look into this too much

Google has [specified](https://developers.google.com/search/docs/guides/intro-structured-data#structured-data-format) that it **prefers the JSON object approach**,

> Google recommends using JSON-LD for structured data whenever possible.

but, depending on how your data is organized and the way you can retrieve it, it may not be possible to implement. Do what you can.

For the purposes of this article, I'm going to focus on JSON.

## Give me an example of a JSON object

When adding this data to a page, typically this JSON object will apply to that entire page, or URI. So, the first thing you need to consider is: _what kind of content is this?_

The reason is that depending on the _kind_ of content, there are different kinds of structured data that you will need to include, if you want a search engine to understand your content well.

For instance, lets say you have a blog. You could add something like this:

```html
<!-- this would go somewhere in the <head> of an html document -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "A (Brief) Intro Search Engine Structured Data",
    "dateModified": 2019-07-31T08:10:17-04:00,
    "datePublished": 2019-07-30T08:12:10-04:00,
    "image": "http://path/to/image.png"
  }
</script>
```

A few things to note:

- There is a special script `type` attribute - `"application/ld+json"`
- The `"@context": "https://schema.org"` indicates that this data follows the format laid out by <https://schema.org>
- The `"@type": "NewsArticle",` indicates that this is an article. There are several `@type`'s that Search Engines will understand. There is the list that Schema.org has, which is fairly long. However, Google only understands a subset of those `@type`'s - you can [see that list here](https://developers.google.com/search/docs/guides/mark-up-content#content_types).
- The article `@type` requires certain key/value pairs in order to be considered valid, at least by Google's estimation. [They spell out the required keys here](https://developers.google.com/search/docs/data-types/article#type_definitions). As you consider the types of content you have, think about which supporting pieces of data you will have available to you.
- This must be **valid JSON** in order for it to be parsed correctly

### Another example,

Let's say, for a [TV Show](https://developers.google.com/actions/media/reference/data-specification/tv-shows-specification):

```html
<!-- this would go somewhere in the <head> of an html document -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "description": "The 1980's, with monsters.",
    "genre": "Science Fiction Nostalgia",
    "image": "https://path.to.some/image.png",
    "name": "Stranger Things",
    "numberOfSeasons": "3",
    "containsSeason": [
      {
        "@type": "TVSeason",
        "name": "Season 1"
      },
      {
        "@type": "TVSeason",
        "name": "Season 2"
      },
      {
        "@type": "TVSeason",
        "name": "Season 3"
      }
    ]
  }
</script>
```

Note - this is considered [Media by Google](https://developers.google.com/search/docs/data-types/media), but adding this structure allows Google to understand more about the relationship between pieces of media.

## An example of a Logo

On a large site's homepage, which is really a landing page, you may want to just use that page to identify the organization itself. You can add a "Logo" JSON object like so:

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://yourwebsite.org",
    "logo": "https://yourwebsite.org/path/to/logo.png"
  }
</script>
```

## What about AMP?

You will notice in a lot of Google's documentation, they mention AMP implementations. If that's your thing, go for it.

I personally find [AMP super creepy](https://adactio.com/journal/tags/amp). That being said, I'm fine adding some data to my site if it helps Google understand it better.

There are non-AMP implementations of structured data - you should follow those.

## How do I test this?

Glad you asked! [Google does provide a Structured Data Testing tool](https://search.google.com/structured-data/testing-tool#) - you can give it either a publicly available URL, or paste in markup (if you're working locally). It can be super helpful in catching issues.

## Conclusion

I hope this brief introduction has given you at least a glimpse into structured data, and made you think about how it could benefit the sites that you work on. I fully acknowledge that I'm not an authority on this, so if you can offer any clarification, please leave a comment!
