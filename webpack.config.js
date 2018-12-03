const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log('modee', process.env.NODE_ENV);

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devServer: {
    // contentBase: './src',
    contentBase: './dist',
  },
  devtool: 'source-map',
  entry: {
    main: ['./src/js/index.js', './src/scss/style.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};

module.exports = webpackConfig;
