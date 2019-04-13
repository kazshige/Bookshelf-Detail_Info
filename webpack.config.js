const path = require("path");
const webpack = require("webpack")
module.exports = {
  entry:  path.join(__dirname, 'client', 'src', 'index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.(jpg|png|svg|jpeg)$/,
        loader: 'file-loader'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'client', 'public'),
    publicPath: '/',
    filename: 'bundle-main.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'client', 'public'),
    historyApiFallback: true,
    hot: true
  }
};
