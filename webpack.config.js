var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/components/main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: [
          'handlebars-loader', // handlebars loader expects raw resource string
          'extract-loader',
          'css-loader',
        ],
      }
    ]
  }
};