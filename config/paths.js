const path = require("path");

const src = path.join(__dirname, "../src");

const resolveSrc = _path => path.resolve(src, _path)

module.exports = {
  src,
  content: resolveSrc('content/index.tsx'),
  contentClient: resolveSrc('hot-client/content.ts'),
  background: resolveSrc('background/index.ts'),
  backgroundClient: resolveSrc('hot-client/content.ts'),
  build: path.join(__dirname, "../dist")
}