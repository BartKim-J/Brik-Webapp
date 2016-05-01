'use strict';

let path = require('path');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'public'),
  entry: 'javascripts/app',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'javascripts/app.js',
    chunkFilename: 'javascripts/app.[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'raw!autoprefixer!sass?precision=17'
      )
    },
    {
      // I want to uglify with mangling only app files, not thirdparty libs
      test: /.*\/app\/.*\.js$/,
      exclude: /.spec.js/, // excluding .spec files
      loader: "uglify"
    }]
  },
  resolve: {
    root: path.resolve(__dirname, 'public'),
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new ExtractTextPlugin('stylesheets/app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
};

console.log(process.env.NODE_ENV);
