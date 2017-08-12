// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')

const ENV = process.env.NODE_ENV
console.warn()
const CURRENT_WORKING_DIR = process.cwd()
const PATHS = {
  app: path.resolve(CURRENT_WORKING_DIR, 'src'),
  entry: path.resolve(CURRENT_WORKING_DIR, 'src', 'index.js'),
  public: path.resolve(CURRENT_WORKING_DIR, 'public'),
  bundle: path.resolve(CURRENT_WORKING_DIR, 'public', 'js'),
  modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules')
  // antd: path.resolve(CURRENT_WORKING_DIR, 'node_modules/antd')
}

module.exports = (env = {}) => {
  const core = {
    entry: [
      // http://gaearon.github.io/react-hot-loader/getstarted/
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      PATHS.entry
    ],
    output: {
      path: PATHS.bundle,
      publicPath: 'js/',
      filename: 'bundle.js'
    },
    module: {
      rules: [{
          test: /\.js$/,
          use: [
            { loader: 'react-hot-loader' },
            { loader: 'babel-loader' }
          ],
          exclude: /node_modules/
        }, {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              // options: {
              //     sourceMap: true,
              //     includePaths: [
              //         path.resolve(process.cwd(), 'node_modules'),
              //     ]
              // }
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
  const prod = core
  prod.entry =  [
    'babel-polyfill',
    process.cwd() + '/src/index.js'
  ]


  const config = ''
  return config

}

module.exports = {
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    PATHS.entry
  ],
  output: {
    path: PATHS.bundle,
    publicPath: 'js/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: [
          { loader: 'react-hot-loader' },
          { loader: 'babel-loader' }
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
                includePaths: [
                    path.resolve(process.cwd(), 'node_modules'),
                ]
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
