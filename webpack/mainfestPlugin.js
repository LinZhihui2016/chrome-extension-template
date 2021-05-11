/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
const manifestTemplate = resolve("manifest.json");
const target = resolve("dist/manifest.json");
const background = (manifest, jsArr) => {
  manifest.background.scripts = jsArr;
};
const content = (manifest, jsArr, cssArr) => {
  manifest["content_scripts"].push({
    js: jsArr,
    css: cssArr,
    matches: ["<all_urls>"],
  });
};
class ManifestPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const pluginName = "ManifestPlugin";
    const templateText = fs.readFileSync(manifestTemplate, "utf-8");
    const manifest = JSON.parse(templateText);
    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      const js = {
        background: [],
        chunk: [],
        content: [],
        popup: [],
      };
      const css = {
        content: [],
      };
      for (const key of compilation.assetsInfo.keys()) {
        if (/^background\/.*\.js$/.test(key)) {
          js.background.push(key);
        }
        if (/^js\/.*\.js$/.test(key)) {
          js.chunk.push(key);
        }
        if (/^content\/.*\.js$/.test(key)) {
          js.content.push(key);
        }
        if (/^popup\/.*\.js$/.test(key)) {
          js.popup.push(key);
        }
        if (/^css\/content\.css/.test(key)) {
          css.content.push(key);
        }
        if (/^css\/chunk-vendors\.css/.test(key)) {
          css.content.push(key);
        }
      }
      background(manifest, js.background.concat(js.chunk));
      content(manifest, js.content.concat(js.chunk), css.content);
      fs.writeFileSync(target, JSON.stringify(manifest, null, 2));
    });
  }
}

module.exports = ManifestPlugin;
