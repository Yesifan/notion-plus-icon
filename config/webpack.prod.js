const CopyPlugin = require("copy-webpack-plugin");

const paths = require("./paths");

const config = {
  mode: 'production',
  entry: {
    content: paths.content,
    background: paths.background,
  },
  output: {
    path: paths.build,
    filename: "[name].js",
    chunkFilename:"static/js/[name].chunk.js",
    clean: true
  },
  resolve:{
    alias: {
      '@': paths.src
    },
    extensions: ['.ts', '.tsx', '...'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        generator: {
          filename: 'static/media/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }]
    }),
  ],
};

module.exports = config;