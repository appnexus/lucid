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
export function bindClassNames(
	value: string = '',
	variable: RegExp | string = /&/g
) {
	// We left `any` here because the classNames @types package doesn't export
	// the right types for us to be able to use. It accepts a fairly wide range
	// of input.
	function cx(...args: any[]) {
		return _.map(classNames(...args).split(' '), (className) =>
			className.replace(variable, value)
		).join(' ');
	}

	return _.assign(cx, {
		bind(nextValue = value, ...args: any[]) {
			return bindClassNames(nextValue.replace(variable, value), ...args);
		},
	});
}

// LUCID_CSS_NAMESPACE is a placeholder that webpack's DefinePlugin can
// overwrite at compile time. Paired with the `prefix` LESS variable, consumers
// are able to scope all class names to something custom. This is a really rare
// use-case. We needed it becuase we sometimes run two copies of the library on
// a single page and need the styles not to step on each other.
declare const LUCID_CSS_NAMESPACE: string;
export const NAMESPACE =
	typeof LUCID_CSS_NAMESPACE !== 'undefined' ? LUCID_CSS_NAMESPACE : 'lucid'; // eslint-disable-line no-undef

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

export function uniqueName(prefix: string) {
	return _.uniqueId(`${RANDOM_INTEGER}-${prefix}`);
}
