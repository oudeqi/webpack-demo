const base = require('./webpack.base.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
                    name: 'img/[name].[hash:8].[ext]',
                    // publicPath: PUBLIC_PATH,
                    // 单独设置图片资源的publicPath，其他文件保留output配置里的publicPath
                    // 会覆盖 css里面的 图片的对外路径
                    // 会影响 html里面 img标签的src属性
                    // 会覆盖 output配置里的 publicPath
                    limit: 1024 * 5
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    bypassOnDebug: true,
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    optipng: {
                        enabled: false,
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    webp: {
                        quality: 75
                    }
                }
            }]
        },{
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[hash:8].[ext]',
                publicPath: '../',
                // 会覆盖css里面的字体的对外路径，所以不设置
                // 或者和css里字体的对外路径设置成一样
                limit: 1024 * 5,
            }
        }]
    },
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
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});