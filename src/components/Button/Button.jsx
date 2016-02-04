import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

var {
	bool,
	string,
	oneOfType,
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
var Button = React.createClass({
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
		 * called when the user clicks the button
		 */
		onClick: func
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
		var classes = classNames(this.props.className, {
			'BertButton': true,
			'BertButton-is-disabled': this.props.isDisabled,
			'BertButton-is-active': this.props.isActive,
			'BertButton-has-icon': this.props.hasIcon
		});

		return (
			<button
				className={classes}
				onClick={this.handleClick}
				disabled={this.props.isDisabled}
				ref='button'>
				<span className='BertButton-content'>
					{this.props.children}
				</span>
			</button>
		);
	}
});

export default Button;
