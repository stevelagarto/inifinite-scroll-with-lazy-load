const webpack = require('webpack');
const webpackClie = require('webpack-cli');
const path = require('path');

const config = {

  entry: './src/infinite-scroll-with-lazy-loading.js', output: {
  
    path: path.resolve(__dirname, 'dist'),
  
    filename: 'bundle.js' }
  
};
  
module.exports = config;