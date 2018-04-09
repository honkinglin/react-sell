const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const NODE_ENV = process.env.NODE_ENV = process.env.BABEL_ENV = 'production';

const webpackBaseConfig = require('./webpack.conf.base.js')(NODE_ENV);

const webpackConfig = merge(webpackBaseConfig, {
    // 定义出口文件
    output: {
        path: path.resolve(__dirname, '../dist/'),
        // 添加文件hash
        filename: 'bundle.js?[hash:8]'
    },
    plugins: [
        // 开启js压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            output: {
                // 去除注释
                comments: false
            }
        })
    ]
});

module.exports = webpackConfig;
