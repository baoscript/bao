const webpack = require('webpack');
const path = require('path');

const PROD = process.env.NODE_ENV === "production";

const component = require('./package.json');

const config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: './bao.js',
  output: {
    path: path.resolve(__dirname, 'release'),
    filename: PROD ? 'bao.min.js' : 'bao.js',
    library: 'Bao',
    libraryTarget: 'umd'
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    }]
  }
};

module.exports = config;
