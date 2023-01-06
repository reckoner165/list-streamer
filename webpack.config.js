const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'list-streamer.bundle.js',
  },
}