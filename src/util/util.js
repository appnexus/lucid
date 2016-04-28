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
		warn,
		error
	} : {
		log: _.noop,
		warn: _.noop,
		error: _.noop
	};
})();

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
	} catch (x) {}

}

function warn(...args) {

	console.warn(...args);

	try {
		// --- Welcome to debugging Lucid ---
		// This error was thrown as a convenience so that you can use this
		// stack to find the callsite that caused this warning to fire.
		throw new Error(args[0]);
	} catch (x) {}

}

function error(...args) {

	console.error(...args);

	try {
		// --- Welcome to debugging Lucid ---
		// This error was thrown as a convenience so that you can use this
		// stack to find the callsite that caused this warning to fire.
		throw new Error(args[0]);
	} catch (x) {}

}
