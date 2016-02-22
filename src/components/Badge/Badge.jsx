import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('Badge');

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
const Badge = React.createClass({
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
		let {
			className,
			children,
			...passThroughs
		} = this.props;

		let scopedClasses = boundClassNames('~');

		return (
			<span className={classNames(className, scopedClasses)} {...passThroughs}>
				{children}
			</span>
		);
	}
});

export default Badge;
