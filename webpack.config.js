const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        analog: __dirname + '\\src\\lanb-analog.js',
    },
    output: {
        path: __dirname + '\\dist',
        filename: '[name].js',
        library: 'lanb-analog',
        libraryTarget: 'umd',
        publicPath: "/dist/",
    },
    plugins: [
        new UglifyJsPlugin()
    ]
}