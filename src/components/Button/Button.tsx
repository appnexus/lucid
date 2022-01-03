import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, Overwrite } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Button');

const { arrayOf, bool, func, node, oneOf, oneOfType, string } = PropTypes;

export interface IButtonPropsRaw extends StandardProps {
	/**
	 * Disables the Button by greying it out
	 *
	 * @default false
	 **/
	isDisabled: boolean;

	/**
	 * Activates the Button by giving it a "pressed down" look
	 *
	 * @default false
	 **/
	isActive: boolean;

	/**
	 * Set this to `true` if you want the Button to only contain an icon.
	 *
	 * @default false
	 * */
	hasOnlyIcon: boolean;

	/** Style variations of the Button */
	kind?: 'primary' | 'link' | 'danger' | 'invisible';

	/** Size variations of the Button */
	size?: 'short' | 'small' | 'large';

	/** Called when the user clicks the \`Button\`. */
	onClick: ({
		event,
		props,
	}: {
		event: React.MouseEvent<HTMLButtonElement>;
		props: IButtonProps;
	}) => void;

	/**
	 * Form element type variations of Button. Passed through to DOM Button.
	 *
	 * @default "button"
	 * */
	type: 'submit' | 'reset' | 'button';
}

export type IButtonProps = Overwrite<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>,
	IButtonPropsRaw
>;

const defaultProps = {
	isDisabled: false,
	isActive: false,
	onClick: _.noop,
	type: 'button' as const,
	hasOnlyIcon: false,
};

/** Button */
export const Button = (props: IButtonProps): React.ReactElement => {
	const {
		isDisabled,
		isActive,
		onClick,
		hasOnlyIcon,
		kind,
		size,
		className,
		children,
		type,
		...passThroughs
	} = props;

	const buttonRef = React.createRef<HTMLButtonElement>();

	function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
		if (!isDisabled) {
			// required to correctly apply the focus state in Safari and Firefox
			// (still valid 2019-07-22)

			if (buttonRef.current) {
				buttonRef.current.focus();
			}
			onClick({ event, props: props });
		}
	}
	return (
		<button
			{...passThroughs}
			ref={buttonRef}
			className={cx(
				'&',
				{
					'&-is-disabled': isDisabled,
					'&-is-active': isActive,
					'&-primary': kind === 'primary',
					'&-link': kind === 'link',
					'&-invisible': kind === 'invisible',
					'&-danger': kind === 'danger',
					'&-short': size === 'short',
					'&-small': size === 'small',
					'&-large': size === 'large',
					'&-has-only-icon': hasOnlyIcon,
				},
				className
			)}
			onClick={handleClick}
			disabled={isDisabled}
			type={type}
		>
			<span className={cx('&-content')}>{children}</span>
		</button>
	);
};

Button.defaultProps = defaultProps;

Button.displayName = 'Button';

Button.peek = {
	description: `A basic button. Any props that are not explicitly called out below will be passed through to the native \`Button\` component.`,
	categories: ['controls', 'buttons'],
};

Button.propName = 'Button';

Button.propTypes = {
	/**
		Disables the Button by greying it out
	*/
	isDisabled: bool,

	/**
		Activates the Button by giving it a "pressed down" look
	*/
	isActive: bool,

	/**
		Class names that are appended to the defaults
	*/
	className: string,

	/**
		Set this to \`true\` if you want the Button to only contain an icon.
	*/
	hasOnlyIcon: bool,

	/**
		Any valid React children
	*/
	children: oneOfType([node, arrayOf(node)]),

	/**
		Style variations of the Button
	*/
	kind: oneOf(['primary', 'link', 'danger', 'invisible']),

	/**
		Size variations of the Button
	*/
	size: oneOf(['short', 'small', 'large']),

	/**
		Called when the user clicks the \`Button\`.
	*/
	onClick: func,

	/**
		Form element type variations of Button. Passed through to DOM Button.
	*/
	type: string,
};

export default Button;
