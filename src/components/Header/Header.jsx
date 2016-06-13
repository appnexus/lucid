import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Header');

const {
	arrayOf,
	node,
	oneOfType,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "buttons"]}
 *
 * A basic button. Any props that are not explicitly called out below will be
 * passed through to the native `button` component.
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
	},

	render() {
		const {
			className,
			children,
			...passThroughs,
		} = this.props;

		return (
			<header
				{...passThroughs}
				className={cx('&', className)}
			>
				{children}
			</header>
		);
	},
});

export default Header;
