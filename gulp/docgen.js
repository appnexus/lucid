var _ = require('lodash');
var fs = require('fs');
var reactDocgen = require('react-docgen');
var glob = require('glob');

function extractComponentName(path) {
	// Here's a broken down example:
	// 1) /Users/jdelamotte/dev/appnexus/bert/src/components/Button/Button.jsx
	// 2) ["","Users","jdelamotte","dev","appnexus","bert","src","components","Button","Button.jsx"]
	// 3) ["Button.jsx","Button","components","src","bert","appnexus","dev","jdelamotte","Users",""]
	// 4) "Button.jsx"
	// 5) ["Button", "jsx"]
	// 6) "Button"
	return path.split('/').reverse()[0].split('.')[0];
}

module.exports = function(callback) {
	glob('./src/components/**/*.jsx', function(err, files) {
		if (err) {
			return callback(err);
		}

		var docgenMap = _.reduce(files, function(acc, file) {
			var isInComponents = /src\/components\//.test(file);
			var isExample = /\/examples\//.test(file);
			var isTest = /\.spec\./.test(file);

			if (isExample)       { return acc; }
			if (isTest)          { return acc; }
			if (!isInComponents) { return acc; }

			var componentName = extractComponentName(file);
			var docs = reactDocgen.parse(fs.readFileSync(file));

			return _.set(acc, componentName, docs);
		}, {});

		fs.writeFileSync('./src/docs/docgen.json', JSON.stringify(docgenMap, null, 2));
		return callback();
	})
}
