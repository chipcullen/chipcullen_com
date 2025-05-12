---
title: How I built dynamic social media images in Eleventy using Cloudinary
description: My not very sophisticated but very understandable approach to
  making social media share images for a blog in Eleventy.
date: 2025-05-09T12:00:00+00:00
draft: true
tags:
  - eleventy
permalink: how-I-built-dynamic-social-media-images-in-eleventy-using-cloudinary/
---
For this blog, I have added dynamically generated social media images (think: `<meta property="og:image" ...`) based on the title of each post. There are many elegant solutions out there for this.

I didn't use any of them.

This is a quick and dirty way to achieve this. Though this was also the easiest way for my brain to wrap itself around the problem.

## Assumptions

*   You're using Eleventy (11ty)
    
*   You're using nunjucks templates
    
*   You have a Cloudinary account (the free tier is plenty for what we're doing here)
    
*   You want a social media image that has a background, and that background image is already in your Cloudinary media library
    

## Pros to this approach

*   Simple, easy to understand
    
*   No new packages needed
    
*   No need to add any funky bits to 11ty
    

## Cons to this approach

*   Harder to update
    
*   Harder to share across projects
    

## TL;DR

```html
{% raw %}
<!-- in your <head> partial -->
<!-- if we're on the homepage... -->
{% if './src/index' in page.inputPath %} ...
<!--  ... use a default social image  -->
<meta
  property="og:image"
  content="https://res.cloudinary.com/path/to/default/socialimage.png"
/>
{% else %}
<!-- if not on the homepage, use include the ogimage partial -->
{% include './ogImage.njk' %} 
{% endif %} 
{% endraw %}
```

Then we have a stand alone partial called `ogImage.njk`:

```html
{% raw %}
<!-- in ogImage.njk -->
<meta
  property="og:image"      content="https://res.cloudinary.com/chipcullen/image/upload/c_fill,e_negate,h_630,w_1200/c_fit,g_west,h_630,l_text:SourceSerif4Bold.ttf_70:{{ title | urlencode }},co_white,w_1000,x_20,y_20/g_south_west,l_text:Roboto_35:ChipCullen.com,co_white,x_20,y_40/v1669146466/pthalo_blue_texture_fyc8cy.png"
/>
{% endraw %}
```

## How did we get here?

*   Exploring a lot of permutations in the Cloudinary advanced Editor
    
*   Uploading a custom font
    
*   Making a template file that uses the https API from Cloudinary with our title inserted
    

## Getting Started with the Cloudinary Editor

As of this writing, in Spring of 2025, the Cloudinary Media Library looks like this:

![](/src/images/cloudinary_media_library_spring_2025.png)

Find the image you want to server as your background, and access it's advanced editor:

![The Cloudinary Library with a menu open and the Advanced Editing feature selected](/src/images/cloudinary_media_library_menu_to_advanced_editor.png)

Which then takes you to the advanced editor itself (note in this image I've already set an "Effect" of "Negate", which is like the Photoshop "Inverse" command):

![](/src/images/cloudinary_advanced_editor.jpeg)

(I think this is in actually the old school Cloudinary editor, and the default editor has been updated. However, the kind of operations we're doing are really only possible with the "Advanced" editor.)

In the editing controls, you will want to set the width to `1200` and the height to `630`. Here are the [OG image recommendations from Facebook](https://developers.facebook.com/docs/sharing/webmasters/images/).

Here is what my image looked like with the initial transformations applied:

![The cloudinary advanced editor with width, height, and effect options set.](/src/images/cloudinary_editor_options.png)

The important thing to note here is how the URL output updates, like so:

```
https://res.cloudinary.com/youraccount/image/upload/c_fill,e_negate,h_630,w_1200/v1669146466/filename.png
```

**We're going to rely on the URL api for our implementation overall.**

## Adding an Overlay

The actual text in your social image will be rendered as an "Overlay". So, you want to add an overlay with this button.

You then specify everything about the type itself, including the text content, with this input:

Separately, you can set the text's position with the Gravity setting, and an offset from the sides with the \_\_\_ input.

## Typeface choices

The documentation on what typefaces are available is ... uneven. I've found that typefaces that you find on most systems should work - you will need to try it out for yourself.

Cloudinary also claims that most Google Fonts are supported. In 2025 I think we can say that this _was_ true, but isn't now. I suspect that there is a manual process that Cloudinary needs to make in order for a new font to be supported. If you want to use a Google Font, you will need to try for yourself.

One pro tip - Google Fonts with spaces in the name use an `_` for the spaces. e.g. `Open_Sans`.

I had to upload a version of the typeface I use on my site - Source Serif 4 as of this writing - in order to use it in my social graphics. That's a [whole other procedure](https://cloudinary.com/product_updates/custom_fonts), and I'm not going to get into it now.