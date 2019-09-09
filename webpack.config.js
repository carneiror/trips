const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
const OUTPUT = NODE_ENV === "prod" ? "dist/" : "target";

module.exports = {
  mode: "development",
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
