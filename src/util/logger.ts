/*eslint no-console: 0*/
import _ from 'lodash';

export const isDevMode = (function isReactInDev() {
	// This property gets injected via Webpack.
	return process.env.NODE_ENV !== 'production'; // eslint-disable-line no-undef
})();

export const isNode = typeof process === 'object' && process.title === 'node';

export const logger = (function () {
	return checkIsDev()
		? {
				log,
				logOnce,
				warn,
				warnOnce,
				error,
				errorOnce,
				resetOnce,
		  }
		: {
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

function once(key: string | string[], fn: () => void) {
	if (!_.has(onceMap, key)) {
		_.set(onceMap, key, true);
		fn();
	}
}

function resetOnce(key: string | string[]) {
	_.unset(onceMap, key);
}

export function checkIsDev() {
	return (
		isDevMode && typeof window !== 'undefined' && typeof console !== 'undefined'
	);
}

function log(...args: any[]) {
	console.log(...args);

	try {
		// --- Welcome to debugging Lucid ---
		// This error was thrown as a convenience so that you can use this
		// stack to find the callsite that caused this warning to fire.
		throw new Error(args[0]);
	} catch (x) {
		/* */
	}
}

function logOnce(key: string | string[], ...args: any[]) {
	once(key, () => log(...args));
}

function warn(...args: any[]) {
	console.warn(...args);

	try {
		// --- Welcome to debugging Lucid ---
		// This error was thrown as a convenience so that you can use this
		// stack to find the callsite that caused this warning to fire.
		throw new Error(args[0]);
	} catch (x) {
		/* */
	}
}

function warnOnce(key: string | string[], ...args: any[]) {
	once(key, () => warn(...args));
}

function error(...args: any[]) {
	console.error(...args);

	try {
		// --- Welcome to debugging Lucid ---
		// This error was thrown as a convenience so that you can use this
		// stack to find the callsite that caused this warning to fire.
		throw new Error(args[0]);
	} catch (x) {
		/* */
	}
}

function errorOnce(key: string | string[], ...args: any[]) {
	once(key, () => error(...args));
}
