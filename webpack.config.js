const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
    const isDevelopment = !env.production
    return  {
        entry: './app/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevelopment ? 'index_bundle.js' : 'index_bundle.[contenthash].js'
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
        mode: isDevelopment ? 'development' : 'production',
        plugins: [
            new HtmlWebpackPlugin({
                template: './app/index.html',
                filename: "./index.html",
                favicon: "./app/assets/favicon.png",
            }),
            new MiniCssExtractPlugin(),
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