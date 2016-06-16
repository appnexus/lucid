import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Header');

const {
	arrayOf,
	bool,
	node,
	oneOf,
	oneOfType,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["layout"]}
 *
 * A basic header. Any props that are not explicitly called out below will be
 * passed through to the native `header` component.
 */
const Header = createClass({
	displayName: 'Header',
	propName: 'Header',
	propTypes: {
		/**
		 * class names that are appended to the defaults
		 */
		className: string,
		/**
		 * any valid React children
		 */
		children: oneOfType([
			node,
			arrayOf(node),
		]),
		hasBorder: bool,
		/**
		 * size variations of the button
		 */
		size: oneOf([
			'short',
			'small',
			'large',
		]),
	},

	render() {
		const {
			className,
			children,
			hasBorder,
			size,
			...passThroughs,
		} = this.props;

		return (
			<header
				{...passThroughs}
				className={cx('&', {
					'&-small': size === 'small',
					'&-medium': size === 'medium',
					'&-large': size === 'large',
					'&-largexl': size === 'largeXL',
					'&-has-border': hasBorder,
				}, className)}
			>
				{children}
			</header>
		);
	},
});

export default Header;
