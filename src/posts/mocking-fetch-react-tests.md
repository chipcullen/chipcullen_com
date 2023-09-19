---
title: "Mocking fetch requests in React Testing Librarty tests"
date: 2023-09-19T09:00:00-04:00
permalink: "mocking-fetch-requests-in-react-testing-library-tests/"
description: ""
draft: true
tags: ['react', 'javascript', 'testing']
---

I recently built a somewhat complicated react component that made a `fetch` call and did different things based on the result. It used to be that I would chalk up a component like this to being so based on side effects that I wouldn't bother testing most of the component.

I've been a fan of React Testing Library for years, and like the opinionated approach that it takes. With some help from Kent C. Dodd's blog post, I was able to make some meaningful tests for this component. This post is really a note-to-future-me post, because I think this will be helpful to remember how to do. But I hope you find this useful too.

