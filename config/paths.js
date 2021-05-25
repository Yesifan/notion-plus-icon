const path = require("path");

module.exports = {
  entry:{
    content: path.join(__dirname, "../src/content/index.ts"),
  },
  build: path.join(__dirname, "../dist")
}