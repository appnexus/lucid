export default {
	addons: ['@storybook/addon-essentials', '@storybook/addon-postcss'],
	stories: [
		'../docs/**/*.stories.mdx',
		'../src/components/**/*.stories.tsx',
		'../docs/index.stories', // Legacy stories that have not been migrated to CFS
	],
	typescript: {
		reactDocgen: 'react-docgen',
	},
	webpackFinal: (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

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

		return config;
	},
};
