const _ = require('lodash');

module.exports = (fileInfo, api, options) => {
	const j = api.jscodeshift;
	const componentName = options.component;

	if (!componentName) {
		return;
	}

	const componentImportDeclaration = j.importDeclaration(
		[j.importDefaultSpecifier(j.identifier(componentName))],
		j.literal(`./components/${componentName}/${componentName}`),
		'value'
	);

	const componentExportSpecifier = j.exportSpecifier(
		j.identifier(componentName),
		j.identifier(componentName)
	);

	const parsedModule = j(fileInfo.source);

	const importDeclarations = [];

	parsedModule.find(j.ImportDeclaration).forEach(path => {
		if (path.value.specifiers.length === 1) {
			if (path.value.specifiers[0].type === 'ImportDefaultSpecifier') {
				if (path.value.specifiers[0].local.type === 'Identifier') {
					importDeclarations.push({
						name: path.value.specifiers[0].local.name,
						path,
					});
				}
			}
		}
	});
	importDeclarations.push({
		name: componentName,
		path: null,
	});

	const sortedImportDeclarations = _.sortBy(importDeclarations, 'name');
	const sortedImportIndex = _.findIndex(sortedImportDeclarations, {
		name: componentName,
	});
	let insertedPosition;
	let insertedNextTo;

	if (sortedImportDeclarations[sortedImportIndex - 1]) {
		j(sortedImportDeclarations[sortedImportIndex - 1].path).insertAfter(
			componentImportDeclaration
		);
		insertedPosition = 'after';
		insertedNextTo = sortedImportDeclarations[sortedImportIndex - 1].name;
	} else if (sortedImportDeclarations[sortedImportIndex + 1]) {
		j(sortedImportDeclarations[sortedImportIndex + 1].path).insertBefore(
			componentImportDeclaration
		);
		insertedPosition = 'before';
		insertedNextTo = sortedImportDeclarations[sortedImportIndex + 1].name;
	}

	parsedModule.find(j.ExportSpecifier).forEach(path => {
		if (path.value.local.type === 'Identifier') {
			if (path.value.local.name === insertedNextTo) {
				if (insertedPosition === 'after') {
					j(path).insertAfter(componentExportSpecifier);
				} else if (insertedPosition === 'before') {
					j(path).insertBefore(componentExportSpecifier);
				}
			}
		}
	});

	return parsedModule.toSource();
};
