---
title: "A Javascript Component Pattern"
date: 2020-08-14T16:02:04-04:00
draft: false
permalink: "a-javascript-component-pattern/"
description: "A walk through the typical JavaScript pattern that we use at my work."
tags: ['javascript']
custom_properties: []
---

I just wanted to share the component pattern that we use for a lot of things at my work. I'm not saying this is the best way, or anything, it's just a pattern that we use consistently and it's scaled well for us over the years.

First off, I should mention that in the last year we converted to TypeScript, so that's what this post will use.

Here is what it looks like (with explanation by way of comments):

```typescript
/*** IMPORTS ***/
/* Library imports */
import Something, { namedSomething } from 'some-library';

/* Application imports */
import { anotherThing } from '../path/to/other/file';

/*** CACHING DOM ELEMENTS ***/
/**
 * Cache for referenced elements.
 * @type {object} cache
 */
interface CacheExpectations {
  someCachedItem?: HTMLElement,
  someOtherCachedItem?: HTMLElement,
  someCachedButton?: HTMLButtonElement,
}

let cache: CacheExpectations = {};

/**
 * Caches re-used elements.
 * @returns {function} setupCache
 */
const setupCache = () => {
  cache.someCachedItem = document.querySelector('#some-cached-item');
  cache.someOtherCachedItems = document.querySelectorAll('.some-other-cached-items');
  cache.someCachedButton = document.querySelector('#some-cached-button');
};

/*** LOGIC FUNCTIONS ***/
/**
 * Example logic function broken out on it's own
 * @param {number} numberVar - number to evaluate
 */
const exampleLogicFunction = (numberVar:number): number => {
  return numberVar > 0;
};

/*** EVENT HANDLERS AND SIDE EFFECTS ***/
/**
 * Example event handler
 * @param {Event} e - the click event
 */
const onItemClick = (e:Event): void => {
  console.log(exampleLogicFunction(3));
};

/**
 * Example event handler
 * @param {Event} e - the click event
 */
const onButtonClick = (e:Event): void => {
  console.log(exampleLogicFunction(-1));
};


/*** ATTACHING EVENT HANDLERS ***/
/**
 * Adds event handlers.
 */
const addEvents = (): void => {
  cache.someCachedItem.addEventListener('keyup', onItemClick);
  cache.someOtherCachedItems.forEach(item => {
    item.addEventListener('click', onItemClick);
  })
  cache.someCachedButton.addEventListener('click', onButtonClick);
};

/*** INITIALIZATION ***/
/**
 * Inits embed modal functions.
 */
const init = (): void => {
  setupCache();
  addEvents();
};

/* exporting our init function, plus any functions that can have unit tests */
export { init, exampleLogicFunction };

```

Then, when we want to use this component, this is how we invoke it from a page-level orchestration file:

```typescript
import { init as exampleComponentInit } from 'path/to/example/file';

exampleComponentInit();
```

## A word on consistency

I am not going to claim that is *the* way to write any component in your application, just that it's *our* way. We have been fairly consistent over the years of using this pattern, and it has probably saved us many many hours not having to get re-orientated every time we open a file.
