var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackOptions = require('./webpack.config.js')

webpackOptions.entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000')

var compiler = webpack(webpackOptions)

module.exports = function (app) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/dist/',
    stats: { colors: true },
    noInfo: false,
    quiet: false,
    historyApiFallback: {
      index: '/'
    }
  }))
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))
}
