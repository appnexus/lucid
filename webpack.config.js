// This file exists for the docs generation

var path = require('path');

module.exports = {
	devtool: 'source-map',
	context: __dirname,
	entry: [
		'./docs/index.html',
		'./docs/index.jsx'
	],
	output: {
		path: path.join(__dirname, '/dist/docs'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: 'dist/docs'
	},
	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: 'file?name=index.html'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /(node_modules)/
			},
			{
				test: /\.less$/,
				loaders: ['style', 'css?sourceMap', 'less?sourceMap']
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
