/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "_tmp/styles.css": "assets/styles/styles.css",
  });

  return {};
}
