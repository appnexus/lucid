const path = require('path');
const { generateModules, removeModules } = require('./path-import-modules');

const ensureRelativePath = path => (path.startsWith('.') ? path : `./${path}`);

const entryModulePath = path.join('src', 'index.js');
const destinationPath = '.';

if (process.argv.includes('--generate')) {
	generateModules(entryModulePath, destinationPath, moduleId => {
		if (/^\.\.\//.test(moduleId)) {
			return moduleId.replace(
				/^\.\.\//,
				`${ensureRelativePath(path.relative(destinationPath, '.'))}/`
			);
		} else if (/^\.\//.test(moduleId)) {
			return moduleId.replace(
				/^\.\//,
				`${ensureRelativePath(path.relative(destinationPath, 'dist'))}/`
			);
		}
	});
} else if (process.argv.includes('--remove')) {
	removeModules(entryModulePath, destinationPath);
}
