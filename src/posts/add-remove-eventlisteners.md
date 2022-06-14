---
title: "Troubleshooting Adding and Removing EventListeners: with Arguments, Debounced, and in a React Class"
date: 2018-11-03T08:14:51-04:00
draft: false
slug: "troubleshooting-adding-and-removing-eventlisteners"
---

The other day I was struggling with a bug that was caused by an [eventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) not being properly removed in a React Component. I struggled for a long time with _why_ the eventListener wasn't getting removed, and learned several things along the way I wanted to share.

## The original component, and the issue

The code in question followed this pattern:

```javascript
import ReactDOM from "react-dom";
import React, { Component } from "react";
import { debounce } from "../utils";

class myComponent extends Component {
  constructor(props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);
  }

  // Acts on the user's scroll
  scrollListener() {
    // do stuff
  }

  componentDidMount() {
    window.addEventListener("scroll", debounce(this.scrollListener, 100));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", debounce(this.scrollListener, 100));
  }

  render() {
    return <myComponent />;
  }
}

export default myComponent;
```

To walk through what's going on:

```javascript
import { debounce } from "../utils";
```

`debounce` is a hand-rolled debouncing function that we have in our repo - it's close to [lodash's throttle](https://lodash.com/docs/4.17.10#throttle) function. It takes two arguments - the function we want to debounce, and the wait we want to specify.

```javascript
constructor(props) {
  super(props);
  this.scrollListener = this.scrollListener.bind(this);
}
```

Binding `scrollListener` to `this` in the constructor so that it's possible to reference it - this is a common React pattern (though possibly outdated).

```javascript
// Acts on the user's scroll
scrollListener() {
  // do stuff
}
```

The actual functionality of the compoent was in this function, but it was besides the point for this example. (In reality it triggered another page fetch when a user scrolled to the bottom of the component).

```javascript
componentDidMount() {
  window.addEventListener("scroll", debounce(this.scrollListener, 100));
}

componentWillUnmount() {
  window.removeEventListener("scroll", debounce(this.scrollListener, 100));
}
```

When the component mounts and unmounts, we add and remove event listeners. **And herein lies the problem**.

## Adding an Event Listener Function with Arguments

At first, when I was going through the code, this jumped out at me:

```javascript
window.addEventListener("scroll", debounce(this.scrollListener, 100));
```

When we passed `debounce` as the event listener, we were passing our function to it, and a time that we needed to specify. We were passing _arguments_. As you may have found out, generally, you cannot pass arguments when adding event listener functions.

The existing code worked in terms of event listeners being added. But how? Because of JavaScript [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) - `this.scrollListener` was defined in our class.

## Where the bug was introduced

Our issue really stems from this line:

```javascript
window.removeEventListener("scroll", debounce(this.scrollListener, 100));
```

At first glance, you would think that `removeEventListener` would find `debounce(this.scrollListener, 100)` and remove it. Sadly, this **does not work**.

When we initially used `debounce` in the `addEventListener` we created _one instance_ of it. Using it again in `removeEventListener` actually creates a _second instance_ of `debounce`,and it would therefore be impossible to match against the first, and actually, you know, remove the event listener.

## How to Add and Remove an event listener, using an imported function, passing arguments in a way that works

After pulling my little remaining hair out all day, I stumbled upon this [Stack Overflow Answer](https://stackoverflow.com/a/47002785/1173898).

In short - when using a function in this way (especially for imported functions like this), you need to create a reference instance, and then use _that_ to add and remove as an event listener. Where to keep that reference? The `constructor`.

```javascript
import ReactDOM from "react-dom";
import React, { Component } from "react";
import { debounce } from "../utils";

class myComponent extends Component {
  constructor(props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);
    this.debouncedScrollListener = debounce(this.scrollListener, 100);
  }

  // Acts on the user's scroll
  scrollListener() {
    // do stuff
  }

  componentDidMount() {
    window.addEventListener("scroll", this.debouncedScrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debouncedScrollListener);
  }

  render() {
    return <myComponent />;
  }
}

export default myComponent;
```

The above code works to both _add_ and _remove_ an eventListener _and_ we can pass arguments to our function.
