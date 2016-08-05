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
				_.forEach(result.value, id => {
					client
						.url(`http://${HOST}:${PORT}/#/test/${id}`)
						.waitForElementPresent('#example', WAIT)
						.verify.screenshotHasNotChanged(client, id)
				});
				client.end();
			}
		),
};
