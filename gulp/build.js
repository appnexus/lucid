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

		return _.map(node.specifiers, ((specifier) => ([
			specifier.local.name,
			moduleId,
		])));
	});
}

function exports() {
	const exportNamedDeclarations = _.filter(indexAst().program.body, (node) => node.type === 'ExportNamedDeclaration');
	return _.flatMap(exportNamedDeclarations, (node) => (
		_.map(node.specifiers, (specifier) => specifier.exported.name))
	);
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
				const exportCode = `export * from '${importMap[exportName]}';`;
				// for some reason this doesn't pickup our .babelrc even though it's supposed to
				const transpiledCode = babelCore.transform(exportCode, { presets: [ 'es2015' ] }).code;

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

