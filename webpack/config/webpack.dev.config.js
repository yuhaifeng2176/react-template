const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const rootPath = require("../utils/rootPath");

module.exports = merge(baseWebpackConfig, {
  output: {
    publicPath: "", // 设置 webpack 打包后资源文件的访问路径，默认为空字符串
  },

  devServer: {
    historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    client: {
      overlay: true, // 在浏览器中显示编译错误
    },
    hot: true, // 启用热模块替换（Hot Module Replacement），即在运行时更新各种模块，而无需进行完整的刷新
    host: "0.0.0.0", // 指定 devServer 监听的主机地址，0.0.0.0 表示监听所有的 IPv4 地址
  },

  devtool: "eval-source-map", // 指定 source map 的生成方式，这里使用 eval-source-map，具有较快的构建速度和较高的质量

  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`, // 生成的 HTML 文件名
      template: rootPath(`src/index.tpl`), // HTML 模板文件路径
      excludeChunks: [""], // 排除的 chunk 名称，不包括在生成的 HTML 中
      inject: true, // 将所有生成的 bundle 注入到模板文件中
      chunksSortMode: "manual", // 控制 chunk 的排序方式，这里是手动排序
      env: "production", // 定义一个变量，指示当前环境
      title: "模版", // HTML 文件的标题
    }),
  ],
});
