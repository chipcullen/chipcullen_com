---
title: "Javascript Fallback Values on Variables and Booleans - a hard lesson"
date: 2019-08-14T08:10:58-04:00
draft: false
slug: "javascript-fallback-values-booleans"
description: "A lesson I learned using fallback values on a JavaScript variable, but ran into trouble when it dealt with a boolean."
tags: ["javascript"]
custom_properties: []
---

I discovered the other day that a feature I had written may have broken for months without me realizing it, and wanted to share it here (mostly as a note to my future self).

I had a user setting that was stashed in local storage - it could be either `true` or `false`, but if it wasn't set at all, I wanted that setting to be considered `true`. I wrote something like this:

```javascript
const settingFromLocalStorage = window.localStorage.getItem('setting');

const settingValue = settingFromLocalStorage || true;

if (settingValue) { ... }
```

This was very neat and tidy, and I thought covered my bases by providing a fallback value.

## This does not do what you think it does

Here is where I went wrong: I wanted to know if the setting was `true` or `false` and do different things based on that. I only wanted to _default_ to true if there was no setting at all (i.e. it was `undefined`).

The problem with fallback variable assignment like this:

```javascript
const settingValue = settingFromLocalStorage || true;
```

Is that **it will fallback if the first option is falsy, not just undefined**.

So:

```javascript
const settingValue = true || true; // evaluates to true
```

_and_

```javascript
const settingValue = false || true; // ALSO evaluates to true
```

So my feature would never perform the behavior it expected when the setting was `false`.

I had fallen into this trap because of this pattern's use for passing parameters to a function:

```javascript
// you'll see a lot of examples like this
const someFunction = (param) => {
  const someVar = param || `fallbackValue`;
  ...
}
```

I had gotten used to `const someVar = param || 'fallbackValue';` as a way to deal with undefined values and supplying a default. This works when you're dealing with strings, but it **does not do what you want if you're dealing with booleans**.

Hope that helps you!

## Update!

**Help is on the way!**

There is a proposal to add "Nullish Coalescing" to JavaScript to deal with this exact use case.

You can see [the proposal here](https://github.com/tc39/proposal-nullish-coalescing).

The gist of it is that the following syntax will do what I _thought_ I was doing:

```javascript
const settingValue = settingFromLocalStorage ?? true;
```

It has already landed in [Safari Technology Preview](https://webkit.org/blog/9497/release-notes-for-safari-technology-preview-89/), and [there is a babel plugin to support it](https://babeljs.io/docs/en/babel-plugin-syntax-nullish-coalescing-operator).
