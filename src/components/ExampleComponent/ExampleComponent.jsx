// Required for all new components
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-ExampleComponent');
const { bool, func, node, string, object } = PropTypes;

/**
 * {"categories": ["mycategory"]}
 *
 * Update "mycategory" to set the category your component falls under. You can see available categories
 * in the left hand column.
 *
 * Describe your component here. How it should be used, use cases and more.
 * Please see examples for more information.
 */
const ExampleComponent = createClass({
	displayName: 'ExampleComponent',

	// reducers,
	// selectors,

	// Each prop in propTypes should include a description using /* */ of what
	// the prop is and how it should be used by other developers who consume your
	// component.
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Any valid React children. This wraps your new component around whatever other React children consumers
		 * of your component may choose to use. If consumers can not use any/all React children. Be sure to call
		 * that out here.
		 */
		children: node,

		/**
		 * Example of a boolean prop.
		 * Used in this example to control an additional classname
		 * `lucid-ExampleComponent-isX' on the root element.
		 */
		isX: bool,

		/**
		 * Example of a customizable component function. Always show the signature.
		 *
		 * Signature: `(item, { event, props }) => {}`
		 */
		onX: func,

		/**
		 * Passed through to the root element.
		 */
		style: object,
	},

	handleX() {
		alert('This is an example of a handler function');
	},

	render() {
		const { className, children, isX, style } = this.props;

		return (
			<div
				className={cx('&', className, {
					'&-isX': isX,
				})}
				style={style}
			>
				{children}
			</div>
		);
	},
});

export default ExampleComponent;
