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
const browserStackConfig = {
	key: process.env.BROWSERSTACK_ACCESS_KEY,
};

console.log('generate docs');
gulp.start('docs-build', () => {

	console.log('start webpack server');
	server.listen(8080, 'localhost', () => {

		//Code to start browserstack local before start of test
		console.log('connect local');
		local.start(browserStackConfig, error => {

			if (error) { return console.error(error); }
			console.log('start test setup');
			Nightwatch.cli(argv => {

				Nightwatch.CliRunner(argv)
					.setup(null, () => console.log('finished test setup'))
					.runTests(() => {
						console.log('run tests');
						// Code to stop browserstack local after end of single test
						local.stop(() => {
							server.close()
							process.exit(0);
						});
					});

			});
		});
	});
});
