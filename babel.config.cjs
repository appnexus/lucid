module.exports = function(api) {
	const isProduction = process.env.NODE_ENV === 'production';
	const isDocsBuild = process.env.NODE_DEST_ENV === 'docs';
	api.cache(!isProduction);
	return {
		env: {
			test: {
				plugins: [
					'@babel/plugin-proposal-object-rest-spread',
					'@babel/plugin-proposal-class-properties',
				],
				presets: [
					[
						'@babel/env',
						{
							targets: {
								browsers: ['last 2 versions'],
							},
						},
					],
					'@babel/preset-typescript',
					'@babel/react',
				],
			},
			development: {
				plugins: [
					'@babel/plugin-proposal-object-rest-spread',
					'@babel/plugin-proposal-class-properties',
					'lodash',
				],
				presets: [
					[
						'@babel/env',
						{
							targets: {
								browsers: ['last 2 versions'],
							},
						},
					],
					'@babel/preset-typescript',
					'@babel/react',
				],
			},
			production: {
				plugins: [
					'@babel/plugin-proposal-object-rest-spread',
					'@babel/plugin-proposal-class-properties',
					'lodash',
				],
				presets: [
					[
						'@babel/env',
						{
							targets: {
								browsers: ['last 2 versions'],
							},
						},
					],
					'@babel/preset-typescript',
					'@babel/react',
				],
			},
			modules: {
				plugins: [
					'@babel/plugin-proposal-object-rest-spread',
					'@babel/plugin-proposal-class-properties',
					'lodash',
				],
				presets: [
					[
						'@babel/env',
						{
							targets: {
								browsers: ['last 2 versions'],
							},
							modules: false,
						},
					],
					'@babel/preset-typescript',
					'@babel/react',
				],
			},
		},
	};
};
