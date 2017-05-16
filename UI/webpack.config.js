var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CopyWebpackPluginConfig = new CopyWebpackPlugin(
	[
		{ from: './app/css', to: __dirname + '/dist/app/css' },
		{ from: './app/img', to: __dirname + '/dist/app/img' },
		{ from: './app/js', to: __dirname + '/dist/app/js' },
		{ from: './semantic/dist', to: __dirname + '/dist/semantic/dist' }
	],
	[
		{ copyUnmodified: true }
	]
);

var path = require('path');

module.exports = {
	entry: [
		'./app/index.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: 'index_bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
		]
	},
	plugins: [
		HtmlWebpackPluginConfig,
		CopyWebpackPluginConfig
	]
}
