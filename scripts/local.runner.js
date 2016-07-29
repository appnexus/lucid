#!/usr/bin/env node

const Nightwatch = require('nightwatch');
const browserstack = require('browserstack-local');

// Code to start browserstack local before start of test
console.log('Connecting local');
const bs_local = new browserstack.Local();
bs_local.start({'key': process.env.BROWSERSTACK_ACCESS_KEY }, function(error) {
	if (error) {
		console.error(error);
		process.exit(1);
	}

	console.log('Connected. Now testing...');
	Nightwatch.cli(function(argv) {
		Nightwatch.CliRunner(argv)
		.setup(null, function(){
			// Code to stop browserstack local after end of parallel test
			bs_local.stop(function(){});
		})
		.runTests(function(){
			// Code to stop browserstack local after end of single test
			bs_local.stop(function(){});
		});
	});
});
