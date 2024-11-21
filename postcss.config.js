const postCss = require('postcss');
const postcssMixins = require('postcss-mixins');
const postcssFunctions = require('postcss-functions');
const path = require('path');

module.exports = {
    plugins: [
        postcssMixins({
            mixinsDir: path.join(__dirname, 'src/css')
        }),
        postcssFunctions({
            functions: {
                vw: (pxVw, baseVw = 1440) => `calc(${pxVw} * 100vw / ${parseFloat(baseVw)})`
            }
        }),
        postCss()
    ]
};