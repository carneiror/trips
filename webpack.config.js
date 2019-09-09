const path = require("path");
const CONFIG = require("./config.cjs");
const NODE_ENV = process.env.NODE_ENV;
const OUTPUT = NODE_ENV === "prod" ? CONFIG.OUTPUT_FOLDER : CONFIG.TARGET_FOLDER;

module.exports = {
  mode: NODE_ENV === "prod" ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, OUTPUT),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "source-map"
};
