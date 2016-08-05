const HOST = 'localhost';
const PORT = 8080;
const PATH = '#/test';
const WAIT = 5000;

module.exports = {
	setup: client =>
		client
			.url(`http://${HOST}:${PORT}/${PATH}`)
			.waitForElementPresent('.App-body', WAIT),
	ExpanderPanel: client =>
		client
			.click('.lucid-ExpanderPanel-header')
			.assert.visible('.lucid-ExpanderPanel-content'),
	CheckboxLabeled: client => {
		const selector = '.lucid-CheckboxLabeled';
		client
			.waitForElementPresent(selector, WAIT)
			.assert.cssClassNotPresent(selector, 'lucid-CheckboxLabeled-is-selected')
			.click(selector)
			.assert.cssClassPresent(selector, 'lucid-CheckboxLabeled-is-selected');
	},
	end: client => client.end(),
};
