const _ = require('lodash');
const fs = require('fs');
const resemble = require('node-resemble-js');

exports.assertion = function(client, path) {

	this.message = 'screenshot match';

	this.expected = '<= 1.1';

	this.pass = function(result) {
		return result < 1;
	};

	this.value = function(result) {
		return _.toNumber(result);
	};

	this.failure = function() {
		this.message = `Mismatch threshold violation for ${client.capabilities.browserName}/${path}`;
	};

	this.command = function(cb) {
		const expectedImg = fs.readFileSync(`screenshots/${client.capabilities.browserName}/${path}.png`);
		return client.screenshot(client.options.log_screenshot_data, result =>
			resemble(expectedImg)
			.compareTo(new Buffer(result.value, 'base64'))
			.onComplete(data => cb(data.misMatchPercentage)));
	};

};
