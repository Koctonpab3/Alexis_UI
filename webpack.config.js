const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, options) => {
  
  const isProduction = options.mode === 'production';

  return {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new HtmlWebpackPlugin({
        title: 'Alexis UI',
        template: './src/index.html',
        filename: isProduction ? '../index.html' : 'index.html'
        
      })
    ],
  
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 
          {
            loader: "css-loader", options: {
                sourceMap: true,
                modules: true,
                localIdentName: "[local]___[hash:base64:5]"
            }
        }, {
            loader: "sass-loader", options: {
                sourceMap: true
            }
        }
          ]
      }
    ]
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      open: true,
      historyApiFallback: true,
      publicPath: ''
    }
  };
};
