const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 从JS中分离css，成单独css文件
const rootPath = require("../utils/rootPath");

module.exports = {
  entry: {
    app: rootPath("src/root.tsx"), // 入口文件，指定要打包的主文件，这里是 root.tsx
  },

  output: {
    filename: "[name].[chunkhash:8].js", // 打包输出的文件名，[name] 根据 entry 的 key 自动生成，[chunkhash:8] 为文件内容的 hash
    publicPath: "/", // 打包后在浏览器中访问时的公共路径
    path: rootPath("dist"), // 打包输出的目录
  },

  resolve: {
    alias: {
      "@": rootPath("src/"), // 设置别名，方便在代码中引用模块
    },
    fallback: {
      "react/jsx-runtime": "react/jsx-runtime.js", // 解析 React JSX 运行时的别名，处理 JSX 元素
      "react/jsx-dev-runtime": "react/jsx-dev-runtime.js", // 解析 React 开发环境下的 JSX 运行时的别名
    },
    extensions: [".ts", ".tsx", ".js", ".json"], // 自动解析确定的扩展名，可以在引入模块时不带扩展
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?|mjs)$/i, // 匹配文件的正则表达式，用于确定应该查找哪些文件
        exclude: {
          and: [/node_modules/], // 排除 node_modules 目录下的文件
          not: [/query-string/], // 除了 query-string 模块外，其他都排除
        },
        loader: "babel-loader", // 使用 babel-loader 处理符合条件的文件
      },
      {
        test: /\.css$/i, // 匹配 CSS 文件
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // 使用的 loader，从右到左依次处理
      },
      {
        test: /\.less$/i, // 匹配 LESS 文件
        use: [
          MiniCssExtractPlugin.loader, // 使用 MiniCssExtractPlugin 提取 CSS 到单独的文件
          {
            loader: "css-loader", // 处理 CSS 文件
            options: {
              modules: {
                auto: (resourcePath) => {
                  const p = resourcePath.toLowerCase();
                  // .module.less 结尾的文件被视为 CSS 模块
                  return p.endsWith(".module.less");
                },
                localIdentName: "[local]_[hash:base64:5]", // 指定生成的类名格式
              },
              importLoaders: 1, // 在 css-loader 之后还需要使用的 loader 数量
            },
          },
          "postcss-loader", // 使用 postcss-loader 处理 CSS，进行自动添加浏览器前缀等操作
          "less-loader", // 使用 less-loader 将 LESS 转换为 CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/, // 匹配图片文件
        loader: "url-loader", // 使用 url-loader 处理图片文件
        options: {
          limit: 10000, // 小于 10KB 的图片将被转换为 base64 格式
          name: "img/[name].[hash:7].[ext]", // 输出的文件名格式和路径
        },
      },
      {
        test: /\.svg$/i, // 匹配 SVG 文件
        issuer: /\.[jt]sx?$/, // 匹配的发出方，即哪些文件引入了 SVG 文件
        use: ["@svgr/webpack", "url-loader"], // 使用 @svgr/webpack 处理 SVG 文件，以及 url-loader
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配多媒体文件
        loader: "url-loader", // 使用 url-loader 处理多媒体文件
        options: {
          limit: 10000, // 小于 10KB 的多媒体文件将被转换为 base64 格式
          name: "media/[name].[hash:7].[ext]", // 输出的文件名格式和路径
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配字体文件
        loader: "url-loader", // 使用 url-loader 处理字体文件
        options: {
          limit: 10000, // 小于 10KB 的字体文件将被转换为 base64 格式
          name: "fonts/[name].[hash:7].[ext]", // 输出的文件名格式和路径
        },
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser.js", // 全局变量注入，用于浏览器环境下的 process 对象
      Buffer: ["buffer", "Buffer"], // 全局变量注入，用于浏览器环境下的 Buffer 对象
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/[name].[chunkhash:8].css", // 提取的 CSS 文件名格式
      ignoreOrder: true, // 忽略提取 CSS 的顺序
    }),
  ],
};
