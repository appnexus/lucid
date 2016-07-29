module.exports = {
	'first!': function(browser) {
		browser
      .url('http://localhost:8080')
      .waitForElementVisible('.App-body', 1000)
      .end();
	},
};
