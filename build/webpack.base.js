const path = require('path');
const Glob = require('Glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const { NODE_ENV, PUBLIC_PATH, SERVICE_URL } = require('../config');
const minify = {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
};

function getJsEntry(globPath) {
    let entries = {};
    Glob.sync(globPath).forEach(function (entry) {
        if(!!entry.match(/\.\/app\/pages\//)){
            let basename = path.basename(entry, path.extname(entry));
            let pathname = path.dirname(entry).split('/').reverse()[0];
            // entries[pathname] = entry.split('/app/').join('/');
            entries[pathname] = entry.replace(/\/app\//, '/');
        } else {
            throw new Error('只能在“./app/pages/”目录下面找入口');
        }
    });
    if (NODE_ENV === 'production') {
        return Object.assign({}, entries, {
            vendor: ['jquery', 'bootstrap', 'bootstrap/dist/css/bootstrap.css']
        });
    } else {
        return entries;
    }
};

function getHtmlEntry(globPath) {
    let entries = [];
    Glob.sync(globPath).forEach(function (entry) {
        if(!!entry.match(/\.\/app\/pages\//)){
            let config = {};
            let basename = path.basename(entry, path.extname(entry));
            let pathname = path.dirname(entry).split('/').reverse()[0];
            config['filename'] = pathname + path.extname(entry);
            config['template'] = 'html-withimg-loader!' + entry;
            if (NODE_ENV === 'production') {
                config['chunks'] = ['manifest', 'vendor'].concat([pathname]);
            } else {
                config['chunks'] = [].concat([pathname]);
            }
            config['minify'] = NODE_ENV === 'production' ? minify : false;
            config['chunksSortMode'] = 'dependency';
            entries.push(config);
        } else {
            throw new Error('只能在“./app/pages/”目录下面找页面模板');
        }
    });
    return entries;
};

require('nodemon')('./dyson_services/index.js');

module.exports = {
    context: path.resolve(__dirname, '..', 'app'),
    entry: getJsEntry('./app/pages/**/index.js'),
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
        publicPath: PUBLIC_PATH,
        pathinfo: NODE_ENV === 'development'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'app')
        }
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: '../',
                    // 则这里的 publicPath 作用于css里面的图片的对外路径，和css里面字体的对外路径
                    // 不作用于link标签的href属性
                    // 如果设置 图片loader的publicPath，则会覆盖css里面 图片的对外路径
                    // 如果设置 字体loader的publicPath，则会覆盖css里面 字体的对外路径
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    },{
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: 'postcss.config.js',
                                ctx: {
                                    autoprefixer: {browsers: ['> 1%']}
                                }
                            }
                        }
                    }],
                })
            },{
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: NODE_ENV === 'development' ? 'img/[name].[ext]' : 'img/[name].[hash:8].[ext]',
                        // publicPath: PUBLIC_PATH,
                        // 单独设置图片资源的publicPath，其他文件保留output配置里的publicPath
                        // 会覆盖 css里面的 图片的对外路径
                        // 会影响 html里面 img标签的src属性
                        // 会覆盖 output配置里的 publicPath
                        limit: 1024 * 5
                    }
                },{
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
                test: /\.html$/,
                use: [{
                        loader: "html-withimg-loader",
                        options: {
                            // exclude: /image/,//排除image目录
                            min: false,//默认会去除html中的换行符，配置min=false可不去除
                            deep: false,//将关闭include语法嵌套子页面的功能
                        }
                    },{
                        loader: "html-loader",
                        options: {
                            attrs: ['img:data-src'],
                            interpolate: true,//为 ES6 模板字符串启用插值语法
                            minimize: false,
                            removeComments: false,
                            collapseWhitespace: false,
                        }
                    }]
            },{
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: NODE_ENV === 'development' ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:8].[ext]',
                    publicPath: '../',
                    // 会覆盖css里面的字体的对外路径，所以不设置
                    // 或者和css里字体的对外路径设置成一样
                    limit: 1024 * 5,
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..')
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
                'PUBLIC_PATH': JSON.stringify(PUBLIC_PATH),
                'SERVICE_URL': JSON.stringify(SERVICE_URL),
            }
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.join(__dirname, '..', 'app/assets/sprites/'),
                glob: '*.png'
            },
            target: {
                image: path.join(__dirname, '..', 'app/assets/images/_sprites.png'),
                // css: path.join(__dirname, '..', 'app/assets/styles/_sprites.css')
                css: [
                    [path.join(__dirname, '..', 'app/assets/styles/_sprites.css'), {
                        format: 'handlebars_based_template'
                    }]
                ]
            },
            apiOptions: {
                cssImageRef: '../images/_sprites.png'
            },
            customTemplates: {
                'handlebars_based_template': path.join(__dirname, '..', 'handlebarsStr.css.handlebars')
            },
            spritesmithOptions: {
                padding: 10
            }
        }),
        ...getHtmlEntry('./app/pages/**/index.html').map((item, index) => {
            return new HtmlWebpackPlugin(item);
        })
    ]
}


