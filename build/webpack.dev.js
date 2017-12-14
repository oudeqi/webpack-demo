const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(base, {
    // devtool: '#cheap-module-eval-source-map',
    devtool: '#source-map',
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'img/[name].[ext]',
                    // publicPath: PUBLIC_PATH,
                    // 单独设置图片资源的publicPath，其他文件保留output配置里的publicPath
                    // 会覆盖 css里面的 图片的对外路径
                    // 会影响 html里面 img标签的src属性
                    // 会覆盖 output配置里的 publicPath
                    limit: 1024 * 5
                }
            }]
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]',
                publicPath: '../',
                // 会覆盖css里面的字体的对外路径，所以不设置
                // 或者和css里字体的对外路径设置成一样
                limit: 1024 * 5,
            }
        }]
    },
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