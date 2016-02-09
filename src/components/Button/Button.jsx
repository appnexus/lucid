import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('Button');

const {
	bool,
	string,
	oneOfType,
	oneOf,
	node,
	arrayOf,
	func
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "buttons"]}
 *
 * A basic button.
 */
const Button = React.createClass({
	propTypes: {
		/**
		 * disables the button by greying it out
		 */
		isDisabled: bool,
		/**
		 * activates the button by giving it a "pressed down" look
		 */
		isActive: bool,
		/**
		 * set this to `true` if you want to include an icon as a child
		 */
		hasIcon: bool,
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
		/**
		 * style variations of the button
		 */
		type: oneOf([
			'primary',
			'cancel'
		]),
		/**
		 * called when the user clicks the button
		 */
		onClick: func.required
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isActive: false,
			hasIcon: false,
			onClick: _.noop
		};
	},

	handleClick() {
		if (!this.props.isDisabled) {
			this.props.onClick();
		}
	},

	render() {
		let {
			isDisabled,
			isActive,
			hasIcon,
			type,
			className,
			children,
			...others
		} = this.props;

		let scopedClasses = boundClassNames('~', {
			'is-disabled': isDisabled,
			'is-active': isActive,
			'has-icon': hasIcon,
			'primary': type === 'primary',
			'cancel': type === 'cancel'
		});

		return (
			<button
				className={classNames(className, scopedClasses)}
				onClick={this.handleClick}
				disabled={isDisabled}
				{...others}
				ref='button' >
				<span className={boundClassNames('content')}>
					{children}
				</span>
			</button>
		);
	}
});

export default Button;
