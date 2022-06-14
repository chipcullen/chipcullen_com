---
title: "Getting Started With Front End Tests: a Mindset"
date: 2018-08-31T08:42:45-04:00
draft: false
slug: "getting-started-with-front-end-tests"
tags: ["testing"]
---

One thing that I feel has been a blind spot for myself in terms of my development skill set is _testing_. That is, writing automated tests that help ensure that your code doesn't break as you make changes moving forward.

I'm still pretty early on in this journey, but wanted to share a few things that I've learned. This isn't a technical how-to, this is more of a general mindset that I wish I had going into this.

- First, you really have to **think about things very, very logically**. I have an art background. As a front end developer, my specialty has been visual presentation - I care about semantic markup, layout, accessibility, etc. I do _not_ have a Computer Science / Engineering background. I feel that a lot of the thought process around testing out there assumes a CSish background. It all feels very abstract and not very relatable.
- To build on the last point - when getting started with unit tests specifically, you will _only_ be testing very specific pieces of code - the ones that have _demonstrable logic_. Can you pass some input to a function and get a clear answer returned? Great. Unit test _that_. Does the function open a pop up? _Don't_ unit test that.
- When approaching a big chunk of code, start by testing what is easily tested. If something is proving too difficult, just **skip it and move on**. It's better to have some tests than no tests.
- _That_ being said, if a piece of code _is_ too difficult to test, you need to eventually understand why. It may mean it needs to be refactored so that the logic is more clean and reliable. Are logic and behavior being intermingled? They usually shouldn't be.
- There are various levels of testing, so be sure you're thinking about the right _level_ of testing.
  - **Unit tests** - tests written around very specific functions. These are where you supply an input, and describe an expected output.
  - **Integration tests** - these tests are written to make sure that different systems can, well, integrate successfully. Think of making sure an app can talk to a database.
  - **Functional tests / End-to-End Tests / E2E / Browser tests** are tests that are written to verify the end functionality. An example would be writing a test to make sure a user can log in to their account.
- In terms of how many tests you should write, it should roughly break down to:
  - Write as many **unit** tests as you can
  - Write considerably fewer _integration_ tests, as they tend to be much slower
  - Write as few _functional/e2e_ tests as you can get away with, as they tend to be slow and brittle. Figure out what your primary business goals are, and what functionality _has_ to work in order for those goals to be met, and write your tests based on that.
