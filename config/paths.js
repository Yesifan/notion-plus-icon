const path = require("path");

const src = path.join(__dirname, "../src");

const resolveSrc = _path => path.resolve(src, _path)

module.exports = {
  src,
  content: resolveSrc('content/index.tsx'),
  background: resolveSrc('background/index.ts'),
  backgroundClient: resolveSrc('hot-client/background.ts'),
  build: path.join(__dirname, "../dist")
}