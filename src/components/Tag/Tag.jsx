import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Tag');
const {
	bool,
	func,
	node,
	object,
	string
} = React.PropTypes;

/**
 * {"categories": ["navigation"]}
 *
 * Tags are keywords used to label, organize and categorize content that can be
 * mapped to multiple categories.
 */
const Tag = React.createClass({
	propTypes: {
		/**
		 * The representation of the keyword that this instance represents -- can be
		 * any renderable content.
		 */
		children: node,

		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Indicates whether the component should include an "X" that the user can
		 * click on to close/hide/remove it.
		 */
		isCloseable: bool,

		/**
		 * Called when the user clicks on the "X" (if included).
		 */
		onClose: func,

		/**
		 * Passed through to the root element.
		 */
		style: object
	},

	getDefaultProps() {
		return {
			isCloseable: false,
			onClose: _.noop
		};
	},

	render() {
		const {
			children,
			className,
			isCloseable,
			style,
			...passThroughs
		} = this.props;

		return (
			<div
					className={boundClassNames('&', className)}
					style={style}
					{..._.omit(passThroughs, 'onClose')}
			>
				{children}
				{isCloseable
						? (
							<span
									className={boundClassNames('&-close')}
									onClick={this.handleClose}
							>
								{String.fromCharCode(0x00d7)}
							</span>
						)
						: null}
			</div>
		);
	},

	handleClose(event) {
		this.props.onClose({
			event,
			props: this.props
		});
	}
});

export default Tag;
