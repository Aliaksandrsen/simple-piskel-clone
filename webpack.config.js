const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    piskel: './src/piskel.js',
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false },
          },
        ],
      },

      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [
          /node_modules/,
        ],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              useRelativePath: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/screens/canvas/piskel.html',
      filename: './piskel.html',
      // inject: true,
      chunks: ['piskel'],
    }),

    new HtmlWebPackPlugin({
      template: './src/landing/index.html',
      filename: './index.html',
      // inject: true,
      chunks: ['index'],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[id].css',
    }),

    new CopyPlugin([
      {
        from: './src/gifLibrary/gif.worker.js',
        to: './gif.worker.js',
        toType: 'file',
      },
    ]),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    stats: 'errors-only',
    compress: true,
    port: 3000,
  },
};
