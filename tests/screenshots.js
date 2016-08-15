const _ = require('lodash');
const util = require('./util.js');

const HOST = util.HOST;
const PORT = util.PORT;
const WAIT = util.WAIT;

module.exports = {
	'@tags': ['screenshots'],
	'test static example screenshots': client => client
		.url(`http://${HOST}:${PORT}/#/test/`)
		.waitForElementPresent('#examples-list', WAIT)
		.execute(
			function() { return window.examples; },
			[],
			result => {
				_.forEach(result.value, path => {

					if (_.includes(util.EXCLUDED_EXAMPLES, path)) {
						return;
					}

					client
						.url(`http://${HOST}:${PORT}/#/test/${path}`)
						.waitForElementPresent('#example', WAIT)
						.verify.screenshotHasNotChanged(client, path)

				});
				client.end();
			}
		),
};
