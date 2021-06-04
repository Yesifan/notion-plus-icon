const CopyPlugin = require("copy-webpack-plugin");

const paths = require("./paths");

const config = {
  mode: 'development',
  entry: {
    content: [paths.contentClient, paths.content],
    background: [paths.backgroundClient, paths.background],
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: paths.build,
    filename: "[name].js",
    chunkFilename:"static/js/[name].chunk.js",
    publicPath: 'https://localhost:3333/',
    clean: true
  },
  devServer:{
    hot:true,
    hotOnly: true,
    port: 3333,
    https: true,
    writeToDisk: true,
    transportMode: 'ws',
    allowedHosts: ['.notion.so'],
    headers:{
      "Access-Control-Allow-Origin": "https://www.notion.so"
    }
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