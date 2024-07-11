const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 从JS中分离css，成单独css文件
const rootPath = require('../utils/rootPath');

module.exports = {
  entry: {
    app: rootPath('src/root.tsx'),
  },

  output: {
    filename: '[name].[chunkhash:8].js',
    publicPath: '/',
    path: rootPath('dist'),
  },

  resolve: {
    alias: {
      '@': rootPath('src/'),
    },
    fallback: {
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?|mjs)$/i,
        exclude: {
          and: [/node_modules/],
          not: [/query-string/],
        },
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (resourcePath) => {
                  const p = resourcePath.toLowerCase();
                  // .module.less 结尾的才会被当作 css module
                  return p.endsWith('.module.less');
                },
                localIdentName: '[local]_[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].[chunkhash:8].css',
      ignoreOrder: true,
    }),
  ],
};
