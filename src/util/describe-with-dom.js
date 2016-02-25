var hasDOM = typeof document !== 'undefined';
var realOrFake = (hasDOM && !global.usingJsdom)
	? 'a real DOM'
	: 'jsdom';

// This sets up jsdom if a real dom doesn't already exist
if (!hasDOM) {
	var jsdom = require('jsdom').jsdom;
	var doc = jsdom('<!doctype html><html><body></body></html>');
	var win = doc.defaultView;

	global.usingJsdom = true; // guards against false positives when running in tdd mode
	global.document = doc;
	global.window = win;
	global.navigator = {
		userAgent: 'node.js'
	};
}

export default function describeWithDOM(name, func) {
	describe(`${name} (functional tests using ${realOrFake})`, func);
}
