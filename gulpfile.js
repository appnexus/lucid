var gulp = require('gulp');

var build = require('./gulp/build');
var test = require('./gulp/test');
var lint = require('./gulp/lint');
var docs = require('./gulp/docs');

gulp.task('build-css', build.css);
gulp.task('build-js', build.js);
gulp.task('build-test', build.test);

gulp.task('docs-generate', docs.generate);
gulp.task('docs-upload', ['docs-generate'], docs.upload);
gulp.task('docs-build', ['docs-generate'], docs.build);

gulp.task('lint', lint);

gulp.task('test', ['build-test'], test.test);
gulp.task('test-tdd', test.tdd);
