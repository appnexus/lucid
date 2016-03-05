import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('Button');

const {
	arrayOf,
	bool,
	func,
	node,
	number,
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
		 * Signature: `({ event, uniqueId }) => {}`
		 */
		onClick: func,

		/**
		 * Set an identifier on the component that will be returned when `onClick`
		 * fires.
		 */
		uniqueId: oneOfType([string, number]),
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
			uniqueId,
			isDisabled,
			onClick,
		} = this.props;

		if (!isDisabled) {
			onClick({ uniqueId, event });
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

		let scopedClasses = boundClassNames('~', {
			'is-disabled': isDisabled,
			'is-active': isActive,
			'has-icon': hasIcon,
			'primary': kind === 'primary',
			'link': kind === 'link',
			'success': kind === 'success',
			'warning': kind === 'warning',
			'danger': kind === 'danger',
			'info': kind === 'info',
			'short': size === 'short',
			'small': size === 'small',
			'large': size === 'large',
		});

		return (
			<button
				{...passThroughs}
				className={classNames(className, scopedClasses)}
				onClick={this.handleClick}
				disabled={isDisabled}
				ref='button'
			>
				<span className={boundClassNames('content')}>
					{children}
				</span>
			</button>
		);
	}
});

export default Button;
