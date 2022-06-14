---
title: "Making a Gatsby Site with Multiple Content Types"
date: 2019-04-29T08:25:59-04:00
draft: false
slug: "making-multiple-content-types-in-gatsby"
description: "Making a site with different content types in Gatsby is not very straightforward — here is how I figured out how to do it, and while using a mix of Markdown or JavaScript page files."
tags: ["Gatsby"]
custom_properties:
  [
    "--text-transform-h3: none;",
    " --font-weight-h1: 503;",
    "--background-color-header: var(--blue-light);",
    "--color-drop-cap: var(--blue);",
  ]
---

I was building a Gatsby site at work recently, and had a really hard time doing something which is usually pretty easy with static site generators. That was to define multiple content types, with Markdown files as sources, like this:

```bash
/src/
    /posts/
        post1.md
        post2.md
    /pages/
        about.md
```

Now, _this_ will work:

```bash
/src/
    /posts/
        post1.js
        post2.js
    /pages/
        about.js
```

But writing blog posts in JavaScript is no way to live your life.

## Assumptions

- You have a local Gatsby site up and running
- You are at least somewhat aware of GraphQL, or at least how to use it in Gatsby. If you're not, I suggest the [Level Up Tutorials course on Gatsby](https://www.leveluptutorials.com/tutorials/pro-gatsby-2).

At the time of this writing, Gatsby 2 was the latest version.

## Updating your Gatsby Config file

The first thing that you will need to do is to update `gatsby-config.js` (found at the root level of your project) so that Gatsby knows to look in both directories.

```javascript
module.exports = {
  siteMetadata: {
    ...
  },
  pathPrefix: `...`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `posts`,
      },
    },
    ...
    // other plugin configs go here
  ],
};
```

What you're doing is telling Gatsby's file system plugin about both content directories. And for each, you are specifying the `path` to the files, as well as a `name` that will be important in a moment.

The `name` can be whatever you want, but I'm guessing that you'll want it to agree with whatever the directory is called.

## Updating the Gatsby Node file

You will now need to update your `gatsby-node.js` file, also found in your project root.

Here is what the whole thing will look like (I will explain more after):

```javascript
const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (_.get(node, "internal.type") === `MarkdownRemark`) {
    // Get the parent node
    const parent = getNode(_.get(node, "parent"));

    createNodeField({
      node,
      name: "collection",
      value: _.get(parent, "sourceInstanceName")
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                collection
              }
              frontmatter {
                slug
                title
              }
            }
          }
        }
      }
    `).then(results => {
      const allEdges = results.data.allMarkdownRemark.edges;

      const blogEdges = allEdges.filter(
        edge => edge.node.fields.collection === `posts`
      );
      const pageEdges = allEdges.filter(
        edge => edge.node.fields.collection === `pages`
      );

      _.each(blogEdges, (edge, index) => {
        const previous =
          index === blogEdges.length - 1 ? null : blogEdges[index + 1].node;
        const next = index === 0 ? null : blogEdges[index - 1].node;

        createPage({
          path: `/posts/${edge.node.frontmatter.slug}`,
          component: path.resolve("./src/layouts/Post.js"),
          context: {
            slug: edge.node.frontmatter.slug,
            previous,
            next
          }
        });
      });

      _.each(pageEdges, (edge, index) => {
        createPage({
          path: `/${edge.node.frontmatter.slug}`,
          component: path.resolve("./src/layouts/Page.js"),
          context: {
            slug: edge.node.frontmatter.slug
          }
        });
      });

      resolve();
    });
  });
};
```

### Dependencies

The first thing you will notice is the dependencies at the top of the file. If you don't already have lodash and bluebird, you will have to add them via `npm install`:

`npm install -s lodash bluebird`

However, `path` comes from Node directly, so you don't need to add that. One thing to keep in mind is that this file is a set of instructions for Gatsby's _node_ environment.

### onCreateNode

```javascript
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (_.get(node, "internal.type") === `MarkdownRemark`) {
    // Get the parent node
    const parent = getNode(_.get(node, "parent"));

    createNodeField({
      node,
      name: "collection",
      value: _.get(parent, "sourceInstanceName")
    });
  }
};
```

What this does is go through our files, and if there was a `name` specified in `gatsby-config`, we add _that_ as a field to our content. So, now when we specified `name: 'pages'`, that will be available to us on each of our nodes.

I'm not sure why Gatsby makes you bend over backwards to add this (that's what `sourceInstanceName` is, so it's already known), but for now we need to manually add this metadata to each file.

### createPages

Finally, we will create the pages. Basically, what we will do is:

- Go through all the files that we know about
- Split them up by their `name`
- Associate each content type with an appropriate template, and supply context information when necessary

This also takes place in the `gatsby-node.js` file, so it is right _under_ the `onCreateNode` function that we already have.

### Going through all the Markdown files

```javascript
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                collection
              }
              frontmatter {
                slug
                title
              }
            }
          }
        }
      }
    `).then(results => {
```

