---
title: "Resolving a github repo and a new Create React App"
date: 2020-04-21T22:41:22-04:00
draft: false
slug: "resolving-github-repo-and-create-react-app"
description: "A play in one act"
tags: ['git']
custom_properties: []
---

Just ran into this situation, and I'm leaving a note here for my future self. I hope you find it helpful.

I got myself into the chicken-or-the-egg situation that goes like this:

1. Got this idea for a small app
2. Okay, the first thing to do is to make a repo on github, right? I do that, and name the project
3. Hmmm, I want to use [Create React App](https://create-react-app.dev/docs/getting-started) to make most of the pain go away
4. I run `npx create-react-app my-apps-name` locally but that makes a new directory all unto itself
5. What to do?
6. Oh, yeah, [add a new remote](https://help.github.com/en/github/using-git/adding-a-remote)  `git remote add origin https://github.com/user/repo.git`
7. `git pull origin master` .... well, crap. `fatal: refusing to merge unrelated histories`
8. **Here is the magic command:** `git pull origin master  --allow-unrelated-histories`
9. Resolve merge conflict in the readme, push to the remote
10. fin.
