const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(base, {
    // devtool: '#cheap-module-eval-source-map',
    devtool: '#source-map',
    devServer: {
        host: "localhost",
        contentBase: [path.join(__dirname, '..', 'dist')],
        headers: {
            "X-Custom-Foo": "bar"
        },
        historyApiFallback: true,
        compress: true,//对资源启用 gzip 压缩
        publicPath: '/',
        inline: true,
        port: 3000,
        clientLogLevel: "none",//none, error, warning 或者 info（默认值）
        noInfo: false,
        open: true,
        // openPage: '/different/page'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: false
        })
    ]
});