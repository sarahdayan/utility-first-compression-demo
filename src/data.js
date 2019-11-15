const versions = [
  {
    slug: "source",
    name: "Utility-first"
  },
  {
    slug: "dest",
    name: "Semantic"
  }
];

const formats = [
  { extension: ".html", format: "Uncompressed" },
  { extension: ".html.gz", format: "Gzip" },
  { extension: ".html.br", format: "Brotli" }
];

module.exports = {
  versions,
  formats
};
