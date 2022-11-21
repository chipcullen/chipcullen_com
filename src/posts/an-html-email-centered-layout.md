---
title: "An HTML email centered layout"
date: 2012-04-17
draft: false
tags: [html email, tools]
---

So I'm still in the throes of some HTML email torture - I mean, work. My latest challenge was coming up with a centered layout that tested well across clients. Surprisingly, a lot of the solutions out there did not seem to test well - and the major problem child was Outlook (surprise surprise). If one layout worked in 2003 or earlier, it didn't work in 2007 & 2010, and vice versa.

So, I basically wanted:

- A fixed width (in this case, 600 pixels, which is considered best practice)
- Centered
- That worked in most clients (you can't win 'em all) - I particularly targeted Outlook, Gmail and Yahoo.

<!--more-->

After much trial and error, I came up with this starting point. Basically, it relies on all of the HTML/CSS tricks to achieve a centered layout, all piled on top of each other:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html><head><title>email Title</title></head>
    <body style="margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0;padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0;"><table width="100%" border="0" cellspacing="10" cellpadding="0" class="wrapper"><tr><td  align="center" valign="top" style="text-align:center;"><table border="0" cellspacing="0" cellpadding="10" class="main" style="text-align: left; margin-left: auto; margin-right: auto;"  width="600">
    <!-- email contents go here -->
    </table></td></tr></table></body></html>

Sorry for the lack of whitespace in the code- you have to strip out a lot of white space in the HTML that goes into email, or you get unwanted spacing creeping into your layout.

You have:

- HTML attributes of `align` used
- `margin: 0 auto;` via inline CSS
- `text-align:center;` on a parent element with `text-align: left;` on children. And those are applied inline. Fun times.

This has been tested and works in AOL, Mail.app, Gmail, iOS, Lotus Notes 8 & 8.5, Outlook 2000, 2002, 2003, 2007, 2010, Thunderbird & Yahoo Mail. I tested this using <a href="https://litmus.com/" target="_blank" rel="noreferrer">Litmus</a> (which rocks!).

I would love to hear if this helps anyone else - leave a comment below if you use this, or if you run into any issues.
