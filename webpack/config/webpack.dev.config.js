const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const rootPath = require("../utils/rootPath");

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: "",
  },

  devServer: {
    historyApiFallback: true,
    client: {
      overlay: true,
    },
    hot: true,
    host: "0.0.0.0",
  },

  devtool: "eval-source-map",

  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: rootPath(`src/index.tpl`),
      excludeChunks: ["app"],
      inject: true,
      chunksSortMode: "manual",
      env: "development",
      title: "模版",
    }),
  ],
});
