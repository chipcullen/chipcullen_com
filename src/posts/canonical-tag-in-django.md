---
title: "Creating a Canonical Tag in a Django Template"
date: 2019-03-26T16:39:14-04:00
draft: false
slug: "canonical-tag-in-django"
description: "A quick tip on adding a canonical tag within Django templates, and why."
tags: ["django"]
custom_properties:
  [
    "--background-color-page: hsla(213, 100%, 88%, 1);",
    "--background-color-header: var(--grey-dark);",
    "--color-header: var(--grey-slight);",
    "--font-weight-h1: 422;",
    "--color-drop-cap: var(--grey-dark);",
    "--font-weight-drop-cap: 422;",
    "--background-color-code: var(--grey-slight);",
  ]
---

I am no SEO expert. I've worked in the past at a firm that specialized in SEO, but that was not my area of focus while there.

At work recently the idea of adding a `canonical` tag to a large django application came up. It took a little bit of figuring out, so I wanted to share what I learned.

I had previously heard of the `canonical` tag, but had never grasped _why_ one would want to add it to their site.

## What is a canonical tag?

A `canonical` tag is a `<link>` tag that you insert on a page as a cue to search engines (read: Google) that tells them which URL for a given page is the URL they should be pointing to. So, if you're on, say, `https://example.site/about`, you would have:

`<link rel="canonical" href="https://example.site/about/">`

Which, at first, seems a bit silly, right? Here is the thing, though — that URL could end up _anywhere_ on the internet, mangled by means over which you do not control, and search engines might find it. However, to them, these URL's are _all different_:

- `http://example.site/about/`
- `https://www.example.site/about`
- `https://example.site/about?page=1`
- `https://example.site/about?utm_campaign=something`
- `https://example.site/about?utm_campaign=somethingelse`

Your canonical tag will let a search engine know what the URL _of record_ should be. That will then be the URL that (hopefully) surfaces in search results if you happen to match.

## Adding a canonical tag in Django

I thought this was going to be relatively straightforward, but it wasn't _super_ clear what would solve my issue. I wanted a way to easily add this to select pages:

```html
<link rel="canonical" href="{{ something }}" />
```

What ended up being the most straightforward solution was to create a new variable in our [Context Processor](https://docs.djangoproject.com/en/2.1/ref/templates/api/#writing-your-own-context-processors) file that we use. I found a lot of advice on the right functions to use, but ultimately settled on this:

```python

def context(request):
    # stuff needed before defining context
    context = {
        'CANONICAL_PATH': request.build_absolute_uri(request.path),
        # any other context variables needed
    }

    return context
```

**And now I could use it like this in my templates:**

```html
<link rel="canonical" href="{{ CANONICAL_PATH }}" />
```

## The nuance of build_absolute_uri

The trick here was taking the `request`, and applying the built in `build_absolute_uri` [method](https://docs.djangoproject.com/en/2.1/ref/request-response/#django.http.HttpRequest.build_absolute_uri). A lot of advice on this issue pointed to using `build_absolute_uri` for creating canonical tags, but you'll often see it used like this:

```python
# DO NOT DO THIS
'CANONICAL_PATH': request.build_absolute_uri()
```

**THIS IS VERY BAD.** (In this case.)

Because `build_absolute_uri`, if not provided an argument, will simply get the _full path_ of the request.

If you have a URL like this:

`https://example.site/about?utm_campaign=something`

The resulting HTML would be something like this:

`<link rel="canonical" href="https://example.site/about?utm_campaign=something">`

Which is exactly what we _don’t_ want. Not only will this confuse search engines, it could totally wreak havoc on any caching mechanism you have in place.

So we _need to pass an argument_, which is `request.path` - that is the piece of the request URL after the host name, but before any parameters.

So, if we again went to `https://example.site/about?utm_campaign=something`

And we pass `request.path` as an argument:

```python
# *This* is what you want
'CANONICAL_PATH': request.build_absolute_uri(request.path),
```

That's the same as saying:

```python
'CANONICAL_PATH': request.build_absolute_uri('/about/'),
```

Which in our template yields:

```html
<link rel="canonical" href="https://example.site/about/" />
```

**Which is what we want!**

I hope you find this helpful!
