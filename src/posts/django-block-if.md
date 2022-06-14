---
title: "Django Templates: Block and If statements don’t work like you might expect"
date: 2019-02-24T09:10:09-05:00
draft: false
permalink: "django-templates-block-if/"
description: "Django templates may not respect if statements around block usage the way you expect. I found that out the hard way."
tags: ["django"]
---

I ran across this wrinkle in [Django Templates](https://docs.djangoproject.com/en/2.2/topics/templates/) at work the other day, and thought I should document what I found.

In a base template file, I had declared a [block](https://docs.djangoproject.com/en/2.1/ref/templates/builtins/#block) for use in page templates:

```html
<!-- base.html -->
{% block feature %}
{% endblock %}
```

When I went to _use_ that block in a page template, I wrapped _that_ usage in an `if` statement based on a feature flag (which is a boolean value I had set in a settings file):

```html
{% raw %}
<!-- page.html -->
{% extends "base.html" %}

{% if FEATURE_FLAG %}
{% block feature %}
  <p>Stuff went here</p>
{% endblock %}
{% endif %}
{% endraw %}
```

Here's the thing - even with the feature flag set to `False` - the **block on the page still rendered**.

<!-- prettier-ignore -->
```html
<!-- rendered page.html with FEATURE_FLAG = False -->
<p>Stuff went here</p>
```

It seems that the `block` declaration ignores/overrides the _outer_ `if` statement. I don't know about you, but that was _not_ what I expected.

The fix was to apply the feature flag boolean to the base template:

<!-- prettier-ignore -->
```html
<!-- base.html -->
{% if FEATURE_FLAG %}
{% block feature %}
{% endblock %}
{% endif %}
```

I was lucky that the blanket logic worked in this case, but it could have been an issue if I wanted more granular control.
