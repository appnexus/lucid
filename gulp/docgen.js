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
			var docs = reactDocgen.parse(fs.readFileSync(file));

			if (!docs.description) {
				return new Error('Missing a description from ' + file + ' - please put a comment block right above `createClass` and make sure to include the proper JSON blob in it.')
			}

			// Pull out the custom json that should be in the description of every module
			var customJson = /\{.*\}/.exec(docs.description);

			// Strip out the custom json out of the description
			docs.description = docs.description.replace(/\{.*\}/, '').trim();

			if (!customJson) {
				return new Error('Unable to find JSON in the description for %s. Every component must have JSON is in header with `categories` at minimum.', file);
			}

			try {
				docs.customData = JSON.parse(customJson);
			} catch(e) {
				return new Error('Unable to parse JSON from the description of ' + file);
			}

			return _.set(acc, componentName, docs);
		}, {});

		if (docgenMap instanceof Error) {
			return callback(docgenMap);
		}

		fs.writeFileSync('./src/docs/docgen.json', JSON.stringify(docgenMap, null, 2));
		return callback();
	})
}
