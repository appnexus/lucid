/*eslint no-console:0 */

var _ = require('lodash');
var FormData = require('form-data');
var exec = require('child_process').exec;
var fs = require('fs');
var glob = require('glob');
var gulp = require('gulp');
var gzip = require('gulp-gzip');
var path = require('path');
var reactDocgen = require('react-docgen');
var recast = require('recast');
var tar = require('gulp-tar');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

function extractComponentName(path) {
	// Here's a broken down example:
	// 1) /Users/jdelamotte/dev/appnexus/lucid/src/components/Button/Button.jsx
	// 2) ["","Users","jdelamotte","dev","appnexus","lucid","src","components","Button","Button.jsx"]
	// 3) ["Button.jsx","Button","components","src","lucid","appnexus","dev","jdelamotte","Users",""]
	// 4) "Button.jsx"
	// 5) ["Button", "jsx"]
	// 6) "Button"
	return path.split('/').reverse()[0].split('.')[0];
}

function findParentNodeIdentifier(path) {
	var name = _.get(path, 'value.id.name');
	if (name) {
		return name;
	}

	if (path.parentPath) {
		return findParentNodeIdentifier(path.parentPath);
	}

	return null;
}

function isTopLevelDef(path) {
	return _.get(path, ['parentPath', 'parentPath', 'parentPath', 'parentPath', 'parentPath', 'parentPath', 'name']) === 'body';
}

