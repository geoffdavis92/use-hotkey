const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [{ test: /\.ts$/, loader: "awesome-typescript-loader" }]
  },
  resolve: {
    alias: { types: path.resolve(__dirname, "src/types.d.ts") }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "useHotkey.js",
    library: "useHotkey",
    libraryExport: "default"
  },
  externals: {
    react: "React"
  }
};
