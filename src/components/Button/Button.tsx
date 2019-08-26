import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, FC } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Button');

const { arrayOf, bool, func, node, oneOf, oneOfType, string } = PropTypes;

export interface IButtonProps {
	/**
	 * Disables the Button by greying it out
	 *
	 * @default false
	 **/
	isDisabled?: boolean;

	/**
	 * Activates the Button by giving it a "pressed down" look
	 *
	 * @default false
	 **/
	isActive?: boolean;

	/** Activates the Button by giving it a "pressed down" look */
	className?: string;

	/**
	 * Set this to \`true\` if you want the Button to only contain an icon.
	 *
	 * @default false
	 * */
	hasOnlyIcon?: boolean;

	/** Any valid React children */
	children?: React.ReactNode;

	/** Style variations of the Button */
	kind?: 'primary' | 'link' | 'danger' | 'invisible';

	/** Size variations of the Button */
	size?: 'short' | 'small' | 'large';

	/** Called when the user clicks the \`Button\`. */
	onClick?: ({
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
	type?: 'submit' | 'reset' | 'button';
}

/** Test Button description */
const Button: FC<IButtonProps> = (props): React.ReactElement => {
	const {
		isDisabled = false,
		isActive = false,
		onClick = _.noop,
		hasOnlyIcon = false,
		kind,
		size,
		className,
		children,
		type = 'button',
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
			{...omitProps(passThroughs, undefined, [
				..._.keys(Button.propTypes),
				'callbackId',
			])}
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

Button.displayName = 'Button';

Button.peek = {
	description: `
		A basic button. Any props that are not explicitly called out below will
		be passed through to the native \`button\` component.
	`,
	categories: ['controls', 'buttons'],
};

Button.propName = 'Button';

Button.propTypes = {
	isDisabled: bool`
		Disables the Button by greying it out
	`,

	isActive: bool`
		Activates the Button by giving it a "pressed down" look
	`,

	className: string`
		Class names that are appended to the defaults
	`,

	hasOnlyIcon: bool`
		Set this to \`true\` if you want the Button to only contain an icon.
	`,

	children: oneOfType([node, arrayOf(node)])`
		Any valid React children
	`,

	kind: oneOf(['primary', 'link', 'danger', 'invisible'])`
		Style variations of the Button
	`,

	size: oneOf(['short', 'small', 'large'])`
		Size variations of the Button
	`,

	onClick: func`
		Called when the user clicks the \`Button\`.
	`,

	type: string`
		Form element type variations of Button. Passed through to DOM Button.
	`,
};

export default Button;
