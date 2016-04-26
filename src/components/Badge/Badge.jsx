import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-definition';

const boundClassNames = lucidClassNames.bind('&-Badge');

const {
	node,
	string,
	oneOfType,
	arrayOf,
} = React.PropTypes;

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * `Badge` is a quick utility component to create a badge around any
 * element(s). Do not wrap existing `Icon`s in a badge, rather add the
 * `isBadge` prop to any Icon component to turn it into a badge.
 */
const Badge = createClass({
	displayName: 'Badge',
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
			arrayOf(node)
		]),
	},

	render() {
		const {
			className,
			children,
			...passThroughs
		} = this.props;

		return (
			<span className={boundClassNames('&', className)} {...passThroughs}>
				{children}
			</span>
		);
	}
});

export default Badge;
