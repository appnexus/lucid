import _ from 'lodash';
import classNames from 'classnames';

const RANDOM_INTEGER = _.random(0, Number.MAX_SAFE_INTEGER);

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
export function bindClassNames(value = '', variable = /&/g) {
	function cx(...args) {
		return _.map(classNames(...args).split(' '), className =>
			className.replace(variable, value)
		).join(' ');
	}

	return _.assign(cx, {
		bind(nextValue = value, ...args) {
			return bindClassNames(nextValue.replace(variable, value), ...args);
		},
	});
}

// LUCID_CSS_NAMESPACE is a placeholder that webpack's DefinePlugin can
// overwrite at compile time. Paired with the `prefix` LESS variable, consumers
// are able to scope all class names to something custom. This is a really rare
// use-case. We needed it becuase we sometimes run two copies of the library on
// a single page and need the styles not to step on each other.
export const NAMESPACE =
	typeof LUCID_CSS_NAMESPACE !== 'undefined' ? LUCID_CSS_NAMESPACE : 'lucid';

/**
 * Exports a lucid-bound version of classnames, which can be make more specific
 * to a component.
 *
 * Example:
 *   const cx = lucidClassNames.bind('&-Button')
 *
 *   cx('&',{
 *     '&-active': true
 *   }, ['custom-classname']) === 'lucid-Button lucid-Button-active custom-classname'
 */
export const lucidClassNames = bindClassNames(NAMESPACE);

export function uniqueName(prefix) {
	return _.uniqueId(`${RANDOM_INTEGER}-${prefix}`);
}
