// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const ENV = process.env.NODE_ENV
const CWD = process.cwd()
const PATHS = {
  app: path.resolve(CWD, 'src'),
  entry: path.resolve(CWD, 'src', 'index.js'),
  public: path.resolve(CWD, 'public'),
  bundle: path.resolve(CWD, 'public', 'js'),
  modules: path.resolve(CWD, 'node_modules')
}

//  Babel configuration
let babel = {
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['transform-decorators-legacy']
}
if (ENV !== 'production') {
  babel.presets = ['react-hmre', ...babel.presets]
  babel.plugins.push([
    'transform-react-remove-prop-types',
    'transform-react-constant-elements',
    'transform-react-inline-elements'
  ])
}

let config = {
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    PATHS.entry
  ],
  output: {
    path: PATHS.bundle,
    publicPath: 'js/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.js$|\.jsx$/,
        use: [
          { loader: 'react-hot-loader' },
          {
            loader: 'babel-loader',
            options: {
              presets: babel.presets,
              plugins: babel.plugins
            }
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
                includePaths: [path.resolve(process.cwd(), 'node_modules')]
            }
          }
        ],
        include: [PATHS.app, PATHS.modules]
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }]
  },
  devServer: { contentBase: PATHS.public },
  plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: PATHS.public,
      verbose: true,
      dry: false // true for simulation
    })
  ]
}

//  Add build process for production
// disable the hot reload
if (ENV === 'production') {
  config.entry = [process.cwd() + '/src/index.js']

  // production env
  config.plugins.push([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compressor: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('../css/main.css')
  ])

  // export css to a separate file
  // config.module.loaders[1] = {
  //   test: /\.scss$/,
  //   loader: ExtractTextPlugin.extract('css!sass'),
  // };
}
module.exports = config
