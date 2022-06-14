---
title: "What width and height attributes should you use with responsive images?"
date: 2020-10-31T09:15:03-04:00
draft: false
slug: "what-width-and-height-attributes-to-use-with-responsive-images"
description: "Best practice is to add `width` and `height` attributes to image elements in HTML to improve browser layout performance. "
tags: ['performance']
custom_properties: []
---
**Best practice is now to re-include the `width` and `height` attributes for images, like we used to back in the day.**

Who knew? I recently found out that [browsers were encouraging this](https://web.dev/optimize-cls/#images-without-dimensions).

It reduces what Google has labeled *Cumulative Layout Shift*, which is a fancy way of saying jank. They measure that as an indicator of performance.

If an image is like this:

```html
<!-- how we've done it in the era of responsive design -->
<img src="path/to/image.jpg" alt="alt text" />
```

A browser doesn't know what to do with that when laying out the page. It's when an image downloads that it knows what space it's supposed to take up. This leads to the page shift around as images download. Not good.

What you can do to help a browser, then, is to add `width` and `height` **set to two values that are equal to the image's aspect ratio**. Aspect ratio is the ratio of an images width compared to it's height. Now, if this image has _one_ size, that's pretty straight forward:

```html
<!-- Let's assume this image is 640 x 360 (i.e. 16:9) - NOTE - no units -->
<img src="path/to/image.jpg" width="640" height="360" alt="alt text" />
```

**You can still make this image _behave_ responsively with the same CSS that we've used for years:**

```css
img {
	width: 100%;
	height: auto;
}
```

## Responsive Image attributes

I don't know about you, but the majority of images I deal with on my work projects these days involve multiple resolutions and image formats.

```html
<!-- taken from a real project -->
<picture>
	<!-- for browsers that support webp -->
    <source
      type="image/webp"
      sizes="(max-width: 767px) 100vw,
            (max-width: 1023px) calc(33vw - 42px),
            596px"
      srcset="image_218x122.webp 218w,
              image_280x157.webp 280w,
              image_384x215.webp 384w,
              image_442x247.webp 442w,
              image_480x270.webp 480w,
              image_767x432.webp 767w,
              image_960x540.webp 960w,
              image_1534x864.webp 1534w">
    <img
      sizes="(max-width: 767px) 100vw,
              (max-width: 1023px) calc(33vw - 42px),
              596px"
      srcset="image_218x122.jpg 218w,
              image_280x157.jpg 280w,
              image_384x215.jpg 384w,
              image_442x247.jpg 442w,
              image_480x270.jpg 480w,
              image_767x432.jpg 767w,
              image_960x540.jpg 960w,
              image_1534x864.jpg 1534w"
      src="image_448x250.jpg"
      alt="Alt text"
      />
</picture>
```

Which attributes should we use? In the [web.dev guidance](https://web.dev/optimize-cls/#images-without-dimensions), they say:

> To ensure <img> width and height attributes can be set, each image should use the same aspect ratio.

Okay, fair enough - in the above example all the images do share the same _aspect ratio_ - 16:9.

But it's still not clear if any one of the above resolutions is preferable.

At first, I tried this:

```html
<picture>
	...
    <img
      sizes="..."
      srcset="..."
      src="image_448x250.jpg"
      width="16"
      height="9"
      alt="Alt text"
      />
      <!-- this is a 16:9 image, after all -->
      <!-- NOTE: don't do this -->
</picture>
```

I liked this for these reasons:

- It made the aspect ratio clear
- It separated this layout concern from the actual size of the image
- It indicates that CSS is getting involved in the actual layout

In a more a more [in depth article by Craig Buckler](https://blog.logrocket.com/jank-free-page-loading-with-media-aspect-ratios/), he advises against doing this:

> Any appropriate img width and height can be used since the image is resized by CSS (e.g., width="4" height="3". However, it is best to set a reasonable size to ensure the image remains visible in very old browsers, if CSS fails to load, or when a user style sheet is defined.

Which, fine, good point.

## Ah, but what _is_ "… a reasonable size" ?

My first instinct is whatever the size is that you would use for the default `src`.

But _is_ that the best size?

In our case, we typically set the `src` to be a slightly-less-than-middle-of-the-road size. Smaller resolutions and larger resolutions are available. This feels squirrelly to me.

```html
<picture>
	...
    <img
      sizes="..."
      srcset="..."
      src="image_448x250.jpg"
      width="448"
      height="250"
      alt="Alt text"
      />
      <!-- Using the default src dimensions -->
</picture>
```

After having given it some thought, though, I think my first instinct is correct.

**Set `width` and `height` to the resolution that corresponds to your default `src`.**

You have no reason _not_ to, and I don't think there is a better alternative. What matters with these attributes is that the _ratio_ is correct.

Assuming you have responsive image CSS in place, these attributes will have influence on the final rendered size of the image only if your CSS fails or if the user has overridden it with a local stylesheet. In either of those cases, the default size should be a usable experience anyway.
