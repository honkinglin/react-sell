const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');

const webpackBaseConfig = function (NODE_ENV = 'development') {

    const webpackConfig = {
        // 定义入口文件
        entry: path.resolve(__dirname, '../src/index.jsx'),
        resolve: {
            // 自动补充后缀
            extensions: ['.js','.jsx','.scss','.json'],
            // 定义路径别名
            alias: {
                '@api': path.resolve(__dirname, '../src/api'),
                '@assets': path.resolve(__dirname, '../src/assets'),
                '@components': path.resolve(__dirname, '../src/components'),
            }
        },
        module: {
            // 定义loader
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
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
                {
                    test: /\.(png|jpe?g|gif|svg|webp|ttf|eot|woff|woff2)/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: '[name].[ext]?[hash:8]',
                        outputPath: 'images/',
                        // publicPath: config.publicPath,
                        // useRelativePath: false,
                    }
                }
            ]
        },
        // 添加插件
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.tpl.html'),
                filename: 'index.html'
            }),
            new ExtractText('css/app.[hash:8].css', {
                allChunks: true,
            }),
        ]
    };

    return webpackConfig;
};

module.exports = webpackBaseConfig;
