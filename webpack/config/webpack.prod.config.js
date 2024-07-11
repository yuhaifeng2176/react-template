const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清理构建目录插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动生成 HTML 文件插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // CSS 压缩插件
const TerserJSPlugin = require("terser-webpack-plugin"); // JavaScript 压缩插件
const baseWebpackConfig = require("./webpack.base.config"); // 基础 webpack 配置
const rootPath = require("../utils/rootPath");

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: "", // 打包后的资源访问路径，空字符串表示相对路径
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        extractComments: false, // 是否提取注释，默认为 false
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }, // 删除所有注释
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: "all", // 指定分割哪些 chunk，可选值为 all、async、initial
      cacheGroups: {
        vendor: {
          name: "vendors", // 分割出的 chunk 的名称
          test: /[\\/]node_modules[\\/]/, // 匹配规则，指定从 node_modules 中分割
          priority: 10, // 缓存组优先级
          chunks: "initial", // 只在初始块中使用
        },
        commons: {
          name: "commons", // 分割出的公共 chunk 的名称
          minChunks: 3, // 最小共享 chunk 的数目
          priority: 5, // 缓存组优先级
          reuseExistingChunk: true, // 如果当前 chunk 包含已经从主 bundle 中分离出来的模块，则将复用该模块，而不是生成新的模块
        },
        lib: {
          test(module) {
            return (
              module.size() > 160000 && // 检测模块的大小是否大于指定大小
              /node_modules[/\\]/.test(module.nameForCondition() || "") // 匹配 node_modules 中的模块
            );
          },
          name(module) {
            const packageNameArr = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            );
            const packageName = packageNameArr ? packageNameArr[1] : "";
            return `chunk-lib.${packageName.replace("@", "")}`; // 指定生成的 lib chunk 的名称
          },
          priority: 15, // 缓存组优先级
          minChunks: 1, // 最小共享 chunk 的数目
          reuseExistingChunk: true, // 如果当前 chunk 包含已经从主 bundle 中分离出来的模块，则将复用该模块，而不是生成新的模块
        },
      },
    },
  },
  devtool: "source-map", // 指定 source map 的生成方式
  plugins: [
    new CleanWebpackPlugin(), // 清理构建目录插件
    new HtmlWebpackPlugin({
      filename: `index.html`, // 自动生成的 HTML 文件名
      template: rootPath(`src/index.tpl`), // HTML 模板文件路径
      inject: true, // 自动插入生成的脚本文件
      env: "development", // 环境变量，这里指示为开发环境
      title: "模版", // HTML 文件的标题
    }),
  ],
});
