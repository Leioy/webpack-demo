const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  // 入口文件
  // entry: './src/index.js',
  entry: {
    app: './src/index.js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'output manager'
    }),
    // 模块热替换
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    // 输出文件名称
    filename: '[name].bundle.js',
    path: path.resolve(__dirname,'dist'),
  },
  // 开启热更新模式
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  // module: {
  //   rules: [
  //     {
  //       // 处理css
  //       test: /\.css$/,
  //       use: [
  //         'style-loader',
  //         'css-loader',
  //       ]
  //     },
  //     {
  //       // 处理图片
  //       test: /\.(png|svg|jpg|gif)$/,
  //       use: ['file-loader']
  //     },
  //   ],
  // }
}