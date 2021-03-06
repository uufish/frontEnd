const webpack = require('webpack')

module.exports = {
  entry: {
    main: process.env.NODE_ENV === 'production'
      ? ['./src/index.js']
      : [
        'react-hot-loader/patch',
        './src/index.js'
      ]
  },
  output: {
    path: require('path').resolve('docs/assets'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: new RegExp('.js$'),
      exclude: new RegExp('node_modules'),
      use: ['babel-loader']
    }, {
      test: new RegExp('.css$'),
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  plugins: process.env.NODE_ENV === 'production'
    ? [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
    : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
  devtool: false,
  devServer: {
    contentBase: require('path').join(__dirname, 'docs'),
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3000,
    hot: true
  }
}
