---
title: "Browser Dev Tools: Element Inspector Popover"
date: 2022-05-18T10:06:08-04:00
draft: false
slug: "browser-dev-tools-element-inspector-popover"
description: "Did you know? All three major browser engines offer an inspector popover for elements. Yeah, I didn't know."
tags: []
custom_properties: []
---

I was "today years old", as they say, when I stumbled across this feature in Chrome's [Dev Tools](https://developer.chrome.com/docs/devtools/). While you have Dev Tools open, if you hit **Command + Shift + C** (on Mac, I assume Ctrl + Shift + C on windows), you get this popover with lots of info as you hover over DOM elements:

![A page on PBS.org in Chrome with the layout inspector popover appearing while the mouse is hovering over various elements](../images/chrome-devtools-dom-inspector.gif)

## But wait, it gets better!

A coworker quickly pointed out that **Firefox has the same shortcut!**

![A page on PBS.org in Firefox with the layout inspector popover appearing while the mouse is hovering over various elements](../images/firefox-dev-tools-layout-inspector.gif)

At that point, I checked, and yep - **Safari also has this shortcut!**

![A page on PBS.org in Safari with the layout inspector popover appearing while the mouse is hovering over various elements](../images/safari-dev-tools-layout-inspector.gif)

## Differences

The information you get is between all three is a bit different. The versions in Firefox and Safari pretty much just show layout information. The Chrome version also includes some helpful accessibility information as well:

![The Chrome layout inspector, with accessibility features pointed out by an arrow](../images/chrome-dev-tools-layout-inspector-with-accessibilty-info.png)

I don't know how I _didn't_ know about this super handy feature, but now I do! I hope it helps you!
