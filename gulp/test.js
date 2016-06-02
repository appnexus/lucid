var gulp = require('gulp');
var mocha = require('gulp-mocha');
var CONFIG = require('./config');

var debugBrk = process.env.NODE_ENV === 'test';

module.exports = {
	test: function once() {
		return gulp.src(CONFIG.TEST_GLOB.DEST)
		.pipe(mocha({
			require: ['./gulp/beforeAll'],
			reporter: 'spec',
			debugBrk: debugBrk,
		}));
	},

	tdd: function tdd() {
		gulp.watch([ CONFIG.TEST_GLOB.SOURCE, CONFIG.JS_GLOB.SOURCE ], ['test'])
	},
}
