var ExtractTextPlugin = require('extract-text-webpack-plugin')
// export css to a separate file
// config.module.loaders[1] = {
//   test: /\.scss$/,
//   loader: ExtractTextPlugin.extract('css!sass'),
// };

module.exports = (ENV) => {
  let rules = [{
    test: /\.js$/,
    use: [
        { loader: 'react-hot-loader' },
        { loader: 'babel-loader'}
    ],
    exclude: /node_modules/
  }, {
    test: /\.css$/,
    use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
    ]
  }]

  if (ENV !== 'production') {
    rules.push({
        // https://github.com/jtangelder/sass-loader
      test: /\.scss$/,
      use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
      ]
    })
  } else {
    rules.push({
      test: /\.scss$/,
      use: [{ loader: ExtractTextPlugin.extract('css!sass') }]
    })
  }

  return rules
}
