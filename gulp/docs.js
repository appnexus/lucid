/*eslint no-console:0 */

var _ = require('lodash');
var FormData = require('form-data');
var exec = require('child_process').exec;
var fs = require('fs');
var gulp = require('gulp');
var gzip = require('gulp-gzip');
var path = require('path');
var tar = require('gulp-tar');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');
var CONFIG = require('./config');

const isReactComponent = value =>
	typeof value === 'function' &&
	value.prototype &&
	value.prototype.isReactComponent;

const componentToDocgen = (
	componentRef,
	stripIndent = _.identity,
	displayName
) => ({
	description: _.trim(stripIndent(_.get(componentRef, 'peek.description', ''))),
	displayName: displayName || componentRef.displayName,
	methods: [],
	isPrivateComponent: !!componentRef._isPrivate,
	props: _.mapValues(componentRef.propTypes, ({ peek }, property) => {
		const defaultProps =
			componentRef.peekDefaultProps || componentRef.defaultProps;
		const defaultValue = _.get(defaultProps, property);
		const type = _.get(peek, 'type');

		let value;
		if (type === 'oneOf' && _.has(peek, 'args')) {
			value = _.map(_.first(peek.args), value => ({
				value: JSON.stringify(value),
			}));
		}
		if (type === 'oneOfType' && _.has(peek, 'args')) {
			value = _.map(_.first(peek.args), resolverFn => ({
				name: _.get(resolverFn, ['peek', 'type']),
			}));
		}

		if (type === 'arrayOf' && _.has(peek, 'args')) {
			value = {
				name: _.get(_.first(peek.args), ['peek', 'type']),
			};
		}

		if (type === 'shape' && _.has(peek, 'args')) {
			value = _.mapValues(_.first(peek.args), resolverFn => ({
				name: _.get(resolverFn, ['peek', 'type']),
				required: !!_.get(resolverFn, ['peek', 'isRequired']),
			}));
		}

		return {
			type: {
				name: type,
				value,
				raw: _.has(peek, 'args') ? JSON.stringify(peek.args) : undefined,
			},
			description:
				(_.has(peek, 'text') && _.trim(stripIndent(peek.text))) || undefined,
			required: _.get(peek, 'isRequired', false),
			defaultValue: !_.isUndefined(defaultValue)
				? {
						value: _.isFunction(defaultValue)
							? 'func'
							: JSON.stringify(defaultValue, null, 2),
						computed: true,
					}
				: undefined,
		};
	}),
	childComponents: _.map(
		_.toPairs(_.pickBy(componentRef, isReactComponent)),
		([childComponentProperty, childComponentRef]) =>
			componentToDocgen(childComponentRef, stripIndent, childComponentProperty)
	),
	customData: {
		categories: _.get(componentRef, ['peek', 'categories']),
		extend: _.get(componentRef, ['peek', 'extend']),
		madeFrom: _.get(componentRef, ['peek', 'madeFrom']),
	},
});

function uploadDocspotBuild(callback) {
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
	docgenJson: function() {
		const { stripIndent } = require(path.join(
			'..',
			CONFIG.BUILD_DIR,
			'docs',
			'util'
		));
		const Lucid = require(path.join('../', CONFIG.BUILD_DIR));
		const lucidComponents = _.pickBy(
			Lucid,
			(value, key) => isReactComponent(value) && !_.endsWith(key, 'Dumb')
		);
		const docgenMap = _.mapValues(lucidComponents, componentRef =>
			componentToDocgen(componentRef, stripIndent)
		);
		fs.writeFileSync(
			path.resolve(__dirname, '..', CONFIG.BUILD_DIR, 'docs', 'docgen.json'),
			JSON.stringify(docgenMap, null, 2),
			'utf8'
		);
	},

	build: function(callback) {
		webpack(webpackConfig, callback);
	},

	upload: function(callback) {
		webpack(webpackConfig, uploadDocspotBuild);
	},

	uploadDocspotBuild: uploadDocspotBuild,
};
