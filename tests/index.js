const util = require('./util.js');

const HOST = util.HOST;
const PORT = util.PORT;
const WAIT = util.WAIT;

module.exports = {
	ExpanderPanel: client =>
		client
			.url(`http://${HOST}:${PORT}/#/test/ExpanderPanel-examples-1-basic-jsx`)
			.waitForElementPresent('.lucid-ExpanderPanel-header', WAIT)
			.click('.lucid-ExpanderPanel-header')
			.assert.visible('.lucid-ExpanderPanel-content'),
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
