var path = require('path');
var outputPath = __dirname + '/dist';
var node_modules = path.resolve(__dirname, '/node_modules');
var compass_mixins = path.resolve(node_modules, '/compass-mixins/lib');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var OfflinePlugin = require('offline-plugin');

var production = process.argv.indexOf('--production') >= 0;
var version = [
    process.env.VERSION || 'dev',
    (new Date()).toISOString()
].join(', ');



module.exports = {
    context: __dirname,
    devtool: production ? 'source-map' : 'eval',
    entry: './scripts.js',
    output: {
        path: outputPath,
        filename: 'scripts-[hash:5].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader']
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader?limit=0&name=/fonts/[name].[hash:5].[ext]'
            },
            {
                test: /(\.json|favicon\.png)/,
                loader: 'file-loader?limit=0&name=/[path][name].[ext]'
            },
            {
                test: /\.(gif|jpg|png)$/,
                exclude: /favicon\.png/,
                loader: 'url-loader?limit=2048&name=/images/[name].[hash:5].[ext]'
            },
            {
                test: /\.svg/,
                loader: 'svg-url-loader'
            }
        ]
    },
    resolve: {
        alias : {
            jquery: __dirname + '/node_modules/jquery/dist/jquery.min.js'
        }
    },
    plugins: [
        // Production + Dev
        new CleanWebpackPlugin([outputPath]),
        new ExtractTextPlugin('styles-[contenthash:5].min.css'),
        new HtmlWebpackPlugin({
            showErrors: !production,
            template: 'webpage.html',
            filename: '../index.html',
            version: version
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     compress: true,
        //     mangle: true,
        //     screw_ie8: true,
        //     sourcemap: true
        // }),
        // new CompressionPlugin({
        //     asset: "[path]",
        //     algorithm: "gzip",
        //     test: /\.js$|\.html$/,
        //     minRatio: 0.8
        // }),
        new OfflinePlugin({
            publicPath: './dist/',
            ServiceWorker: {
                output: './sw.js'
            },
            externals: [
                './docs/about-us.html'
            ]
        })
    ]
};

module.exports.plugins.push(
    new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
    })
);
