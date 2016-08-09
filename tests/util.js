const _ = require('lodash');

const HOST = 'localhost';
const PORT = 8080;
const WAIT = 10000;

const EXCLUDED_EXAMPLE_PATHS = [
	'src/Icon/LoadingIcon/examples/default.jsx',
	'src/LoadingIndicator/examples/1.interactive.jsx',
	'src/Button/examples/basic.jsx',
	'src/ToolTip/examples/4.static.jsx',
];


module.exports = {
	HOST: HOST,
	PORT: PORT,
	WAIT: WAIT,
	EXCLUDED_EXAMPLES: _.map(EXCLUDED_EXAMPLE_PATHS, sanitizeExamplePath),
	sanitizeExamplePath,
};

function sanitizeExamplePath(path) {
	return _.chain(path)
		.split('/')
		.compact()
		.drop()
		.join('-')
		.split('.')
		.join('-')
		.value();
}
