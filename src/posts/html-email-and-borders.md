---
title: "HTML E-Mail and borders: a hard-won lesson"
date: 2012-04-09
draft: false
tags: [email, html email, Tools]
slug: "html-email-and-borders"
---

I was working on an HTML e-mail, and ran into an issue with borders. I'm writing down what I found as a help hopefully to others.

First - HTML e-mail is a PITA. That said, our clients still want them.

<!--more-->

There are a couple things you need to know about coding for HTML email - like, you do everything in tables (how very 1998!). And your styles basically all have to be inline.

One general guideline that I've found mentioned again and again is that when coding an HTML e-mail is _do not use shorthand CSS syntax_. So, instead of this:

```html
<p style="font:bold 1em/1.4em Georgia,serif;">HTML e-mail sucks!</p>
```

You should write:

```html
<p
  style="font-weight: bold; font-size: 1em; line-height: 1.4em; font-family: Georgia,serif;"
>
  HTML e-mail REALLY sucks!
</p>
```

And this is generally good practice. Services out there like <a href="https://getfractal.com" target="_blank" rel="noreferrer">Fractal</a> will pick up on this when they run through your HTML.

### Except when it comes to borders!

If you want to have a border on just one side of a cell, some HTML e-mail clean up services will turn your code out like this:

```html
<td
  style="border-left-width: 1px; border-left-style: solid; border-left-color: #e9e9e9;"
></td>
```

After testing using Litmus - I found that _this 'longhand' border CSS does not work in most email clients_.

Rather, you should **use the normal CSS shorthand for borders**:

```html
<td style="border-left: solid 1px #e9e9e9;>&nbsp;</td>
```

Also, as a bonus tip:

```html
<td
  style="border-left: solid 1px #e9e9e9; background: #ffffff"
  bgcolor="ffffff"
  width="20"
>
  &nbsp;
</td>
```

If you need your table cell to have a background color, use both the inline style attribute _and_ the HTML attribute - these seems to work best. And, if the cell has no content, but you need it to be a certain width, the "&amp;nbsp;" will make the layout work in more e-mail clients.

The last bit of code there worked as expected in 17 out of 18 clients that I checked (the odd one out was the BlackBerry Curve, which didn't seem to like borders at all). It even works in Outlook 2007 and 2010!

Also, check out [this good collection of tips when it comes to coding HTML emails](https://www.campaignmonitor.com/design-guidelines/).
