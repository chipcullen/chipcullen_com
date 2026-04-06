---
title: An updated Colorosetta
description: A list of updates to one of my color utility tools.
date: 2026-04-06T04:53:00+00:00
draft: false
permalink: an-updated-colorosetta-2026/
---
It's been quite a while, but I've made a significant update to one of my little side projects:

[https://colorosetta.com/](https://colorosetta.com/)

- I migrated off of the old Create React App scaffolding
- Updated to React 19
- Most significantly - changed the backend logic from a cobbled together collection of hand done functions, to using [Color.js](https://colorjs.io/) to power all of the conversions. I figure Lea Verou knows more than I do :)
- It now defaults to modern color syntax (read: no commas)
- Added support for `oklch` and `p3` colors

I'll be honest - I used Claude (Sonnet 4.6) to facilitate a lot of this. I feel like this was the perfect job for an AI agent - I had an existing app that needed a significant amount of gruntwork. I already had a suite of tests in place, and typescript to boot. 

