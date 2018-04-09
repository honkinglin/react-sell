const path = require('path');
const merge = require('webpack-merge');

const NODE_ENV = process.env.NODE_ENV = process.env.BABEL_ENV = 'development';

const webpackBaseConfig = require('./webpack.conf.base.js')(NODE_ENV);

const appData = require('../data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

const webpackConfig = merge(webpackBaseConfig, {
    devServer: {
        before(app) {
            app.get('/api/seller', (req, res) => {
                res.json({
                    error: 0,
                    data: seller,
                });
            });
            app.get('/api/goods', (req, res) => {
                res.json({
                    error: 0,
                    data: goods
                });
            });
            app.get('/api/ratings', (req, res) => {
                res.json({
                    error: 0,
                    data: ratings
                });
            });
        },
        historyApiFallback: true,
        inline: true,
        contentBase: path.resolve(__dirname, '../dist/'),
        port: 8099,
        host: '0.0.0.0',
    },
    devtool: 'source-map'
});

module.exports = webpackConfig;
