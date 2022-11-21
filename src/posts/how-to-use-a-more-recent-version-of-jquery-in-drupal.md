---
title: "How to use a more recent version of jQuery in Drupal (without jQuery Update)"
date:  2013-08-15
draft: false
tags: [drupal, jquery]
permalink: "how-to-use-a-more-recent-version-of-jquery-in-drupal/"
---

There are many things that I love about Drupal, but they way it incorporates jQuery is not one of them. Drupal 7 core comes with, and is tied to, a particular version of jQuery - 1.4.4. That came out in November of 2010. Since then, from a jQuery perspective, Drupal has been frozen in time.

"But wait," you say, "what about the [jQuery Update module](https://drupal.org/project/jquery_update)?" That is true, that module will do the job, but in a lot of situations, at too much of a cost. jQuery Update replaces jQuery across the whole site - which, unfortunately, breaks a lot of site admin tasks. [Check the issue queue for proof](https://drupal.org/project/issues/jquery_update?categories=All).

You can, however, achieve this in your theme by simply adding a preprocess function. Which, frankly, is a lot simpler if:

- You only need to replace jQuery on the presentation side - e.g., to use a recent jQuery plugin that depends on it.
- You're writing a custom theme for a particular project - if you're working on a contrib theme, you might want to consider including a test for the presence of jQuery Update, as you might still have a user who installs it.
- You don't want to touch the admin side of the site's jQuery. The theme you're writing will _only_ be used on the presentation side, and won't be enabled as an admin theme. Because you'd only reintroduce the jQuery incompatibility issues.

In order to do this, you need to insert something like this into your theme's template.php:

```php
function THEMENAME_js_alter(&$javascript) {
    $javascript['misc/jquery.js']['data'] = drupal_get_path('theme', 'THEMENAME') .
    '/javascripts/jquery-1.7.2.min.js';
    $javascript['misc/jquery.js']['version'] = '1.7.2';
}
```

All this really does is tell Drupal:

- replace the core jQuery file (found in misc/jquery.js) with another file
- the new jquery file can be found in the theme itself, within a folder called 'javascripts', and is 'jquery-1.7.2.min.js'
- the version of jQuery is 1.7.2.

You just need to replace 'THEMENAME' with the name of your theme, and adjust the path and file name to suit the situation in your theme.

Theoretically, you _could_ reference a hosted version of jQuery (e.g. on Google's CDN), but that would probably do weird things when JavaScript aggregation is turned on in production.

Lastly, be sure to test your site thoroughly if trying this technique. jQuery Update does more behind the scenes than simply replacing jQuery, so some contrib modules may play nicely with that module instead of this approach.

**UPDATE** - thanks to all the folks on [this Google Plus thread](https://plus.google.com/u/0/110338197829971889192/posts/Fhuu6H1nkLn) for the feedback on this post. I edited the post to be more clear about the use case for this technique based on their responses.
