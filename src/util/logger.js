/*eslint no-console: 0*/
import _ from 'lodash';
import React from 'react';

export const isDevMode = (function isReactInDev() {
	try {
		React.createClass({});
	} catch(e) {
		if (e.message.indexOf('render') !== 0) {
			return true;  // A nice, specific error message
		}
	}

	return false;  // should never happen, but play it safe.
})();

export const isNode = typeof process === 'object' && process.title === 'node';

export const logger = (function() {
	return checkIsDev() ? {
		log,
		logOnce,
		warn,
		warnOnce,
		error,
		errorOnce,
		resetOnce,
	} : {
		log: _.noop,
		logOnce: _.noop,
		warn: _.noop,
		warnOnce: _.noop,
		error: _.noop,
		errorOnce: _.noop,
		resetOnce: _.noop,
	};
})();

const onceMap = {};

function once(key, fn) {
	if(!_.has(onceMap, key)) {
		_.set(onceMap, key, true);
		fn();
	}
}

function resetOnce(key) {
	_.unset(onceMap, key);
}

export function checkIsDev() {
	return isDevMode &&
		typeof window !== 'undefined' &&
		!isNode &&
		typeof console !== 'undefined';
}


function log(...args) {

	console.log(...args);

	try {
		// --- Welcome to debugging Lucid ---
		// This error was thrown as a convenience so that you can use this
		// stack to find the callsite that caused this warning to fire.
		throw new Error(args[0]);
	} catch (x) { /* */ }

}

function logOnce(key, ...args) {
	once(key, () => log(...args));
}

function warn(...args) {

	console.warn(...args);

	try {
		// --- Welcome to debugging Lucid ---
		// This error was thrown as a convenience so that you can use this
		// stack to find the callsite that caused this warning to fire.
		throw new Error(args[0]);
	} catch (x) { /* */ }

}

function warnOnce(key, ...args) {
	once(key, () => warn(...args));
}


function error(...args) {

	console.error(...args);

	try {
		// --- Welcome to debugging Lucid ---
		// This error was thrown as a convenience so that you can use this
		// stack to find the callsite that caused this warning to fire.
		throw new Error(args[0]);
	} catch (x) { /* */ }

}

function errorOnce(key, ...args) {
	once(key, () => error(...args));
}
