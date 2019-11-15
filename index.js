const { table } = require("table");
const chalk = require("chalk");

const { versions } = require("./src/data");
const benchmark = require("./src/benchmark");

const [uncompressed, gzipped, brotlied] = benchmark.map(line =>
  line.files.map(file => file.size)
);

const data = [
  [""].concat(benchmark.map(({ format }) => chalk.bold(format))),
  ...versions.map(({ name }, index) =>
    [chalk.bold(name)].concat([
      uncompressed[index],
      gzipped[index],
      brotlied[index]
    ])
  ),
  [chalk.bold("Diff")].concat(
    benchmark.map(({ diff }) => `${diff.byte}\n${diff.percentage}`)
  )
];

const tabular = table(data, {
  columns: {
    1: {
      alignment: "right"
    },
    2: {
      alignment: "right"
    },
    3: {
      alignment: "right"
    }
  }
});

console.log(tabular);
