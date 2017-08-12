var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// module.exports = require('./webpack.config.js');    // inherit from the main config file

var config = require('./webpack.config.js')    // inherit from the main config file
// disable the hot reload
config.entry = [process.cwd() + '/src/index.js']

// export css to a separate file
// config.module.loaders[1] = {
//   test: /\.scss$/,
//   loader: ExtractTextPlugin.extract('css!sass')
// };
config.plugins.push(
  new ExtractTextPlugin('../css/main.css')
)
module.exports = config
