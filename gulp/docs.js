/*eslint no-console:0 */

var FormData = require('form-data');
var exec = require('child_process').exec;
var fs = require('fs');
var gulp = require('gulp');
var gzip = require('gulp-gzip');
var path = require('path');
var tar = require('gulp-tar');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

function uploadDocsBuild(callback) {
	// Figure out of the last commit was a tagged version. This command only
	// succeeds if the last commit has an annotated tag and the tag is output
	// on stdout if one is found.
	exec('git describe --abbrev=0 --candidates=0 --tags', function(
		err,
		stdoutTag
	) {
		var tag = stdoutTag.replace(/\n/g, '');

		// Get the current branch
		exec('git rev-parse --abbrev-ref HEAD', function(err2, stdoutBranch) {
			if (err2) {
				console.log('Warning: was unable to retrieve git branch');
			}

			var currentBranch = stdoutBranch.trim().replace(/\//g, '-'); // clean branch and replace forward slashes
			var isTagged = !err && currentBranch === 'master';
			var buildId = isTagged ? tag : currentBranch;

			console.log(
				'Uploading to docspot at http://docspot.devnxs.net/projects/lucid/' +
					buildId
			);

			var tarStream = gulp
				.src('dist/docs/**/*')
				.pipe(tar(currentBranch + '.tar'))
				.pipe(gzip())
				.pipe(gulp.dest('/tmp'));

			tarStream.on('end', function() {
				var form = new FormData();
				form.append(
					'file',
					fs.createReadStream(path.join('/tmp', currentBranch + '.tar.gz'))
				);
				form.append('projectId', 'lucid');
				form.append('buildId', buildId);
				form.append('isLatest', isTagged.toString());
				form.submit(
					{
						host: 'docspot.devnxs.net',
						port: 80,
						path: '/api/projects',
					},
					callback
				);
			});
		});
	});
}

module.exports = {
	build: function(callback) {
		webpack(webpackConfig, callback);
	},

	upload: function(callback) {
		webpack(webpackConfig, uploadDocsBuild);
	},

	uploadDocsBuild: uploadDocsBuild,
};
