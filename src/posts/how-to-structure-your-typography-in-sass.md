---
title: "How to structure your typography in Sass"
date: 2015-06-27
draft: false
tags: [sass, typography]
---

I've always been focused on strong typography when it comes to design. As I've evolved into a front end developer, I still focus a lot on the typography of a project. As I've written about before, if the design is up to me, I even start with [setting the paragraph](/where-to-begin/).

However, what can you do to set yourself up for success when it comes to _coding_ a design and it's typography? I've done this - a lot - and I've come to some conclusions.

Some of my guiding principles are:

- Do the absolute _least amount possible_. I've seen a lot of projects where other developers write and re-write chunks of code they don't need, and in fact are adding to maintenance headaches down the road.
- Err on the side of _commonality_. The more common a type treatment is, the more global it's application. I'm not saying special one-off treatments are bad, just that as a developer you need to focus on the common ones more.
- _Make your life as easy as possible_. Use a preprocessor (the rest of this post will be about Sass) and make smart use of it's features.

So what does this look like in an actual project?

1. **Determine the paragraph style.** I typically start development at the same place I start a design: the treatment of the paragraph. If I've been supplied with a visual design, I look for what treatment could be considered the most common, "body copy" style.
2. **Set up your font stacks.** Most designs I deal with make use of 1 to 3 typefaces. (Any more than this and there needs to be an intervention) Those typically are a serif, a sans-serif, and possibly some kind of accent typeface. Knowing this, I'll set up my font stacks as Sass variables very early on in the project:

```scss
$sans-serif: "Source Sans Pro", Helvetica, Verdana, sans-serif;
$serif: Merriweather, Georgia, "Times New Roman", serif;
$mono: "Source Code Pro", Courier, mono;
```

The above example is from this very website's variables partial. (In my case my third typeface is used for code examples).

3. **Set your font weights as variables.** This is really useful if the design switches from using a 700 weight to a 900 weight for bold, for instance.

```scss
$light: 300;
$normal: 400;
$semibold: 500;
$bold: 700;
```

4. **Style the body element.** This is where I typically see other developers missing an opportunity to make their lives easier, so this is really the point of the post. **If you apply the paragraph typographic style to your body element, you will save yourself a lot of rework.** If you've identified the most common typographic treatment (see Step 1), you can style your `<body>` element with that treatment. This has three advantages -

   1. You save yourself a _lot_ of redeclaration of font-famlies, colors and so on.
   2. And in so doing you'll acheive greater consistency, as there are fewer declarations to get wrong or maintain later.
   3. There will be a baseline deliberate styling of text, in the event you don't think to style some element down the line.

   Here is what this website's body element looks like:

```scss
body {
  font-family: $sans-serif;
  font-weight: $light;
  color: $txt-primary; //color variable set elsewhere
  background: $body-bg;
  -webkit-text-size-adjust: 100%; //fix for iOS
}
```

This is usually constrained just to the `font-family`, `font-weight`, `color`, and _sometimes_ `line-height` declarations. You're not going to want to apply box-model properties to the `<body>` element.

With this styling in place, you can start changing the style of elements by making use of the `font-weight` and `font-style` property, which goes back to the "least amount possible" principle. By relying on those styling switches, governing the overall typeface becomes much easier.

Now, when you want to call in your secondary or accent typeface, you _deliberately_ declare it where needed, and that's it.

```scss
h1 {
  font-family: $serif;
}
```

And since you already have your font stacks declared as variables, you can govern that type choice much more easily.

I hope these guidelines and basic steps help you in your next project.
