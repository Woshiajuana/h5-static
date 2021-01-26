
const { resolve } = require('path');
const { merge } = require('webpack-merge');

// 基础配置
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {

    // 模式
    mode: 'development',

    // loader 配置
    module: {
        rules: [
            // css 样式
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            // sass 样式
            {
                test: /\.s(c|a)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    // devServer
    // 自动编译，自动打开浏览器，字段刷新浏览器
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动 devServer 指令为：webpack-dev-server
    devServer: {
        // 运行的目录
        contentBase: resolve(__dirname, '../public/'),
        host: '0.0.0.0',
        // 启动 gzip 压缩
        compress: true,
        // 服务端口
        port: 9527,
        // 自动打开浏览器
        open: false,
        // 开启 hot
        hot: false,
    },
});
