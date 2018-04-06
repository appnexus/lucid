const gulp = require('gulp');
const build = require('./gulp/build');

gulp.task('build-js-path-imports', build.jsPathImports);
gulp.task('build-js-clean-path-imports', build.jsCleanPathImports);