module.exports = {
	// This command should probably be a webpack plugin so we can properly take
	// advantage of the webpack watching. Right now it's basically a shim that
	// generates a `docgen.json` file that is then required by other doc
	// javascript files.
	generate: function(callback) {
		glob('./src/components/**/*.jsx', function(err, files) {
			if (err) {
				return callback(err);
			}

			var docgenMap = _.reduce(files, function(acc, file) {
				// Bail out with the error if it exists
				if (acc instanceof Error) {
					return acc;
				}

				var isInComponents = /src\/components\//.test(file);
				var isExample = /\/examples\//.test(file);
				var isTest = /\.spec\./.test(file);

				// These three conditions should help us find only the component files
				if (isExample)       { return acc; }
				if (isTest)          { return acc; }
				if (!isInComponents) { return acc; }

				var componentName = extractComponentName(file);
				var exportName;

				var componentSource = fs.readFileSync(file)
				var docs = reactDocgen.parse(
					componentSource,
					function resolver(ast, recast) {
						var component;
						var childComponents = [];
						var importLocalNames = [];

						recast.visit(ast, {
							visitImportDefaultSpecifier: function(path) {
								importLocalNames.push(path.value.local.name);
								return false;
							},
						});

						recast.visit(ast, {
							visitExportDefaultDeclaration: function(path) {
								exportName = path.value.declaration.name;
								return false;
							},
						});

						recast.visit(ast, {
							visitObjectExpression: function(path) {

								path.get('properties').each(function(propertyPath) {

									// top-level component definitions
									if (propertyPath.value.key.name === 'render') {

										// main component of module
										if (findParentNodeIdentifier(path) === exportName) {
											component = path;
										} else {
											// top-level child component definitions
											childComponents.push(path);
										}
									}

									// nested child-component definitions
									if (propertyPath.value.key.name === 'components') {
										propertyPath.get('value', 'properties').each(function(childComponentPropertyPath) {
											var childComponentProperty = childComponentPropertyPath.get('value');

											// reference to an imported component
											// references to locally defined components are ignored because
											// top-level child component defs are alread resolved above
											if (childComponentProperty.value.type === 'Identifier' &&
													_.includes(importLocalNames, childComponentProperty.value.name)) {
												childComponents.push(childComponentProperty);
											}

											// reference to another component's child component
											if (childComponentProperty.value.type === 'MemberExpression') {
												childComponents.push(childComponentProperty);
											}

											// inline component definition
											if (childComponentProperty.value.type === 'CallExpression') {
												var definition = childComponentProperty.get('arguments', 0);
												childComponents.push(definition);
											}

										});
									}

								});
								return false;
							},
						});
						return [component].concat(childComponents);
					},
					[function handler(documentation, definition) {

						// component docs
						if (findParentNodeIdentifier(definition) === exportName && isTopLevelDef(definition)) {

							_.forEach(reactDocgen.defaultHandlers, function(handler) {
								handler(documentation, definition);
							});

							return recast.visit(definition, {
								visitObjectExpression: function (path) {
									var isPrivateComponent = _.chain(path.get('properties').value)
										.find(_.matchesProperty('key.name', '_lucidIsPrivate'))
										.get('value.value', false)
										.value();
									documentation.set('isPrivateComponent', isPrivateComponent);
									return false;
								},
							});

						}

						// childComponent docs

						// import reference component
						if (definition.value.type === 'Identifier') {
							documentation.set('displayName', definition.parentPath.value.key.name);
							documentation.set('description', '');
							return documentation.set('componentRef', definition.value.name);
						}

						// import reference component's child component
						if (definition.value.type === 'MemberExpression') {
							documentation.set('displayName', definition.parentPath.value.key.name);
							documentation.set('description', '');
							return documentation.set('componentRef', `${definition.value.object.name}.${definition.value.property.name}`);
						}

						// list of default handlers
						_.forEach([
							reactDocgen.handlers.propTypeHandler,
							reactDocgen.handlers.propTypeCompositionHandler,
							reactDocgen.handlers.propDocBlockHandler,
							reactDocgen.handlers.flowTypeHandler,
							reactDocgen.handlers.flowTypeDocBlockHandler,
							reactDocgen.handlers.defaultPropsHandler,
							// use normal component docblock handler for top-level defined child components,
							// otherwise this custom one
							isTopLevelDef(definition)
							? reactDocgen.handlers.componentDocblockHandler
							: function(documentation, definition) {
								var description = reactDocgen.utils.docblock.getDocblock(definition.parentPath.parentPath.parentPath) || '';
								documentation.set('description', description);
							},
							reactDocgen.handlers.displayNameHandler,
							reactDocgen.handlers.componentMethodsHandler,
							reactDocgen.handlers.componentMethodsJsDocHandler,
						], function(handler) {
							handler(documentation, definition);
						});

						documentation.set(
							'displayName',
							_.get(definition, ['parentPath', 'parentPath', 'parentPath', 'value', 'id', 'name']) ||
							_.get(definition, ['parentPath', 'parentPath', 'parentPath', 'value', 'key', 'name'])
						);

						// set propName
						definition.get('properties').each(function(property) {
							if (property.get('key', 'name').value === 'propName') {
								documentation.set('propName', property.get('value').value.value);
							}
						});

					}]
				);

				var doc = _.first(docs);
				doc.childComponents = _.tail(docs);

				// add all child components to docgen map
				_.forEach(doc.childComponents, childComponent => {
					acc[`${doc.displayName}.${childComponent.displayName}`] = childComponent;
				});

				if (!doc.description) {
					return new Error('Missing a description from ' + file + ' - please put a comment block right above `createClass` and make sure to include the proper JSON blob in it.')
				}

				// Pull out the custom json that should be in the description of every module
				var customJson = /\{.*\}/.exec(doc.description);

				// Strip out the custom json out of the description
				doc.description = doc.description.replace(/\{.*\}/, '').trim();

				if (!customJson) {
					return new Error('Unable to find JSON in the description for %s. Every component must have JSON is in header with `categories` at minimum.', file);
				}

				try {
					doc.customData = JSON.parse(customJson);
				} catch(e) {
					return new Error('Unable to parse JSON from the description of ' + file);
				}

				return _.set(acc, componentName, doc);
			}, {});

			if (docgenMap instanceof Error) {
				return callback(docgenMap);
			}

			fs.writeFileSync('./src/docs/docgen.json', JSON.stringify(docgenMap, null, 2));
			return callback();
		})
	},

	build: function(callback) {
		webpack(webpackConfig, callback);
	},

	upload: function(callback) {
		webpack(webpackConfig, function() {
			// Figure out of the last commit was a tagged version. This command only
			// succeeds if the last commit has an annotated tag and the tag is output
			// on stdout if one is found.
			exec('git describe --abbrev=0 --candidates=0 --tags', function(err, stdoutTag) {
				var tag = stdoutTag.replace(/\n/g, '');

				// Get the current branch
				exec('git rev-parse --abbrev-ref HEAD', function(err2, stdoutBranch) {
					if (err2) {
						console.log('Warning: was unable to retrieve git branch');
					}

					var currentBranch = stdoutBranch.trim().replace(/\//g, '-'); // clean branch and replace forward slashes
					var isTagged = !err && currentBranch === 'master';
					var buildId = isTagged ? tag : currentBranch;

					console.log('Uploading to docspot at http://docspot.devnxs.net/projects/lucid/' + buildId);

					var tarStream = gulp.src('dist/docs/**/*')
						.pipe(tar(currentBranch + '.tar'))
						.pipe(gzip())
						.pipe(gulp.dest('/tmp'));

					tarStream.on('end', function() {
						var form = new FormData();
						form.append('file', fs.createReadStream(path.join('/tmp', currentBranch + '.tar.gz')));
						form.append('projectId', 'lucid');
						form.append('buildId', buildId);
						form.append('isLatest', isTagged.toString());
						form.submit({
							host: 'docspot.devnxs.net',
							port: 80,
							path: '/api/projects',
						}, callback);
					});
				});
			});
		});
	},
};
