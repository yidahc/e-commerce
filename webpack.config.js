var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = (env) => {
  const isProduction = env === "production";

  return {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'env']
      }
    },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  devtool: isProduction ? "source-map" : "cheap-module-eval-source-map"
  }
};