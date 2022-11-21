const util = require('util');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

const getPostCount = (tag, posts) => {
  return posts.filter((post) => post.data.tags?.includes(tag)).length
}

const arrayIncludesTag = (tag, arr) => {
  return arr.some((item) => item.title === tag.title)
}

const getTags = (item) => {
  return item.data.tags.filter(function (item) {
    switch (item) {
      // this list should match the `filter` list in tags.njk
      case 'all':
      case 'nav':
      case 'post':
      case 'posts':
      case 'page':
        return false
    }

    return true
  })
}


module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter('console', function(value) {
      const str = util.inspect(value);
      return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
  });

  eleventyConfig.addFilter('dump', obj => {
    return util.inspect(obj)
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter("postDateTime", (dateObj) => {
    const shortdate = DateTime.fromJSDate(dateObj).toISODate(DateTime.DATE_SHORT)
    if (shortdate) {
      return shortdate.replace(/\//g, '-');
    } else {
      return '';
    }
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/posts/**/*.md");
  });

  eleventyConfig.addCollection('allTags', function (collection) {
    let tagSet = new Set()

    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        const tags = getTags(item)

        for (const tag of tags) {
          tagSet.add({
            title: tag,
            postCount: getPostCount(tag, collection.getFilteredByGlob("src/posts/**/*.md")),
          })
        }
      }
    })

    const arr = []
    const sortedTags = [...tagSet]
      .sort((a, b) => a.postCount - b.postCount)
      .reverse()

    sortedTags.forEach((tag) => {
      if (arrayIncludesTag(tag, arr)) return
      arr.push(tag)
    })

    return arr
  })


  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    templateFormats: ["html", "md", "njk"],
    passthroughFileCopy: true,
  };
};
