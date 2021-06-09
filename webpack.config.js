const path = require("path");
const webpack = require('webpack');

module.exports = {
	entry: path.join(__dirname, "client", "index.jsx"),
	module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					}
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				}
			]	
	},
	resolve: {
			extensions: ['*', '.js', '.jsx']
	},
	output: {
			path: path.join(__dirname, "public"),
			filename: "bundle.js",
			publicPath: "/"
	}, 
	plugins: [
			new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
			hot: true,
			historyApiFallback: true
	}
};