// This webpack config builds lucid for the use in a <script> tag that already
// has React and ReactDOM available as globals

var path = require('path');
var webpack = require('webpack');
var isMinified = process.argv.indexOf('--minify') !== -1;

module.exports = {
	context: __dirname,
	entry: [
		'./src/index.js',
	],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: isMinified ? 'lucid.min.js' : 'lucid.js',
		libraryTarget: 'var',
		library: 'Lucid',
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',

		// to avoid duplicate import of React with react-addons-css-transition-group
		'./React': 'React',
		'./ReactDOM': 'ReactDOM',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /(node_modules)/,
			},
			{
				test: /\.json/,
				loader: 'json',
			},
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	plugins: [
		isMinified ? new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"',
			},
		}) : function() {},
		isMinified ? new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}) : function() {},
	],
};
