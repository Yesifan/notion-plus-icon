const { merge } = require("webpack-merge");

const base = require("./webpack.config");
const ResetEntryPlugin = require("./reset-entry-plugin");

const paths = require("./paths");

const config = merge(base, {
  mode: 'development',
  entry: {
    popup: paths.popup,
    content: paths.content,
    background: [paths.backgroundClient, paths.background],
  },
  devtool: 'cheap-module-source-map',
  devServer:{
    hot:true,
    hotOnly: true,
    port: 3333,
    writeToDisk: true,
    transportMode: 'ws',
    disableHostCheck: true
  },
  plugins:[
    new ResetEntryPlugin({
      transform(name, value){
        if(name === 'content'){
          return {
            ...value,
            import: [paths.content],
          }
        }
        return value;
      }
    })
  ]
});

module.exports = config;