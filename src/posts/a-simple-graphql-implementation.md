---
title: "A Lightweight Way to Read GraphQL Data"
date: 2023-06-19T12:00:00-04:00
permalink: "a-lightweight-way-to-read-graphql-data/"
description: "I share a lightweight function that will let you read a GraphQL endpoint without the need for heavy libraries. This is great for simpler use cases."
draft: false
tags: ['javascript', 'graphql']
---

If you are just wanting to get data from a GraphQL endpoint, and not mutate data or anything like that, **you may not need a GraphQL library like @apollo/client**.

It seems that when you are learning GraphQL, one of the first things that you're advised to do is to install something like `@apollo/client`. But that comes with a cost - as of this writing, `@apollo/client` when [gzipped is 43kb](https://bundlephobia.com/package/@apollo/client@3.7.15)!!!

You can write a simple `fetch` function that you can write that will run your query and return the data:

```javascript
const fetchGraphQL = async (query, variables) => {
  const headers = {
    "Content-Type": "application/json",
    // any other headers required by your api
  };

  // the actual api endpoint
  const apiUrl = `http://some.api/graphql`

  try {
    const response = await fetch(apiUrl, {
      // yeah, we need POST here since what we're
      // doing is POSTing a query and getting
      // data as a response.
      method: "POST",
      headers,
      body: JSON.stringify({
        query: query,
        variables,
      }),
    });

    if (!response.ok) {
      throw 'There was an issue getting data';
    }

    // Return the response as JSON
    return await response.json();
  } catch (error) {
    // add any additional error handling here
    console.error(error)
  }
}
```

Usage is pretty easy:

```javascript
// whatever you want your query to be
const QUERY = `
query Query {
  fieldOne {
    fieldTwo
    fieldThree
  }
`

fetchGraphQL(QUERY)
  .then ((data) => {
    // or do whatever you want with the data
    console.log(data)
  })
```

You can see this working for real [on this Codepen](https://codepen.io/chipcullen/pen/OJaXbdv?editors=0011) where I'm pinging the [Star Wars API](https://github.com/graphql/swapi-graphql).

`@apollo/client` will handle a bunch of things for you - like caching - but if your needs are simple, then this lightweight approach may be all that you need. We use it for some user-facing features at work, and it's fantastic.
