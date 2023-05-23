---
title: "How to make a color changing favicon"
date: 2023-05-23T12:00:00-04:00
permalink: "how-to-make-a-color-changing-favicon/"
description: ""
draft: true
tags: []
---

One of my favorite details of the ColoRosetta tool that I have built is the color changing favicon. It updates as you adjust the color in real time!

[need gif here]

And if you are using the tool in Safari, the overall color scheme of the browser will also update in real time, via the `theme-color` meta tag.

[need image here]

In this blog post I want to share the function that does this and explain how it works.

First, some context - ColoRosetta is a small React app. When a user changes a color input, first that change is validated, then the color is passed to the root `App` component. Within that component we determine _what kind_ of color it is, and pass both pieces of information to the `colorFavicon` function. That lives in it's own file:

```typescript
import { colorTypes } from './colorTypes';
import { translatedColor } from '../utils/translatedColor';

const colorFavicon = (incomingColor: string, incomingColorType: colorTypes) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    // @ts-ignore - not sure why TS thinks this could be null
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL("image/x-icon");
    document.getElementsByTagName('head')[0].appendChild(link);
    const color = translatedColor(incomingColor, incomingColorType, colorTypes.hex6);
    img.src = '';
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 32, 32);
    link.href = canvas.toDataURL("image/x-icon");

    const meta: HTMLMetaElement = document.querySelector("meta[name='theme-color']") || document.createElement('meta');
    meta.name = "theme-color";
    document.getElementsByTagName('head')[0].appendChild(meta);
    meta.content = color;
}

export { colorFavicon }
```

## The Favicon

Now, full disclosure - I got a lot of this functionality from [this Stack Overflow answer](https://stackoverflow.com/questions/6964144/dynamically-generated-favicon). What I've added here is the fact that it's being updated dynamically by react.

