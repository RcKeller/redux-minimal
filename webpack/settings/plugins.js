var CleanWebpackPlugin = require('clean-webpack-plugin')
// export css to a separate file
// config.module.loaders[1] = {
//   test: /\.scss$/,
//   loader: ExtractTextPlugin.extract('css!sass'),
// };

module.exports = (ENV) => {
  let plugins = [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: process.cwd() + '/public',
      verbose: true,
      dry: false // true for simulation
    })
  ]
}
