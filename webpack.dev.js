/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: {
      rewrites: [
      ],
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      BASENAME: 'undefined',
    }),
  ],
});
