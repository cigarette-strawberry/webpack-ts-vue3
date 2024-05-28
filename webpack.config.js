const { Configuration } = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * @type {Configuration}
 */
const config = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[chunkhash].js',
    clean: true
  },
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ],
  module: {
    // loader是用来处理对应文件的 要解析什么文件就装对应类型的loader
    // 例如: ts-loader用来解析ts文件
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        // 所有的样式都是由 css-loader 统一去处理的
        // style-loader 只是把 css-loader 处理后的内容插入到 html 文件中
        use: [MiniCssExtractPlugin.loader, 'css-loader'] // 顺序不能变 从右向左
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        moment: {
          name: 'moment',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]moment/
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2 // 使用次数大于2次就会被分割出来
        }
      }
    }
  }
}

module.exports = config
