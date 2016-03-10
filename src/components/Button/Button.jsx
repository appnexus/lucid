import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
const boundClassNames = lucidClassNames.bind('&-Button');

const {
	arrayOf,
	bool,
	func,
	node,
	oneOf,
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
		kind: oneOf([
			'primary',
			'link',
			'success',
			'warning',
			'danger',
			'info'
		]),
		/**
		 * size variations of the button
		 */
		size: oneOf([
			'short',
			'small',
			'large'
		]),
		/**
		 * Called when the user clicks the `Button`.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onClick: func,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isActive: false,
			hasIcon: false,
			onClick: _.noop
		};
	},

	handleClick(event) {
		const {
			isDisabled,
			onClick,
		} = this.props;

		if (!isDisabled) {
			onClick({ event, props: this.props });
		}
	},

	render() {
		const {
			isDisabled,
			isActive,
			hasIcon,
			kind,
			size,
			className,
			children,
			...passThroughs
		} = this.props;

		return (
			<button
				{...passThroughs}
				className={boundClassNames('&', {
					'&-is-disabled': isDisabled,
					'&-is-active': isActive,
					'&-has-icon': hasIcon,
					'&-primary': kind === 'primary',
					'&-link': kind === 'link',
					'&-success': kind === 'success',
					'&-warning': kind === 'warning',
					'&-danger': kind === 'danger',
					'&-info': kind === 'info',
					'&-short': size === 'short',
					'&-small': size === 'small',
					'&-large': size === 'large',
				}, className)}
				onClick={this.handleClick}
				disabled={isDisabled}
				ref='button'
			>
				<span className={boundClassNames('&-content')}>
					{children}
				</span>
			</button>
		);
	}
});

export default Button;
