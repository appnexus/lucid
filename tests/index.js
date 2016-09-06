const util = require('./util.js');

const HOST = util.HOST;
const PORT = util.PORT;
const WAIT = util.WAIT;

module.exports = {
	CheckboxLabeled: client => {
		const selector = '.lucid-CheckboxLabeled';
		client
			.url(`http://${HOST}:${PORT}/#/test/CheckboxLabeled-examples-interactive-jsx`)
			.waitForElementPresent(selector, WAIT)
			.assert.cssClassNotPresent(selector, 'lucid-CheckboxLabeled-is-selected')
			.click(selector)
			.assert.cssClassPresent(selector, 'lucid-CheckboxLabeled-is-selected');
	},
	end: client => client.end(),
};
