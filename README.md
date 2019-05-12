# svelte-preprocess-css-global
A Svelte preprocessor to apply styles to all selectors globally using the :global(...) modifier with support css and postcss styles. More Information in the [Svelte API](https://svelte.dev/docs#style)

**Input:**
```html
<!-- App.svelte -->
<style global type="text/postcss">
body {background-color: red;}
div a {
    color: red;
}
</style>
```

**Internal Output**

```css
:global(body) {background-color: red;}
:global(div) a {
    color: red;
}
```

**Output**

```css
body{background-color:yellow}div a{color:red}
```

## Installation

```bash
npm install --save-dev svelte-preprocess-css-global
```

## Setup

**Using rollup-plugin-svelte**

```javascript
// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import { globalCSS } from 'svelte-preprocess-css-global';
...

export default {
  ...
  plugins: [
    ...
    svelte({
      preprocess: {
        style: globalCSS(),
      },
    }),
  ],
};
```

**Using svelte-loader**

```javascript
// webpack.config.js
import { globalCSS } from 'svelte-preprocess-css-global';

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            ...
			preprocess: {
				style: globalCSS()
			}
          }
        }
      },
      ...
    ]
  },
  ...
};
```

## Passing options to postcss

You can pass options to postcss:

```javascript
...
globalCSS({
  plugins: [
    ...
  ]
})
```

# Usage

Now all `<style>` elements in your components that have a `type="text/postcss"` and `global` attribute will be preprocessed by sass.

```html
<!-- App.svelte -->
<style global type="text/postcss">
body {background-color: red}
</style>
```

**Import from file**

*(does not suport hotreload in dev server!)*

```html
<!-- src/App.svelte -->
<style global type="text/postcss" src="global.css"></style>
```
`src/global.css` will be expected relative to folder of file `App.svelte`.

**Import with `@import`**

*(does not suport hotreload in dev server!)*

```html
<!-- src/App.svelte -->
<style global type="text/postcss" >
@import "global.css"
</style>
```
`global.css` will be expected relative to folder of file `App.svelte`.

