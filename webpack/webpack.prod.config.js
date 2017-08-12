var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./webpack.config.js')    // inherit from the main config file

// disable the hot reload
config.entry = [process.cwd() + '/src/index.js']

// production env
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
)

// compress the js file
config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      warnings: false
    }
  })
)

// export css to a separate file
// config.module.loaders[1] = {
//   test: /\.scss$/,
//   loader: ExtractTextPlugin.extract('css!sass'),
// };

config.plugins.push(
  new ExtractTextPlugin('../css/main.css')
)

module.exports = config
