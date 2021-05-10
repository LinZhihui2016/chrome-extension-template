/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require("postcss-prefixwrap")("#appExtensionContainer", {
      whitelist: ["element-plus/lib/theme-chalk/index.css"],
    }),
  ],
};
