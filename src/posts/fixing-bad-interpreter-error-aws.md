---
title: "Fixing the 'Bad Interpreter' Error from AWS and Python 3.7"
date: 2019-03-27T10:38:57-04:00
draft: false
slug: "fixing-bad-interpreter-error-aws-python-3_7"
description: "How to clear up the terminal message from AWS relating to Python 3.6 not being found."
tags: ["python"]
custom_properties: []
---

This is mostly a note to myself, but it might help others out there.

If you're using `awscli` on your computer for something, you may suddenly start seeing an error like this crop up in your terminal:

```bash
.zshrc: /usr/local/bin/aws: bad interpreter: /usr/local/opt/python/bin/python3.6: no such file or directory
```

This is because you've probably installed `awscli` in the past, but more recently upgraded your system Python to version 3.7, _not_ 3.6 (which old versions of `awscli` worked with).

The fix is easy, and in two parts. First, install the latest `awscli`:

```bash
brew reinstall awscli
```

Second, to make sure brew knows which version to use:

```bash
brew link --overwrite awscli
```

This should clear up that error.
