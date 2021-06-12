/* eslint-disable import/no-extraneous-dependencies */
const ZipPlugin = require('zip-webpack-plugin');
const { merge } = require('webpack-merge');

const base = require('./webpack.config');

const paths = require('./paths');

const crxZip = 'notion-plus-icon.zip';

const config = merge(base, {
  mode: 'production',
  entry: {
    popup: paths.popup,
    content: paths.content,
    background: paths.background,
  },
  plugins: [
    new ZipPlugin({
      filename: crxZip,
    }),
  ],
});

module.exports = config;
