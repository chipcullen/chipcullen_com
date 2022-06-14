---
title: "Accessible links without underlines"
date: 2015-09-08 22:07:17-04:00
draft: false
tags: [accessibility, General]
---

**UPDATE** - I've launched [a new tool called The Contrast Triangle](https://contrast-triangle.com) that helps you deal with this situation. You can read more about it at [this blog post](/the-contrast-triangle/).

When styling hyperlinks within blocks of text, sticking to the convention of underlines is always preferable. It's clear, easily understood, and accessible.

If the design calls for text links to _not_ have underlines, but change the color of links, you are now confronted with a **three sided design constraint**.

Simply having a different color is not sufficient, because this difference _may not_ be perceivable to users with colorblindness or other visual impairments. Without underlines (or relying on alternate styling such as italics or bold treatments), you need to rely purely on **contrast** in order to be accessible.

And that contrast needs to exist between:

- The regular text color AND
- The link color AND
- The background color

**All three of these colors need sufficient contrast between each other.**

Contrast will be what makes a link look different enough from the text around it that a colorblind user will still be able to see that it is different.

## How much contrast?

**3:1**, [according to the WCAG 2.0 standard](https://www.w3.org/TR/2008/NOTE-WCAG20-TECHS-20081211/G183).

## How do I check?

Shameless plug: [my new tool called The Contrast Triangle](https://contrast-triangle.com).

There are quite a few contrast checkers out on the web. My personal favorite is the [Contrast Ratio by Lea Verou](https://leaverou.github.io/contrast-ratio/). It (and most other tools out there) only compare two colors, so there will be some manual work involved checking the three colors against each other.

**You need to compare your link color to your regular text color, and make sure the contrast value is above 3:1.**

Over and above that you need to make sure both your link and text colors provide sufficient **contrast from the background color**, (usually 4.5:1), depending on the size of your type.

[See the WCAG 2.0 standard on background/foreground contrast.](https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast)

## Special Thanks Thanks to [Dennis Lembree](https://www.dennislembree.com/) for spot checking this post.
