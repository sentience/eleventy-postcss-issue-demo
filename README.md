# Reproduction for issue 11ty/eleventy#3007

To run:

```bash
npm i
npm start
```

Visit http://localhost:8080. The text "This is a test." should have a blue background, but it doesn't the first time the Dev Server is run. For more detail on the issue, see [the full issue description](https://github.com/11ty/eleventy/issues/3007).

## Implementation notes

This repo demonstrates the use of Eleventy to build a static website with a CSS stylesheet generated by PostCSS CLI. In development (the `start` script defined in package.json for `npm start`), PostCSS CLI waits for 5 seconds to simulate a build that is not complete before Eleventy Dev Server attempts to copy the output to the _site directory.

```json
    "start": "npm run start:eleventy & npm run start:postcss",
    "start:eleventy": "eleventy --serve --incremental",
    "start:postcss": "sleep 5 && postcss styles/styles.css --dir _tmp --watch --verbose",
```

```js
  eleventyConfig.addPassthroughCopy({
    "_tmp/styles.css": "assets/styles/styles.css",
  });
```

**Note:** Rather than PostCSS CLI outputting the stylesheet directly into the _site directory, which would not benefit from Eleventy Dev Server's live reloading, PostCSS CLI outputs the file to _tmp, and then Eleventy should copy it from there into the _site directory and live-reload it in the browser whenever it changes.
