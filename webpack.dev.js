const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
  plugins: [
    // 模块热替换
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        // 处理css
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname,'src')
      },
      {
        test: /\.styl(us)$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname,'src')
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets:['@babel/preset-env']
      //       }
      //     },
      //   ],
      //   exclude: /node_modules/,
      //   include: path.resolve(__dirname,'src')
      // },
      {
        // 处理图片
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
    ],
  },
});