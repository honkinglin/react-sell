const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractText = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV = process.env.BABEL_ENV = 'production';

const webpackBaseConfig = require('./webpack.config.base.js')(NODE_ENV);

const webpackConfig = merge(webpackBaseConfig, {
    entry: {
        app: path.join(__dirname, '../src/index.jsx'),
        vendor: ['react', 'react-router-dom', 'better-scroll', 'react-dom', 'axios', 'es6-promise', 'redux', 'react-redux']
    },
    // 定义出口文件
    output: {
        path: path.resolve(__dirname, '../dist/'),
        // 添加文件hash
        filename: 'js/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                use: ExtractText.extract({
                    // publicPath: '',
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader?outputStyle=expanded'
                    ]
                })
            },
        ]
    },
    plugins: [
        new ExtractText('[name].[contenthash].css', {
            allChunks: true,
        }),
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
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ]
});

module.exports = webpackConfig;
