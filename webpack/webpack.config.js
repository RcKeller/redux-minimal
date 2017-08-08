// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const ENV = process.env.NODE_ENV === 'production' || 'development'
module.exports = {
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    process.cwd() + '/src/index.js',
  ],
  output: {
    path: process.cwd() + '/public/js',
    publicPath: 'js/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'react-hot-loader'
        }, {
          loader: 'babel-loader'
        }],
        exclude: /node_modules/,
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }],
      }
    ],
  },
  devServer: {
    contentBase: process.cwd() + '/public',
  },
  plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: process.cwd() + '/public',
      verbose: true,
      dry: false, // true for simulation
    }),
  ],
};
