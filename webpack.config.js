/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Load .env file into process.env
require('dotenv').config();

// eslint-disable-next-line
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devServer: {
    port: 7891,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:7890'),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require('postcss-import')(),
                  require('autoprefixer')(),
                  require('postcss-nested')(),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 1000 },
        },
      },
    ],
  },
};