So what we're doing here is using GraphQL, we're going through all of our Markdown files and gathering information about each file.

Because of what we did in `onCreateNode` our markdown files now have a `field` called `collection` (which corresponds to the `name` in our config).

```graphql
node {
  fields {
    collection
  }
```

Now we can use it!

### Breaking up the content types

This is the part that deviates from the "I'm only writing a blog" scenario that you typically find in Gatsby tutorials. We have a bunch of markdown files, but we want to do different things with them.

```javascript
const allEdges = results.data.allMarkdownRemark.edges;

const blogEdges = allEdges.filter(
  edge => edge.node.fields.collection === `posts`
);
const pageEdges = allEdges.filter(
  edge => edge.node.fields.collection === `pages`
);
```

What I'm doing here is grabbing _all_ of the results from our GraphQL query as `allEdges`, then filtering that into two new arrays of edges — `blogEdges` and `pageEdges`. We filter those by the `collection` field. This will allow us to treat both sets of content in different ways.

If you have _other_ content types that you want to make (e.g., `recipes`, `bios`, etc), this is how you handle it. You just make sure that the `collection` agrees with the `name` from your config file.

### Handling Blog Posts

```javascript
_.each(blogEdges, (edge, index) => {
  const previous =
    index === blogEdges.length - 1 ? null : blogEdges[index + 1].node;
  const next = index === 0 ? null : blogEdges[index - 1].node;

  createPage({
    path: `/posts/${edge.node.frontmatter.slug}`,
    component: path.resolve("./src/layouts/Post.js"),
    context: {
      slug: edge.node.frontmatter.slug,
      previous,
      next
    }
  });
});
```

Now that we have _just_ our blog posts (`blogEdges`), we go through each of them (using lodash's `.each` method). We determine the `previous` and `next` edge so that we can pass that information along as part of the `context`.

In `createPage` (which is a standard Gatsby function) we point to the path that we want each post to have, the `component` which is the template for the post, and create `context`.

We pass the `previous` and `next` edges in `context` so that when we build our page, we can also construct pagination that lets the user go forward / backward through the blog posts.

So, in our Post template, we can have something along the lines of this:

```javascript
<Link to={`/posts/${next.frontmatter.slug}`} rel="next">
  {next.frontmatter.title} →
</Link>
```

This is a big reason why we're breaking up blog posts and pages into `blogEdges` and `pageEdges` — we can determine the `previous` and `next` _just for blog posts_. If we didn't, pages that we created would get mixed into the pagination of our blog posts, which ... ain't right.

### Handling Pages

```javascript
      _.each(pageEdges, (edge, index) => {
        createPage({
          path: `/${edge.node.frontmatter.slug}`,
          component: path.resolve("./src/layouts/Page.js"),
          context: {
            slug: edge.node.frontmatter.slug
          }
        });
      });

      resolve();
    });
  });
};
```

Pages, though, are totally different. We're basically doing the same thing, but without the `previous` and `next` business, because our pages are not being presented with pagination.

## Conclusion

I hope this walk through helps you, if you're looking to have multiple content types in a Gatsby Site. I've found that this solution works really well. You can even still create `some-page.js` type files in your `pages` directory and those will still build pages - which is great if you really need something bespoke.
