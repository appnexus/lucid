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
					loader: 'babel-loader',
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
			// exclude: /node_modules/,
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
		});

		config.resolve.extensions.push('.ts');
		config.resolve.extensions.push('.tsx');

    return config;
  }
}
