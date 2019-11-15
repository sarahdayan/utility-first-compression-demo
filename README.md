# Utility-first CSS compression demo

This experiment aims at demonstrating **how using utility classes doesn't affect HTML file size**, thanks to data compression.

It compares the size of similar HTML pages (one with utility classes, the other without) without compression, with GZip compression, and with Brotli compression.

## Getting Started

To run the benchmark, execute the following command:

```sh
npm run benchmark

# or

yarn benchmark
```

> ***NOTE:*** *don't forget to run `npm install` or `yarn` beforehand to install dependencies.*

## How things work

To perform a fair comparison, here's how tests are ran.

### 1. Generating "semantic" classes

The source file is the full content of the `body` tag of an HTML page which uses utility classes. The goal is to compare it to a version of itself which would be using semantic classes. To do this, [a script first generates this version](src/semantic.js) to get a result that would be as close to real life.

To do this, we collect the content of all class attributes, turn them into hashes (using SHA-1) and replace them. To ensure that similar sets of utility classes would yield the same hashes, we first sort the classes alphabetically.

Semantic classes are usually shorter, but they also sometimes are longer or split into several classes (as with modifiers). To account for both and get an average, we truncate the classes to 10 characters.

So, for example, the following class attribute:

```html
<div class="flex flex-col min-h-screen text-base font-sans">
```

Always yields the same class:

```html
<div class="ec1dec286d">
```

> ***NOTE:*** *the goal isn't to generate actual semantic classes, but what it would look like in terms of output (as in, short and less numerous).*

If you disagree with the method, or want to improve it, please PR directly.

### 2. Compressing files

Once both files are available, they're compressed with Gzip and Brotli, using respectively [gzip-cli](https://www.npmjs.com/package/gzip-cli) and [brotli-cli](https://www.npmjs.com/package/brotli-cli).

File sizes are compared for each version (uncompressed, Gzip and Brotli) and outputted to the console.
