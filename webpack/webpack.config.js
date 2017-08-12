// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env = {}) => {
  //  https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172
  const isProduction = env.production === true
  const paths = require('./paths')({ isProduction })
  const rules = require('./rules')({ isProduction })
  const plugins = require('./plugins')({ isProduction })




  return {
    // entry: entry(),
    entry: paths.entry,
    output: {
      path: paths.bundle,
      publicPath: 'js/',
      filename: 'bundle.js'
    },
    module: {
      rules: rules
    },
    devServer: { contentBase: paths.public },
    plugins: plugins
  }
}
