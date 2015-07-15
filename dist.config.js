module.exports = {
  context: __dirname + '/src',
  entry: {
    'connectToStores': ['./connectToStores.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'Alt',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  externals: {
    'react': 'react',
    'react/addons': 'react/addons',
    'alt': 'alt'
  }
};
