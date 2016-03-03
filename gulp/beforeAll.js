var hasDOM = typeof document !== 'undefined';

// This sets up jsdom if a real dom doesn't already exist
if (!hasDOM) {
	var jsdom = require('jsdom').jsdom;
	var doc = jsdom('<!doctype html><html><body></body></html>');
	var win = doc.defaultView;
	win.realOrFake = 'jsdom';

	global.usingJsdom = true; // guards against false positives when running in tdd mode
	global.document = doc;
	global.window = win;
	global.navigator = {
		userAgent: 'node.js'
	};
} else {
	window.realOrFake = 'a real DOM';
}
