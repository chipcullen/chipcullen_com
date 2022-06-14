---
title: "Django 3.1 gotcha: Referrer Policy has a new default, and it might break iframes and links"
date: 2020-08-27T09:31:08-04:00
draft: false
slug: "django-3-referrer-policy-change"
description: "In Django 3.1 the project updated the default 'referrer-policy' to be 'same-origin', which might lead to unexpected results in your project."
tags: ["django"]
custom_properties: []
---

## TL;DR:

If you have a Django application, and you've upgraded to 3.1 or later, and you make extensive use of `iframe`s or the `referrer` attribute in some way, you will want to think about setting `SECURE_REFERRER_POLICY` so that you aren't unwittingly walking into the new default of `same-origin`.

## Backstory

I'm sharing a hard lesson that we learned on a project at work, having to do with upgrading to Django 3.1.

This project involves at it's core experience an `iframe`. Inside that `iframe` is another application that depends on the parent frame's `referrer` attribute.

## What is a "referrer"?

A "referrer" is an attribute that a parent page shares with either an `<iframe>` or a link that let's that other frame/page know "this URL referred the user to you".

If **Site A** has a link to **Site B**, and a user clicks on that link, when they arrive at **Site B**, **Site B** would know what URL sent the user to them.

The same thing applies to `<iframes> ` - if Site A has an iframe to Site B, Site B would then know what was _referring_ to it.

## What is "referrer-policy", then?

You may or may _not_ want to share that information. By setting a referrer *policy*, you are declaring in what circumstances you want to share the referrer attribute. [There are lots of different options that you can specify](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy).

 As of Django 3.0, the framework allows you to set this policy.

## What changed in Django 3.0?

[Django 3.0 added a new setting](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-SECURE_REFERRER_POLICY) - `SECURE_REFERRER_POLICY`. It defaulted to `None` initially.

With that set to `None`, or in it's absence (which was the case in Django 2.x and below), no policy is set.

Browsers then, when they get a response in this situation, default to the policy  `no-referrer-when-downgrade` - more on what _that_ means in a minute.


## What changed in Django 3.1, then?

**In Django 3.1  `SECURE_REFERRER_POLICY` got *a new default* - `same-origin`.** [See the note here](https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-SECURE_REFERRER_POLICY).

Because we had never explicitly set `SECURE_REFERRER_POLICY`, that new policy went into effect in our parent application.

## Why is "same-origin" problematic?

Well, `same-origin`  _isn't_ problematic. In fact, it does make a reasonable default. It's more secure.

When the parent has the policy of `same-origin`, it will _only_ share the referrer attribute with other sites that have, well, the same origin. The origin is the full host URL, including subdomain. **Subdomains will not share referrers when the policy is "same-origin"**.

In our case, we had our parent application at `www.app.tld`, and the second app at `second.app.tld`. The policy of `same-origin` means that the `referrer` would not get shared in this case, which _lead to our broken second app_.

## How did you fix it?

The fix was pretty easy, once we got to the bottom of the issue. We added this one line to our application's `settings.py`:

```python
SECURE_REFERRER_POLICY = "no-referrer-when-downgrade"
```

Which explicitly tells the application to use `no-referrer-when-downgrade` as the policy. This allowed us to share `referrer` between subdomains, and thus restored our second application's functionality.

### no referrer when downgrade? huh?

This policy basically says "don't share the `referrer` when the child/link has a lesser security protocol, but otherwise always share the `referrer`". This is the default for the web.

That means if a parent site is `https://site.a` and it links to `http://site.b` - a `referrer` will  _not_ be passed. In all other situations (and in our case, most importantly, across subdomains), the `referrer` *will* be passed.

## Conclusion

If your app relies on `iframe`s, or links that rely on a `referrer` - make sure that you have thought through what your `referrer-policy` is.

I suggest you review [the MDN article on what the possible](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) values are and choose what makes sense for your project.
