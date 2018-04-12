const babelCore = require('babel-core');
const babylon = require('babylon');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const indexAst = entryModulePath => {
	const code = fs.readFileSync(entryModulePath).toString();
	return babylon.parse(code, { sourceType: 'module' });
};

const getImports = entryModulePath => {
	const importDeclarations = _.filter(
		indexAst(entryModulePath).program.body,
		node => node.type === 'ImportDeclaration'
	);
	return _.flatMap(importDeclarations, node => {
		return _.map(node.specifiers, specifier => {
			return [
				specifier.local.name,
				{
					type: specifier.type,
					moduleId: node.source.value,
				},
			];
		});
	});
};

const getExports = entryModulePath => {
	const exportNamedDeclarations = _.filter(
		indexAst(entryModulePath).program.body,
		node => node.type === 'ExportNamedDeclaration'
	);
	return _.flatMap(exportNamedDeclarations, node =>
		_.map(node.specifiers, specifier => specifier.exported.name)
	);
};

const exportCode = (specifierType, specifierPath, exportName) => {
	const codeMap = {
		ImportSpecifier: `
			import { ${exportName} } from '${specifierPath}';
			export default ${exportName};
			export * from '${specifierPath}';
		`,
		ImportDefaultSpecifier: `
			import def from '${specifierPath}';
			export default def;
			export * from '${specifierPath}'
		`,
		ImportNamespaceSpecifier: `
			import * as def from '${specifierPath}';
			export default def;
			export * from '${specifierPath}'
		`,
	};

	// For some reason this doesn't pickup our .babelrc even though it's supposed to
	return babelCore.transform(codeMap[specifierType], { presets: ['es2015'] })
		.code;
};

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
 * There is a sister task `removeModules` that will remove the files
 * created by this task once npm publishing is complete.
 */
const generateModules = (
	entryModulePath,
	destinationPath = '.',
	mapModuleId = _.identity
) => {
	const importMap = _.fromPairs(getImports(entryModulePath));
	const allExportsNames = getExports(entryModulePath);
	const allExports = _.map(allExportsNames, exportName => [
		exportName,
		path.join(destinationPath, `${exportName}.js`),
	]);

	const checkFilesPromise = Promise.all(
		_.map(allExports, ([exportName, exportPath]) => {
			return new Promise((resolve, reject) => {
				fs.stat(exportPath, err => {
					if (!err) {
						return reject(
							new Error(
								`One of the exports in ${entryModulePath} (${exportName}) conflicts with an object on your file system (${exportPath}). Unable to write new module file.`
							)
						);
					}
					return resolve();
				});
			});
		})
	);

	const writeFilesPromise = Promise.all(
		_.map(allExports, ([exportName, exportPath]) => {
			return new Promise((resolve, reject) => {
				const specifierType = importMap[exportName].type;
				const specifierModuleId = importMap[exportName].moduleId;

				const transpiledCode = exportCode(
					specifierType,
					mapModuleId(specifierModuleId, exportName) || specifierModuleId,
					exportName
				);

				fs.writeFile(exportPath, transpiledCode, err => {
					if (err) {
						return reject(err);
					}
					return resolve();
				});
			});
		})
	);

	return checkFilesPromise.then(writeFilesPromise);
};
module.exports.generateModules = generateModules;

const removeModules = (entryModulePath, rootPath = '.') => {
	return Promise.all(
		_.map(getExports(entryModulePath), exportName => {
			return new Promise((resolve, reject) => {
				fs.unlink(path.join(rootPath, `${exportName}.js`), err => {
					if (err) {
						return reject(err);
					}
					return resolve();
				});
			});
		})
	);
};
module.exports.removeModules = removeModules;
