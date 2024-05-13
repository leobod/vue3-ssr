const webpack = require('webpack');
const { default: merge } = require('webpack-merge');
const base =  require('./base.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(base, {
    mode: "development",
    entry: {
        'client' : path.resolve(__dirname, '../src/entry-client.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.template.html',
            template: path.resolve('public/index.template.html')
        })
    ],
    watch: true, // 启用watch模式
    watchOptions: {
        ignored: /node_modules/, // 忽略不需要监控的文件或目录
        // poll: 1000, // 每秒检查变动
        aggregateTimeout: 500, // 防止频繁重新编译
    }
})
