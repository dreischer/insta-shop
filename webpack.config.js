const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: [
    './app'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist/'),
    publicPath: '/dist/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: 'buble-loader',
        options: {
          jsx: 'React.h',
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
