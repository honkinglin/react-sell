const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractText = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV = process.env.BABEL_ENV = 'production';
const PUBLIC_PATH = '/react-sell/dist/';

const webpackBaseConfig = require('./webpack.config.base.js')(NODE_ENV);

const webpackConfig = merge(webpackBaseConfig, {
    entry: {
        app: path.join(__dirname, '../src/index.jsx'),
        vendor: ['react', 'react-router-dom', 'better-scroll', 'react-dom', 'axios', 'es6-promise']
    },
    // 定义出口文件
    output: {
        path: path.resolve(__dirname, '../dist/'),
        // 添加文件hash
        filename: 'static/js/[name].[chunkhash:8].js',
        publicPath: PUBLIC_PATH
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
        new ExtractText('static/css/[name].[contenthash:8].css', {
            allChunks: true,
            publicPath: PUBLIC_PATH
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
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../public/manifest.json'),
                to: '',
            }
        ]),
        new SWPrecacheWebpackPlugin(
            {
              cacheId: 'react-sell',
              dontCacheBustUrlsMatching: /\.\w{8}\./,
              filename: 'service-worker.js',
              minify: true,
              navigateFallback: PUBLIC_PATH + 'index.html',
              staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
            }
        )
    ]
});

module.exports = webpackConfig;
