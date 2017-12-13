const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
        dll: ['jquery', 'bootstrap']
    },
    output: {
        path: path.join(__dirname, '..', 'dll_modules'),
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new webpack.DllPlugin({
          path: path.join(__dirname, '..', 'dll_modules', '[name]-manifest.json'),
          name: '[name]',
        }),
    ]
};