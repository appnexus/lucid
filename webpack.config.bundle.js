// This webpack config builds lucid for the use in a <script> tag that already
// has React and ReactDOM available as globals

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProduction ? 'production' : 'development',
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: isProduction ? 'lucid.min.js' : 'lucid.js',
		libraryTarget: 'var',
		library: 'Lucid',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [path.resolve(__dirname, 'src')],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: !isProduction } },
					{ loader: 'postcss-loader', options: { sourceMap: !isProduction } },
					{ loader: 'less-loader', options: { sourceMap: !isProduction } },
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devtool: isProduction ? false : 'source-map',
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'lucid.css',
			disable: !isProduction,
		}),
		new MiniCssExtractPlugin({
			filename: 'index.css',
			disable: !isProduction,
		}),
	],
};
