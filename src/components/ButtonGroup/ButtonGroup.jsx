import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('ButtonGroup');

const {
	oneOfType,
	node,
	arrayOf,
	any
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "buttons"]}
 *
 * Button groups allow you to pair buttons together to form a seamless cluster.
 */
const ButtonGroup = React.createClass({
	propTypes: {
		/**
		 * class names that are appended to the defaults
		 */
		className: any,
		/**
		 * any valid React children
		 */
		children: oneOfType([
			node,
			arrayOf(node)
		])
	},

	getDefaultProps() {
		return {
		};
	},

	render() {
		let {
			className,
			children,
			...others
		} = this.props;

		let scopedClasses = boundClassNames('~');

		return (
			<div
				className={classNames(className, scopedClasses)}
				{...others}>
				{children}
			</div>
		);
	}
});

export default ButtonGroup;
