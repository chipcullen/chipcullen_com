---
title: "How to POST *Data* with the Fetch API"
date: 2020-03-20T06:34:13-05:00
draft: false
slug: "how-to-post-data-with-fetch-api"
description: "How to go about using the Fetch API to POST data to an API."
tags: []
custom_properties: []
---

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) has been around for a few years, and is newer way to make XHR (read: AJAX) calls. It's a thorny API, though, and when I was trying to work with it, I found almost no examples of how to make a POST request with it, while _sending data as part of the call_. (Every example of POST fetch calls seemed to not pass data, which seemed ... odd).

As a point of reference, you might have seen a jQuery call like this:

```javascript
$.ajax({
  url: "/url/that/you/are/posting/to/",
  type: "POST",
  data: {
    key: `value`,
    anotherKey: `another value`
  },
  success: function success(data) {
    someSuccessFunction(data);
  },
  error: function error(error) {
    someErrorFunction(error);
  }
});
```

## How do you do this with fetch?

Let's start with what it looks like overall, _then_ I'll break it down:

```javascript
const url = `/url/that/you/are/posting/to/`;

// Note: Depending on your API this may need to be different
let data = new URLSearchParams();
data.append(`key`, `value`);
data.append(`anotherKey`, `another value`);

const options = {
  method: `POST`,
  body: data
};

fetch(url, options)
  .then(data => {
    if (!data.ok) {
      // see catch below
      throw data;
    }
    someSuccessFunction(data);
  })
  // catch any error in the network call.
  .catch(error => {
    someErrorFunction(error);
  });
```

First, I stashed our URL in a variable to make reading easier later:

```javascript
const url = `/url/that/you/are/posting/to/`;
```

### How to pass a data object

This is the crux of the issue - and it took me a while to figure this out. A coworker of mine and I paired on it for about half an hour, which is what I'm trying to save you.

When passing data via Fetch, you have a few different ways that you can do it. In my case, I was posting to a Django backend that was expecting a query parameter string.

#### Enter URLSearchParams

To do that, the trick was using [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams), which is built into JavaScript, much like `Math()` or `Date()`. What it does is take key value pairs and translates them into a query parameter string. You add to it with the `.append` method that it has.

So, think of if like this:

```javascript
let example = new URLSearchParams();
example.append(`myKey`, `my value`);
console.log(example); // ?myKey=my%20value
```

Knowing all that, this is how I built the data object:

```javascript
let data = new URLSearchParams();
data.append(`key`, `value`);
data.append(`anotherKey`, `another value`);
```

#### Other Data Options

You may have to experiment with how you construct your data object based on the API that you are POSTing to. This is what worked for me.

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Request):

> The body type can only be a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob"><code>Blob</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/BufferSource"><code>BufferSource</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData"><code>FormData</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams"><code>URLSearchParams</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/USVString"><code>USVString</code></a> or <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream"><code>ReadableStream</code></a> type, so for adding a JSON object to the payload you need to stringify that object.

### Constructing an init object

Now we can build the second argument in the `fetch` [function](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), which is an `init` object. It contains options that we want to make as part of our request, including the data we just built.

```javascript
const options = {
  method: `POST`,
  body: data
};
```

My example here is rather simple. See [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for all of the options available to you, including things like `credentials`.

### All together now - making the fetch

Now that we have to two arguments for `fetch`, it's pretty easy:

```javascript
fetch(url, options)
```

### Handling the response

`fetch` returns a Promise, so we need to handle that with `.then`.

```javascript
  .then(data => {
    if (!data.ok) {
      // see catch below
      throw data;
    }
    someSuccessFunction(data);
  })
```

I'm using the variable name `data` here to represent the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from the API.

### How to handle errors

One big thing you need to understand about `fetch` is:

**Fetch, which returns a promise, will _not_ reject if the API returns an error such as 404, 500, etc. It will _only_ reject if there is a network issue.**

The response does have the `.ok` [property](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok), which you can check:

```javascript
    if (!data.ok) {
      // this will happen if there is a 404 or other error from the API
      throw data;
    }
```

In order to handle network issues, as well as errors from the API, I handle both with this `catch`:

```javascript
  // catch any error in the network call.
  .catch(error => {
    someErrorFunction(error);
  });
```

In the case of the `throw` from earlier, when I throw `data`, that becomes `error` in the catch.

### Success and Error functions

At this point, I've passed the response to `someSuccessFunction()` or `someErrorFunction()`.

As noted on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), however, know that the response:

> ... is just an HTTP response, not the actual JSON. To extract the JSON body content from the response, we use the json() method ...

You can see how to handle [responses with .json here](https://developer.mozilla.org/en-US/docs/Web/API/Body/json).

## Conclusion

I hope that this article has explained how to POST data with the Fetch API in a way that is clear and helpful. Let me know if you have any questions in the comments!
