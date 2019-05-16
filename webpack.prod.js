const webpack = require('webpack')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  externals: {
    "echarts": "echarts"
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
          discardComments: { removeAll: true },
          // 避免 cssnano 重新计算 z-index
          safe: true,
          // cssnano 集成了autoprefixer的功能
          // 会使用到autoprefixer进行无关前缀的清理
          // 关闭autoprefixer功能
          // 使用postcss的autoprefixer功能
          autoprefixer: false
      },
      canPrint: true
  }),
  ],
  module: {
    rules: [
      {
        // 处理css
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              minimize: true
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')({
                browsers: [
                  "ie >= 11",
                  "ff >= 30",
                  "chrome >= 34",
                  "safari >= 7",
                  "opera >= 23",
                  "ios >= 7",
                  "android >= 4.4",
                  "bb >= 10"
                ]
              })]
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              minimize: true
            },
          },
          // {
          //   loader: "style-loader" // creates style nodes from JS strings
          // },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "stylus-loader" // compiles Stylus to CSS
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname,'src')
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory',
            // options: {
            //   presets:['@babel/preset-env']
            // }
          },
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname,'src')
      },
      {
        // 处理图片
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
    ],
  }
});