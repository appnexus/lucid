import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Button');

const { arrayOf, bool, func, node, oneOf, oneOfType, string } = PropTypes;

/**
 *
 * {"categories": ["controls", "buttons"]}
 *
 * A basic button. Any props that are not explicitly called out below will be
 * passed through to the native `button` component.
 */
const Button = createClass({
	displayName: 'Button',
	propName: 'Button',
	propTypes: {
		/**
		 * Disables the Button by greying it out
		 */
		isDisabled: bool,
		/**
		 * Activates the Button by giving it a "pressed down" look
		 */
		isActive: bool,
		/**
		 * Class names that are appended to the defaults
		 */
		className: string,
		/**
		 * Set this to `true` if you want the Button to only contain
		 * an icon.
		 */
		hasOnlyIcon: bool,
		/**
		 * Any valid React children
		 */
		children: oneOfType([node, arrayOf(node)]),
		/**
		 * Style variations of the Button
		 */
		kind: oneOf(['primary', 'link', 'success', 'warning', 'danger', 'info']),
		/**
		 * Size variations of the Button
		 */
		size: oneOf(['short', 'small', 'large']),
		/**
		 * Called when the user clicks the `Button`.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onClick: func,
		/**
		 * Form element type variations of Button. Defaults to 'button' to avoid
		 * being triggered by 'Enter' anywhere on the page. Passed through to DOM
		 * Button.
		 */
		type: string,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isActive: false,
			onClick: _.noop,
			type: 'button',
			hasOnlyIcon: false,
		};
	},

	handleClick(event) {
		const { isDisabled, onClick } = this.props;
		const domNode = ReactDOM.findDOMNode(this);

		if (!isDisabled) {
			// required to correctly apply the focus state in Safari and Firefox
			domNode.focus();
			onClick({ event, props: this.props });
		}
	},

	render() {
		const {
			isDisabled,
			isActive,
			hasOnlyIcon,
			kind,
			size,
			className,
			children,
			type,
			...passThroughs
		} = this.props;

		return (
			<button
				{...omitProps(passThroughs, Button, ['callbackId'])}
				className={cx(
					'&',
					{
						'&-is-disabled': isDisabled,
						'&-is-active': isActive,
						'&-primary': kind === 'primary',
						'&-link': kind === 'link',
						'&-success': kind === 'success',
						'&-warning': kind === 'warning',
						'&-danger': kind === 'danger',
						'&-info': kind === 'info',
						'&-short': size === 'short',
						'&-small': size === 'small',
						'&-large': size === 'large',
						'&-has-only-icon': hasOnlyIcon,
					},
					className
				)}
				onClick={this.handleClick}
				disabled={isDisabled}
				ref="button"
				type={type}
			>
				<span className={cx('&-content')}>
					{children}
				</span>
			</button>
		);
	},
});

export default Button;
