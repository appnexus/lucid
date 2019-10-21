// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');

module.exports = ({ config, mode }) => {
	config = {
		...config,
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
					use: [
						{
							loader: 'ts-loader',
						},
						{
							loader: 'react-docgen-typescript-loader',
							options: {
								tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
								setDisplayName: false,
								propFilter: (prop, component) => {
									if (prop.parent) {
										return !prop.parent.fileName.includes('node_modules');
									}
									return true;
								},
							},
						},
					],
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
	};

	return config;
};
