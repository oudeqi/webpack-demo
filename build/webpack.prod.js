const base = require('./webpack.base.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(base, {
    // devtool: '#cheap-module-eval-source-map',
    devtool: '#source-map',
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css',
            allChunks: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            minChunks: Infinity,
            filename: 'js/[name].[chunkhash:8].js',
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('../dll_modules/vendor-manifest.json')
        // }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});