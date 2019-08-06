const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server/server.js",
  name: "server",
  target: "node",
  externals: [nodeExternals()],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      { test: /\.css$/, loader: "ignore-loader" },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve("dist"),
    filename: "server.js",
    publicPath: "/dist",
    libraryTarget: "umd"
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new Dotenv()]
};
