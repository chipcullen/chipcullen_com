---
title: "Looping Video Backgrounds: pointers and pitfalls"
date: 2016-08-01
draft: false
tags: [general, looping, video]
---

I just want to share some of the things that I've learned about implementing a 'video background' - one of those little videos that you typically find on home pages and landing pages.

![Media Boom's Homepage](../images/Screen-Shot-2016-08-01-at-2.45.13-PM-1024x730.png)

![The Life of Pi movie site](../images/Screen-Shot-2016-08-01-at-2.39.54-PM-1024x603.png)

I'm going to deliberately side step the question of "is this a good idea?" and just share some pointers around implementation.

<!--more-->

## The Video tag

Assuming you're going the HTML5 video route (you are, right?), and you have a URL to a video file, you will have to insert it as a `<video>` element that is absolutely positioned, with a z-index that places it behind your other content. Video CSS backgrounds are currently _not_ a thing.

You're probably going to want to end up with a video tag that looks like this:

```html
<video
    src="path/to/file.mp4"
    autoplay="autoplay"
    loop="loop"
    muted="muted"
    poster="path/to/poster.jpg">
</video>
```

Some notes on the attributes of this tag:

- For the love of all things good in this world, **include the muted attribute**: `muted="muted"`. You're adding a decorative element - no one wants to _hear_ it.
- Note the omission of the `controls` attribute - if you don't want users seeing the controls or pausing the video, simply leave it out.
- `loop="loop"` will, well, cause the video to loop. This has some performance implications - more on that in a bit

## The Poster Image

A crucial part of your implementation of a video background will be the poster image that you give to your video. It needs to be selected with care.

If you have control over it, **make the poster image match the first frame of the video**. The user will likely see the poster image before the video starts. This way it will blend seamlessly.

You can, if you want, dynamically swap images based on breakpoint size with javascript. However, do include one default image path or you'll likely see a flash of an empty box.

This is an instance where you'll want to choose a reasonable 'middle of the road' image size that looks okay across the most breakpoints and screen resolutions.

**Do not omit the poster image.** iOS (and recent versions of Android) will _not_ autoplay a video<sup>1</sup>, so the poster will act as a background image.

## Hiding the play icon for mobile OS's

Since the two most popular mobile operating systems will not autoplay a video, they add a play icon so that a user can initiate the video. However, since we are dealing with a background element, we don't want this icon to appear.

Here is the CSS that you can add that will hide the icon:

```css
video::-webkit-media-controls-start-playback-button {
  display: none;
}
```

If it still isn't working for you, try tacking on `!important`. Yes, this is a case where it's okay.

## Looping and performance

You're a conscientious web person: one of the things you're probably going to do while implementing this is to check your browser's development tools to see the performance impact.

That's when you might have a coronary: 18MB for single page? What's going on here?!? The video seems to be downloading over and over!

![What is going on here? The network tab is acting crazy.](../images/Cursor_and_Developer_Tools_-_http___mediaboom_com__and_Luxury_Marketing_Agency___NYC__Greenwich__Fairfield_County___Mediaboom_and_Developer_Tools_-_http___dev_pbs_org_3000_passport_videos_-1024x422.png)

Odds are, if you have your dev tools open, **you probably have 'disable cache' checked**.

!["Disable Cache" is checked in Chrome Developer Tools](../images/Cursor_and_Developer_Tools_-_http___mediaboom_com_-1024x321.png)

In which case, yes, every time the video loops, your browser will re-download the video. However, most civilians don't have their cache disabled.

Okay, now you can calm down. Uncheck 'disable cache' and then check out the performance.

**Note about the status of '206'** - this is different than your usual status 200 when an asset successfully downloads. You will probably run into this when you're looking at videos loading on a page (background or not).

What a [status 206](https://httpstatuses.com/206) means is that, depending on the browser, the video asset can sometimes be requested in _chunks_. This is good and bad. It makes sense for large assets, typically videos.

But there does seem to be some redundant data transfer, at least in my observation. In my case a single video file that was 4.5MB was requested in 3 chunks, which totaled 7MB.

## Performance overall is still an issue

There is no way of getting around it - **video backgrounds are just plain huge**. Even a video clip that is just 4-5 seconds, of reasonable quality, can weigh in at 4-6 _megabytes_ (compression can vary wildly between videos based on the imagery in the video itself). You don't want to be slapping this on every page of your site.

The one ray of sunlight in this performance nightmare is the mobile OS's (iOS and Android, anyway). By design, at the _OS level_, they _do not<sup>1</sup>_ download the video files by default, and they do not autoplay the videos.

They will download the poster image, which is why I emphasized it so heavily earlier.

I look at video backgrounds as a progressive enhancement: if you're on a browser that supports autoplaying of video (like a desktop browser), you'll get that experience. If not, you'll get a static image. Life goes on.

<sup>1</sup>Apparently[ iOS 10 will have some form of autoplay support](https://webkit.org/blog/6784/new-video-policies-for-ios/), but I've not braved the betas to test it out yet.
