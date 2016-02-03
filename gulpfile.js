var gulp = require('gulp');

var build = require('./gulp/build');
var test = require('./gulp/test');
var lint = require('./gulp/lint');
var docgen = require('./gulp/docgen');

gulp.task('build-css', build.css);
gulp.task('build-js', build.js);
gulp.task('build-test', build.test);
gulp.task('docgen', docgen);
gulp.task('lint', lint);
gulp.task('prepublish', ['lint', 'test', 'build-css', 'build-js']);
gulp.task('tdd', test.tdd);
gulp.task('test', ['build-js', 'build-test'], test.test);
