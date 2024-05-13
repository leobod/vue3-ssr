const { default: merge } = require('webpack-merge');
const base =  require('./base.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(base, {
    mode: "production",
    // devtool: 'source-map',
    entry: {
        'client' : path.resolve(__dirname, '../src/entry-client.js')
    },
    output:{
        clean: true,
        filename: '[name].client.bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.template.html',
            template: path.resolve('public/index.template.html')
        })
    ]

})
