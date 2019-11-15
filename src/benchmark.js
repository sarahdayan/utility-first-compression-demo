const fs = require("fs");
const filesize = require("filesize");

const size = filesize.partial({ exponent: 1 });

const { versions, formats } = require("./data");

const output = formats.map(({ format, extension }) => {
  const files = versions.map(({ slug, name }) => {
    const url = `data/${slug}${extension}`;
    const { size } = fs.statSync(url);

    return { name, size };
  });

  const diff = files.map(({ size }) => size).reduce((acc, curr) => acc - curr);
  const percentage = (diff * 100) / files[0].size;

  return {
    format,
    diff: {
      byte: size(Math.abs(diff)),
      percentage: `${Math.round(percentage * 100) / 100}%`
    },
    files: files.map(file => ({
      ...file,
      size: size(file.size)
    }))
  };
});

module.exports = output;
