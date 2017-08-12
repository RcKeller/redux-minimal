// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const CURRENT_WORKING_DIR = process.cwd()
const PATHS = {
  app: path.resolve(CURRENT_WORKING_DIR, 'src'),
  entry: path.resolve(CURRENT_WORKING_DIR, 'src', 'index.js'),
  public: path.resolve(CURRENT_WORKING_DIR, 'public'),
  bundle: path.resolve(CURRENT_WORKING_DIR, 'public', 'js'),
  modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules')
}

module.exports = (env = {}) => {
  //  https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172
  const isProduction = env.production === true
  console.warn('PRODUCTION', isProduction)

  //  Route entry point to webpack-dev-server in development
  const entry = () => {
    return isProduction
      ? [PATHS.entry]
      : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        PATHS.entry
      ]
  }

  //  Add hot-reloading and quality-of-life babel presets/plugins in development
  const rules = () => {
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
            includePaths: [PATHS.modules]
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

  }

  const plugins = () => {
    //  Always clean out prior bundles
    let corePlugins = [
      new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
        root: PATHS.public,
        verbose: true,
        dry: false // true for simulation
      })
    ]
    //  Set env and uglify/extract text in production builds
    if (isProduction) {
      corePlugins.push(
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
      )
    }
    return corePlugins
  }

  return {
    entry: entry(),
    output: {
      path: PATHS.bundle,
      publicPath: 'js/',
      filename: 'bundle.js'
    },
    module: {
      rules: rules()
    },
    devServer: { contentBase: PATHS.public },
    plugins: plugins()
  }
}
