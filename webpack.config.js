'use strict';

let path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'public/javascripts'),
  entry: 'app',
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader?cacheDirectory'}
    ]
  },
  resolve: {
    root: path.resolve(__dirname, 'public/javascripts'),
    modulesDirectories: ['node_modules']
  }
};
