const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
        vendor: ['jquery', 'bootstrap']
    },
    output: {
        path: path.join(__dirname, '..', 'dll_modules'),
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
          path: path.join(__dirname, '..', 'dll_modules', '[name]-manifest.json'),
          filename: '[name].js',
          name: '[name]',
        }),
    ]
};