/*
 * process.env.NODE_ENV - used to determine whether we generate a production or development bundle
 *
 * webpack --env.browser - used to determine whether to generate a browser or server bundle
 *
 * NOTE: browser/server is client/server-side rendering respectively in universal/isomorphic javascript
 *
 */
const PATHS = require('./paths')
const rules = require('./rules')
const plugins = require('./plugins')
const externals = require('./externals')
const resolve = require('./resolve')

module.exports = (env = {}) => {
  console.log(`Running webpack in ${process.env.NODE_ENV} mode'}`)

  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
  const node = { __dirname: true, __filename: true }

  const prodConfig = {
    devtool: 'cheap-module-source-map',
    context: PATHS.app,
    entry: {
      app: ['./client'],
      vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-router-redux', 'react-helmet']
    },
    node,
    output: {
      path: PATHS.assets,
      filename: '[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js', // for code splitting. will work without but useful to set
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: true }) },
    resolve,
    plugins: plugins({ production: true })
  }

  const devConfig = {
    devtool: 'eval',
    context: PATHS.app,
    entry: {
      app: ['./client', hotMiddlewareScript],
      vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-router-redux', 'react-helmet']
    },
    node,
    output: {
      path: PATHS.assets,
      filename: '[name].js',
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: false }) },
    resolve,
    plugins: plugins({ production: false })
  }
  const configuration = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

  return configuration
}
