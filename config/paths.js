const path = require("path");

const src = path.join(__dirname, "../src");

const resolveSrc = _path => path.resolve(src, _path)

module.exports = {
  src,
  content: resolveSrc('content/index.tsx'),
  background: resolveSrc('background/index.ts'),
  popup: resolveSrc('popup/index.tsx'),
  popupHtml: resolveSrc('../public/popup.html'),
  backgroundClient: resolveSrc('hot-client/background.ts'),
  build: path.join(__dirname, "../dist")
}