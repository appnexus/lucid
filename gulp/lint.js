var gulp = require('gulp');
var eslint = require('gulp-eslint');

var CONFIG = require('./config');

module.exports = function lint() {
	return gulp.src([
		CONFIG.JS_GLOB.SOURCE,
		CONFIG.TEST_GLOB.SOURCE,
		'!node_modules/**',
		'!/**/*.json'
	])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
};
