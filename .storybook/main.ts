import path from 'path';

module.exports = {
	// addons: [
	// 	'@storybook/addon-docs',
	// 	'@storybook/addon-notes/register-panel',
	// 	'@storybook/addon-options',
	// 	'@storybook/addon-links/register',
	// 	'./lucid-docs-addon'
	// ],
	webpackFinal: (config, { configType }) => {
  	// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
		config.module.rules.push({
			test: /\.tsx?$/,
			use: [
				{
					loader: require.resolve("babel-loader"),
					options: {
						presets: [require.resolve("babel-preset-react-app")]
					}
				},
				require.resolve("react-docgen-typescript-loader")
			]
		});

		config.module.rules.push({
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
		});

		config.resolve.extensions.push('.ts');
		config.resolve.extensions.push('.tsx');		

		return config;
	},
	managerWebpack: (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
			test: /\.tsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		});

		config.resolve.extensions.push('.ts');
		config.resolve.extensions.push('.tsx');

    return config;
  }
}
