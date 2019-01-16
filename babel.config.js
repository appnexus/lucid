module.exports = function(api) {
	const isProduction = process.env.NODE_ENV === 'production';
	api.cache(!isProduction);
	return {
		env: {
			test: {
				plugins: [
					['@babel/plugin-proposal-object-rest-spread'],
					[
						'babel-plugin-transform-require-ignore',
						{
							extensions: ['.less', '.css'],
						},
					],
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
					'@babel/react',
				],
			},
			production: {
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
					'@babel/react',
				],
			},
			modules: {
				plugins: [
					['@babel/plugin-proposal-object-rest-spread'],
					[
						'babel-plugin-transform-require-ignore',
						{
							extensions: ['.less', '.css'],
						},
					],
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
					'@babel/react',
				],
			},
		},
	};
};
