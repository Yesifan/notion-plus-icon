const webpack = require("webpack");
const path = require("path");
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
    clean: true
  },
  resolve:{
    alias: {
      '@': path.resolve(__dirname, 'src')
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use:[
          {
            loader: require.resolve('babel-loader'),
            options:{
              presets: [
                [
                  require.resolve("@babel/preset-env"),
                  {
                    targets: {
                      node: "current"
                    }
                  }
                ],
                require.resolve("@babel/preset-react")
              ],
              plugins: [
                require.resolve("@babel/plugin-syntax-dynamic-import")
              ]
            }
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
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