import _ from 'lodash';
import classNames from 'classnames';

/**
 * bindClassNames
 *
 * Returns a version of the `classnames` functions where `&` is bound to a given
 * value. The returned functions can be further bound to more specific values for
 * `&` which allows your bound classnames to look closer to style selector.
 *
 * Examples:
 *   bindClassNames('lucid')('&-Button') === 'lucid-Button'
 *   bindClassNames('lucid').bind('&-Button')('&-active') === 'lucid-Button-active'
 */
export function bindClassNames(value='', variable='&') {
	const variableRegexp = new RegExp('[' + variable + ']', 'g');

	function boundClassNames(...args) {
		return _.map(
			classNames(...args).split(' '),
			(className) => `${className.replace(variableRegexp, value)}`
		).join(' ');
	};

	return _.assign(boundClassNames, {
		bind(nextValue=variable, ...args) {
			return bindClassNames(nextValue.replace(variableRegexp, value), ...args);
		}
	});
}

export const NAMESPACE = 'lucid';

/**
 * Exports a lucid-bound version of classnames, which can be make more specific
 * to a component.
 *
 * Example:
 *   const boundClassNames = lucidClassNames.bind('&-Button')
 *
 *   boundClassNames('&',{
 *     '&-active': true
 *   }, ['custom-classname']) === 'lucid-Button lucid-Button-active custom-classname'
 */
export const lucidClassNames = bindClassNames(NAMESPACE);
