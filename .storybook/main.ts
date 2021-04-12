import path from 'path';

module.exports = {
	// addons: [ // Storybook 6 will use this in the future
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

		config.module.rules.push({
			test: /\.tsx?$/,
			use: [
				{
					loader: 'ts-loader',
					options: {
						configFile: '../tsconfig.json',
						transpileOnly: true
					}
				},
			],
		});

		// Load Typescript Files with React Docgen Typescript. This is very slow so
		// we want to reduce the total number of files that pass through this
		// loader to the bare minimum. Only components and or higher order component
		// files should be processed by this.
		config.module.rules.push({
			test: /\.tsx?$/,
			exclude: [
				// Filter out non-components (Otherwise it needlessly processes typescript files)
				/.storybook/,
				/example/,
				/utils?.ts/,
				/reducers.ts/,
				/selectors.ts/,
				/queries.ts/,
				/constants.ts/
			],
			use: [
				{
					// loader: 'ts-loader', 
					loader: 'ts-loader',
					options: {
						configFile: '../tsconfig.json',
						transpileOnly: true,
					}
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
			loader: 'ts-loader',
			options: {
				configFile: '../tsconfig.json',
				transpileOnly: true
			}
		});

		config.resolve.extensions.push('.ts');
		config.resolve.extensions.push('.tsx');

		return config;
	}
}
