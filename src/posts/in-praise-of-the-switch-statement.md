---
title: 'In praise of the switch statement'
date: 2024-02-06T9:00:00-04:00
permalink: 'in-praise-of-the-switch-statement/'
description: 'A tutorial on how to use an underused tool in Javascript - the switch statement.'
draft: false
tags: ['javascript']
---

A tool that I find myself reaching for quite a bit is the `switch` statement. It's a great way to tackle complex logic in a straightforward way. In complicated situations, it helps me really focus in on _what is actually changing_.

I hardly see anyone else ever mention it, or give examples of it in blog posts. So here we go.

## When to use a `switch` statement?

I think of it as useful anytime I would have an `if` statement followed by _more than one alternative_.

```javascript
// this is fine to leave as an if statement
if (foo) {
} else {
}

// this should probably be a switch statement
if (foo) {
} else if (bar) {
} else {
}
```

## `switch` syntax

It roughly goes like this:

```javascript
switch (conditionState) {
  case conditionOne:
  // do stuff
  case conditionTwo:
  // do stuff
  default:
  // if all else fails, do stuff
}
```

_Most often_ the `conditionState` is a boolean - `true` being easier to think about. So then each `case` needs to evaluate to `true` in order to be triggered.

```javascript
switch (true) {
  case 1 + 1 === 2:
  // this will happen
  case 1 + 1 === 3:
  // this won't happen
}
```

### `default` case

It's a good idea to define `default` behavior in the event none of your cases match. This happens when we 'fall through' the switch statement - `default` will end up firing.

```javascript
switch (true) {
  case 1 + 1 === 3:
  // this won't happen
  case 1 + 1 === 4:
  // this won't happen
  default:
  // this will happen
}
```

### Controlling flow

An important thing to understand is how to control the flow of the `switch` statement through the cases. By default - _all cases will be evaluated in the entire statement_.

```javascript
switch (true) {
  case 1 + 1 === 2:
  // this will happen
  case 2 + 2 === 4:
  // this will *also* happen
  default:
  // this will happen *too*
}
```

If you don't want this to happen, you can insert a `break` in cases that you want the statement to stop being evaluated.

```javascript
switch (true) {
  case 1 + 1 === 2:
    // this will happen, but then we break the statement
    break
  case 2 + 2 === 4:
  // this won't happen
  default:
  // this won't happen
}
```

If you are in a function and you are `return`ing values, that will also break the statement.

```javascript
switch (true) {
  case 1 + 1 === 2:
    // this will happen, but then we break the statement
    return someValue
    // not really needed since we're returning,
    // but eslint may complain if we don't have it
    break
  case 2 + 2 === 4:
  // this won't happen
  default:
  // this won't happen
  // a 'break' is not needed here
}
```

## What goes in a switch statement?

In my opinion, what should change in each `case` should be the _absolute minimum possible_. This will result in the clearest possible code. Things like variable assignment are great. I avoid complex operations, and side effects, if at all possible. So, _not_ this:

```javascript
// not this
switch (true) {
  case someCondition:
    const foo = bar + 1
    someInvokedFunction(foo)
    break
  case someOtherCondition:
    const foo = bar + 2
    someInvokedFunction(foo)
    break
  default:
    const foo = bar + 3
    someInvokedFunction(foo)
}
```

But this:

```javascript
// do this instead
let foo
switch (true) {
  case someCondition:
    foo = bar + 1
    break
  case someOtherCondition:
    foo = bar + 2
    break
  default:
    foo = bar + 3
}
someInvokedFunction(foo)
```

## Multiple cases with the same result

One way to neaten up logic is to put cases with the same outcome together. So, not this:

```javascript
// not this
let foo
switch (true) {
  case someCondition:
    foo = bar + 1
    break
  case someOtherCondition:
    foo = bar + 1
    break
  default:
    foo = bar + 2
}
someInvokedFunction(foo)
```

But rather:

```javascript
// do this
let foo
switch (true) {
  case someCondition:
  case someOtherCondition:
    foo = bar + 1
    break
  default:
    foo = bar + 2
}
someInvokedFunction(foo)
```

## Benefits of the `swtich` statement

What does this all get you?

- **A clear way to handle complicated logic with more than two possible outcomes.** I recently had to write a `swtich` statement with 10 possible outcomes - 😱. The switch statement helped me wrangle all of those possible outcomes in a way that was possible reason about.
- **It's a rigid structure to articulate all possible cases**. Just having to deal with that helps me think through edge cases.
- **It offers a clear guide for writing tests**. It's very easy to look at all the possible `case`s and write unit tests that fall into each.
- Frankly I find them **easier to read** - either as a maintainer later or even my own code months later.

I hope this tutorial gives you another tool in your toolbox to help you deal with complicated logic. Give the `switch` statement a try!
