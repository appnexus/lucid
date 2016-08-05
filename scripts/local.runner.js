#!/usr/bin/env node

/*eslint no-console: "allow"*/

const gulp = require('gulp');
require('../gulpfile.js');
const webpack = require('webpack');
const compiler = webpack(require('../webpack.config.js'));
const WebpackDevServer = require('webpack-dev-server');
const Nightwatch = require('nightwatch');
const browserstack = require('browserstack-local');

const server = new WebpackDevServer(compiler, {
	contentBase: '../src/docs/',
	stats: 'errors-only',
});
const local = new browserstack.Local();
Nightwatch.bs_local = local;
const browserStackConfig = {
	key: process.env.BROWSERSTACK_ACCESS_KEY,
};

try {

	process.mainModule.filename = './node_modules/.bin/nightwatch'

	console.log('generate docs');
	// gulp.start('docs-build', () => {

		console.log('start webpack server');
		server.listen(8080, 'localhost', err => {

			if (err) {
				console.log('webpack server start error');
				console.log(err);
				server.close();
				process.exit(1);
			}

			console.log('start browserstack-local');
			local.start(browserStackConfig, err => {

				if (err) {
					console.log('browserstack-local error');
					console.error(err);
					local.stop(() => {
						server.close();
						process.exit(1);
					});
				}

				console.log('start test setup');
				Nightwatch.cli(argv => {

					console.log('run tests');
					Nightwatch.CliRunner(argv)
					// Code to stop browserstack local after end of parallel test
					.setup(null, () => {
						local.stop(() => {
							server.close()
							process.exit(0);
						});
					})
					.runTests(() => {
						// Code to stop browserstack local after end of single test
						local.stop(() => {
							server.close()
							process.exit(0);
						});
					});

				});
			});
		});
	// });

} catch(e) {
	console.error('something broke');
	console.error(e.stack);
	local.stop(() => {
		server.close();
		process.exit(1);
	});
}
