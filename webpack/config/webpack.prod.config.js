const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.config");
const rootPath = require("../utils/rootPath");

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: "",
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
        },
        commons: {
          name: "commons",
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
        lib: {
          test(module) {
            return (
              module.size() > 160000 &&
              /node_modules[/\\]/.test(module.nameForCondition() || "")
            );
          },
          name(module) {
            const packageNameArr = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            );
            const packageName = packageNameArr ? packageNameArr[1] : "";
            return `chunk-lib.${packageName.replace("@", "")}`;
          },
          priority: 15,
          minChunks: 1,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: rootPath(`src/index.tpl`), // 确认该路径和文件存在
      inject: true, // 自动插入生成的脚本文件
      env: "development",
      title: "模版",
    }),
  ],
});
