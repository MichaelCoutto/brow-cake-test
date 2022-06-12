/*
 * Project: frontend
 * File: webpack.config.js - Author: Miguel Couto (couttonet@gmail.com)
 * Copyright 2022 Miguel Couto
 */

const path = require("path");
const HtmlWebPackPlugin  = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require("webpack-node-externals");

module.exports = {
    //devtool: "inline-source-map",
    entry: [
        "babel-polyfill",
        path.resolve("src", "index.js")
    ],
    target: "web",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        //publicPath: path.resolve(__dirname, "build")
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.join(__dirname, "src"), 
            path.join(__dirname, "node_modules")
        ],
        alias: {
			react: path.join(__dirname, "node_modules", "react"),
		},
    },
    optimization: { 
		minimize: true 
	},
    plugins: [
		new MiniCssExtractPlugin({
			filename: "style.css",
      		//chunkFilename: "[id].[hash].css",
		}),
		new HtmlWebPackPlugin({
			template: path.resolve("src", "index.html"),
		}),
	],
    module: {
        rules: [
            //Loader do React
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
            },
            //Loader do sass
            {
                test: /\.(scss|css)$/,
                sideEffects: true,
                use: [
                    "style-loader", 'css-loader',
                    {
						loader: 'sass-loader',
						options: {
							sourceMap: false,
							sassOptions: {
								outputStyle: "compressed",
							},
						}
					},
                ],
                include: /\.module\.s?(c|a)ss$/,
            },
            {
                test: /\.(scss|css)$/,
                sideEffects: true,
                use: [
                    "style-loader", 'css-loader',
                    {
						loader: 'sass-loader',
						options: {
							sourceMap: false,
							sassOptions: {
								outputStyle: "compressed",
							},
						}
					},
                ],
                exclude: /\.module\.s?(c|a)ss$/,
            }
        ]
    },
    externals: [
		//{ "react": "React" },
        //{ "react-dom": "ReactDOM" }
	],
    devServer: {
		hot: true,
		//Force the webpack to not open the browser
		open: false,
		watchFiles: {
			paths: [path.join(__dirname, "src", "**", "*")],
			options: {
				usePolling: false,
			},
		},
	}
}
