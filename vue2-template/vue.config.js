
'use strict';

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    // outputDir: 'dist',
    assetsDir: 'static',
    // lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: {
        // name: '',
        resolve: {
            alias: {
                '@': resolve('src'),
                'src': resolve('src'),
            }
        }
    },
};
