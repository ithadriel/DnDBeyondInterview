var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {test : /\.(js|jsx)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ],
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : './app/index.html',
            filename: "./index.html"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "/app"),
        compress: true,
        port: 3000,
    }
}
