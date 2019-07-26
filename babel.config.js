module.exports = function(api) {
	const isProduction = process.env.NODE_ENV === 'production';
	const isDocsBuild = process.env.NODE_DEST_ENV === 'docs';
	api.cache(!isProduction);
	return {
		env: {
			test: {
				plugins: [
					['@babel/plugin-proposal-object-rest-spread'],
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
				plugins: [['@babel/plugin-proposal-object-rest-spread'], 'lodash'],
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
					['@babel/plugin-proposal-object-rest-spread'],
					'lodash',
					...(isDocsBuild
						? []
						: [
								[
									'react-peek/babel',
									{
										minifyStatics: true,
									},
								],
						  ]),
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
					['@babel/plugin-proposal-object-rest-spread'],
					[
						'react-peek/babel',
						{
							minifyStatics: true,
						},
					],
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
