/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const ManifestPlugin = require("./webpack/mainfestPlugin.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const pageConfig = (i) => ({
  entry: `${resolve(i)}/main`,
  template: `${resolve(i)}/index.html`,
  filename: `${i}.html`,
  title: i,
  chunks: ["chunk-vendors", "chunk-common", i],
});

module.exports = {
  productionSourceMap: false,
  filenameHashing: false,
  pages: {
    popup: pageConfig("popup"),
  },
  configureWebpack: {
    entry: {
      content: resolve("content/index"),
      background: resolve("background/main"),
    },
    output: {
      filename: "[name]/index.js",
    },
    plugins: [new ManifestPlugin()],
  },
};
