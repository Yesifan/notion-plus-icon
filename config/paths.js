const path = require("path");

const src = path.join(__dirname, "../src");

const resolveSrc = _path => path.resolve(src, _path)

module.exports = {
  entry:{
    content: resolveSrc('content/index.ts'),
    background: resolveSrc('background/index.ts'),
  },
  build: path.join(__dirname, "../dist")
}