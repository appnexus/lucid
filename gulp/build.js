var autoprefixer = require('autoprefixer');
var babelCore = require('babel-core');
var babel = require('gulp-babel');
var cache = require('gulp-cached');
var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var babylon = require('babylon');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');

var CONFIG = require('./config');

function indexAst() {
	const code = fs.readFileSync(path.join(CONFIG.SOURCE_DIR, 'index.js')).toString();
	return babylon.parse(code, { sourceType: 'module' });
}

function imports() {
	const importDeclarations = _.filter(indexAst().program.body, (node) => node.type === 'ImportDeclaration');
	return _.flatMap(importDeclarations, (node) => {
		const moduleId = node.source.value;
		// Slightly clever way to detect if we're doing a path import vs a module
		// import. `import x from './foo'` vs `import _ from 'lodash'`
		const isPath = path.basename(moduleId) !== moduleId;
		// If we're doing a path import, we need to make the import relative to the
		// root directory instead of `dist`
		const newPath = isPath ? './' + path.join(CONFIG.BUILD_DIR, moduleId) : null;

		return _.map(node.specifiers, ((specifier) => {
			return [
				specifier.local.name,
				{
					type: specifier.type,
					path: newPath || moduleId,
				},
			];
		}));
	});
}

function exports() {
	const exportNamedDeclarations = _.filter(indexAst().program.body, (node) => node.type === 'ExportNamedDeclaration');
	return _.flatMap(exportNamedDeclarations, (node) => (
		_.map(node.specifiers, (specifier) => specifier.exported.name))
	);
}

function exportCode(specifierType, specifierPath, exportName) {
	const codeMap = {
		ImportSpecifier: `
			import { ${exportName} } from '${specifierPath}';
			export default ${exportName};
			export * from '${specifierPath}';
		`,
		ImportDefaultSpecifier: `
			import def from '${specifierPath}';
			export default def;
		`,
		ImportNamespaceSpecifier: `
			import * as def from '${specifierPath}';
			export default def;
			export * from '${specifierPath}'
		`,
	};

	// For some reason this doesn't pickup our .babelrc even though it's supposed to
	return babelCore.transform(codeMap[specifierType], { presets: [ 'es2015' ] }).code;
}

module.exports = {
	css: function() {
		return gulp.src([CONFIG.LESS_ENTRY])
		.pipe(less())
		.pipe(postcss([
			autoprefixer({
				browsers: [CONFIG.AUTOPREFIXER_BROWSERS],
			}),
		]))
		.pipe(gulp.dest(CONFIG.BUILD_DIR));
	},

	js: function() {
		return gulp.src([
			'!/**/*.json',
			'!' + CONFIG.TEST_GLOB.SOURCE,
			'!' + CONFIG.EXAMPLES_GLOB.SOURCE,
			CONFIG.JS_GLOB.SOURCE,
		])
		.pipe(cache('build-js')) // only useful when using a watch task
		.pipe(babel())
		.pipe(gulp.dest(CONFIG.BUILD_DIR));
	},

	/**
	 * This is a task that reads our `index.js` and statically analyzes it for
	 * imports/exports. Based on that, it writes a single file for each of the
	 * exports to the root directory. The whole purpose is to make path imports,
	 * i.e. `import Button from 'lucid-ui/Button'`, easy.
	 *
	 * Because there is a potential for file system collisions, we have to
	 * perform a check to make sure none of the files we're going to write
	 * already exist. If they do, we'll bail out and log a warning.
	 *
	 * There is a sister task `jsCleanPathImports` that will remove the files
	 * created by this task once the npm publishing is complete.
	 */
	jsPathImports: function() {
		const importMap = _.fromPairs(imports());
		const allExports = exports();

		const checkFilesPromise = Promise.all(_.map(allExports, (exportName) => {
			return new Promise((resolve, reject) => {
				fs.stat(`${exportName}.js`, (err) => {
					if (!err) {
						return reject(new Error(`One of the exports (${exportName}) in index.js conflicts with a file you have on your file system (${exportName}.js). Unable to write path-import files.`));
					}
					return resolve();
				});
			});
		}));

		const writeFilesPromise = Promise.all(_.map(allExports, (exportName) => {
			return new Promise((resolve, reject) => {
				const specifierPath = importMap[exportName].path;
				const specifierType = importMap[exportName].type;

				const transpiledCode = exportCode(specifierType, specifierPath, exportName);

				fs.writeFile(`${exportName}.js`, transpiledCode, (err) => {
					if (err) {
						return reject(err);
					}
					return resolve();
				});
			});
		}));

		return checkFilesPromise.then(writeFilesPromise);
	},

	jsCleanPathImports: function() {
		return Promise.all(_.map(exports(), (exportName) => {
			return new Promise((resolve, reject) => {
				fs.unlink(`${exportName}.js`, (err) => {
					if (err) {
						return reject(err);
					}
					return resolve();
				});
			});
		}));
	},

};

