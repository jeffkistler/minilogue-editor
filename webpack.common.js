/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  favicon: 'assets/favicon.ico',
  inject: 'body',
});
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['dist']);

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.svg$/, loader: 'svg-sprite-loader', options: { extract: true, esModule: false } },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CleanWebpackPluginConfig,
    new SpriteLoaderPlugin(),
  ],
};

module.exports = config;
