'use strict';

let path = require('path');

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'public'),
  entry: 'javascripts/app',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'javascripts/app.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'raw!autoprefixer!sass?precision=8'
      )
    }]
  },
  resolve: {
    root: path.resolve(__dirname, 'public'),
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new ExtractTextPlugin('stylesheets/app.css')
  ]
};
