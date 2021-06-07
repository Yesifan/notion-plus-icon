const { merge } = require("webpack-merge");

const base = require("./webpack.base");

const paths = require("./paths");

const config = merge(base, {
  mode: 'production',
  entry: {
    content: paths.content,
    background: paths.background,
  },
});

module.exports = config;