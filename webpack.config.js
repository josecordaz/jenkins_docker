// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
// var webpack = require('webpack');

// Constant with our paths
const paths = {
  DIST : path.resolve(__dirname,'dist'),
  JS   : path.resolve(__dirname,'src/js'),
  SRC  : path.resolve(__dirname,'src'),
};

// Webpack configuration
module.exports = {
   entry: path.join(paths.JS,'app.js'),
   output : {
     path : paths.DIST,
     filename : 'app.bundle.js'
   },
   plugins : [
     new HtmlWebpackPlugin({
       template: path.join(paths.SRC, 'index.html'),
     }),
    // new ExtractTextPlugin('style.bundle.css'),
    //  new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     'window.jQuery': 'jquery',
    //     Popper: ['popper.js', 'default'],
    //     // In case you imported plugins individually, you must also require them here:
    //     // Util: "exports-loader?Util!bootstrap/js/dist/util",
    //     // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    //   })
   ],
   module :{
    rules : [
      {
         test: /\.(js)$/,
         exclude: /node_modules/,
         use : [
           'babel-loader'
         ]
      },
      // {
      //   test: /\.css$/,
      //   loader : ExtractTextPlugin.extract({
      //     use: 'css-loader'
      //   })
      // },
      {
        test: /\.(png|jpg|gif|woff2|woff|eot|svg|ttf)$/,
        use : [
          'file-loader'
        ]
      }
      // ,
      // {
      //   test: /\.html$/,
      //   use: [ {
      //     loader: 'html-loader'
      //   }]
      // }
    ]
   },
   resolve : {
     extensions : ['.js'],
   },
};

