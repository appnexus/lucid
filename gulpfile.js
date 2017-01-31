var gulp = require('gulp');

var build = require('./gulp/build');
var docs = require('./gulp/docs');

gulp.task('build-css', build.css);
gulp.task('build-js', build.js);
gulp.task('build-js-path-imports', build.jsPathImports);
gulp.task('build-js-clean-path-imports', build.jsCleanPathImports);

gulp.task('docs-generate', docs.generate);
gulp.task('docs-upload', ['docs-generate'], docs.upload);
gulp.task('docs-build', ['docs-generate'], docs.build);

gulp.task('preversion', ['build-css', 'build-js', 'build-js-path-imports']);
