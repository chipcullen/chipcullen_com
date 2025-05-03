const util = require('util')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const { DateTime } = require('luxon')
const fs = require('fs')
const NOT_FOUND_PATH = '_site/404.html'

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
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addFilter('console', function (value) {
    const str = util.inspect(value)
    return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
  })

  eleventyConfig.addFilter('dump', (obj) => {
    return util.inspect(obj)
  })

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL)
  })

  eleventyConfig.addFilter('postDateTime', (dateObj) => {
    const shortdate = DateTime.fromJSDate(dateObj).toISODate(
      DateTime.DATE_SHORT
    )
    if (shortdate) {
      return shortdate.replace(/\//g, '-')
    } else {
      return ''
    }
  })

  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/**/*.md')
  })

  eleventyConfig.addCollection('allTags', function (collection) {
    let tagSet = new Set()

    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        const tags = getTags(item)

        for (const tag of tags) {
          tagSet.add({
            title: tag,
            postCount: getPostCount(
              tag,
              collection.getFilteredByGlob('src/posts/**/*.md')
            ),
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

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  eleventyConfig.addPassthroughCopy('src/images')

  eleventyConfig.addShortcode('topcap', function (cloudinaryImageName) {
    return `
    <div class="top-cap">
      <img aria-hidden="true"
      src="https://res.cloudinary.com/chipcullen/image/upload/b_rgb:000000,c_scale,o_98,w_300/v1669146466/${cloudinaryImageName}.webp"
      srcset="https://res.cloudinary.com/chipcullen/image/upload/b_rgb:000000,c_scale,o_98,w_600/v1669146466/${cloudinaryImageName}.webp 600w,
        https://res.cloudinary.com/chipcullen/image/upload/b_rgb:000000,c_scale,o_98,w_800/v1669146466/${cloudinaryImageName}.webp 800w,
        https://res.cloudinary.com/chipcullen/image/upload/b_rgb:000000,c_scale,o_98,w_1200/v1669146466/${cloudinaryImageName}.webp 1200w"
      loading="lazy"
      sizes="40vw"
      alt="" />
    </div>`
  })

  // for 404 page development
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(
              `Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`
            )
          }

          const content_404 = fs.readFileSync(NOT_FOUND_PATH)
          // Add 404 http status code in request header.
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' })
          // Provides the 404 content without redirect.
          res.write(content_404)
          res.end()
        })
      },
    },
  })

  // Decap cms stuff
  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/admin/config.yml': './admin/config.yml',
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    templateFormats: ['html', 'md', 'njk'],
    passthroughFileCopy: true,
  }
}
