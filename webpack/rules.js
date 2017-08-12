
//  Add hot-reloading and quality-of-life babel presets/plugins in development
module.exports = ({ isProduction = false } = {}) => {

  const paths = require('./paths')({ isProduction})

  let babel = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-decorators-legacy']
  }
  if (!isProduction) {
    babel.presets = ['react-hmre', ...babel.presets]
    babel.plugins.push([
      'transform-react-remove-prop-types',
      'transform-react-constant-elements',
      'transform-react-inline-elements'
    ])
  }

  return [{
    test: /\.js$|\.jsx$/,
    use: [
      { loader: 'react-hot-loader' },
      {
        loader: 'babel-loader',
        options: babel
      }
    ],
    exclude: /node_modules/
  }, {
    test: /\.scss$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [paths.modules]
        }
      }
    ],
    include: [paths.app, paths.modules]
  }, {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' }
    ]
  }]

}
