const path = require('path');
// webpack configuration for all environments (starting point)
module.exports = {
  // entry point for react app
  entry: {
    app: "./app/app.js"
  },
  // output of compiled js (bundle.js)
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/',
    filename: "bundle.js"
  },
  // transformations
  module: {
    loaders: [
      {
        // limited to .js or .jsx extensions
        test: /\.jsx?$/,
        // only look inside app folder
        include: /app/,
        // redundant step; excludes any node_modules files
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          // transformations
          presets: ["react", "env"],
          plugins: [require('babel-plugin-transform-object-rest-spread')]
        }
      }
    ]
  }
};