import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

/**
 * A basic button.
 */
var Button = React.createClass({
	displayName: 'Button',

	propTypes: {
		/**
		 * display text can be passed as a prop or as children
		 */
		text: React.PropTypes.string,
		disable: React.PropTypes.bool,
		active: React.PropTypes.bool,
		hasIcon: React.PropTypes.bool,
		className: React.PropTypes.string,
		children: React.PropTypes.oneOfType([
			React.PropTypes.node,
			React.PropTypes.arrayOf(React.PropTypes.node)
		]),
		/**
		 * click handler (called along with onClick)
		 */
		onTrigger: React.PropTypes.func,
		/**
		 * click handler (called along with onTrigger)
		 */
		onClick: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			text: 'Button',
			disable: false,
			active: false,
			hasIcon: false,
			onTrigger: _.noop,
			onClick: _.noop
		};
	},

	handleClick() {
		if (!this.props.disable) {
			this.props.onTrigger();
			this.props.onClick();
		}
	},

	render() {
		var classes = classNames(this.props.className, {
			'ArButton': true,
			'disable': this.props.disable,
			'active': this.props.active,
			'hasIcon': this.props.hasIcon
		});

		return (
			<button
				className={classes}
				onClick={this.handleClick}
				disabled={this.props.disable}
				ref='button'>
				<span className='ArButtonContent'>
					{this.props.children || this.props.text}
				</span>
			</button>
		);
	}
});

export default Button;
