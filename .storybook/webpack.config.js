// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = ({ config, mode }) => {

	config = {
		...config,
		mode: 'production',
		devtool: '#cheap-module-source-map',
		resolve: {
			...config.resolve,
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		},
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.less$/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
						},
						{
							loader: 'less-loader',
						},
					],
				},
			],
		},

	}

	return config;
};
