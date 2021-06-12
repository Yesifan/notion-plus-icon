const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

const config = {
  output: {
    path: paths.build,
    filename: '[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    clean: true,
  },
  resolve: {
    alias: {
      '@': paths.src,
    },
    extensions: ['.ts', '.tsx', '...'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        generator: {
          filename: 'static/media/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: 'public',
        to: '.',
        filter: (file) => path.normalize(file) !== paths.popupHtml,
      }],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.popupHtml,
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
};

module.exports = config;
