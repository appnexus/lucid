import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('ButtonGroup');

const {
	any
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "buttons"]}
 *
 * Button groups allow you to pair buttons together to form a seamless cluster.
 * Any props not explicitly called out are spread on to the root component.
 */
const ButtonGroup = React.createClass({
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,

		/**
		 * Any valid React children, but they really should be `Button`s.
		 */
		children: any
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
				{...others}
				className={classNames(className, scopedClasses)}
			>
				{children}
			</div>
		);
	}
});

export default ButtonGroup;
