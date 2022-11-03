const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
};
