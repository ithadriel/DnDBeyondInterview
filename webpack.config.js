const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    const isDevelopment = !env.production
    return  {
        entry: './app/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index_bundle.js'
        },
        module: {
            rules: [
                {test: /\.(png)$/, use: 'file-loader'},
                {test: /\.(js|jsx)$/, use: 'babel-loader'},
                {
                    test: /\.module\.s(a|c)ss$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: isDevelopment
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                },
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /\.module.(s(a|c)ss)$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment
                            }
                        }
                    ]
                }
            ],
        },
        mode: 'development',
        plugins: [
            new HtmlWebpackPlugin({
                template: './app/index.html',
                filename: "./index.html"
            })
        ],
        resolve: {
            modules: ["node_modules", path.join(__dirname, "app/assets")],
            extensions: [".js", ".jsx", ".scss"],
        },
        devServer: {
            contentBase: path.join(__dirname, "/app"),
            compress: true,
            port: 3000,
        }
    }
}