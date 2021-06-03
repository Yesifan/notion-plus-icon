const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const paths = require("./paths");

const config = {
  mode: 'development',
  entry: paths.entry,
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
    allowedHosts: ['.notion.so'],
    setup(app){
      app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        next();
      });
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
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }]
    }),
  ],
};

module.exports = config;