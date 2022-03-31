import _, { omit, pick } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Overlay, { IOverlayProps, overlayPropTypes } from '../Overlay/Overlay';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, getFirst } from '../../util/component-types';
import Button, { IButtonProps } from '../Button/Button';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';

const cx = lucidClassNames.bind('&-Dialog');

const { node, oneOf, bool, func } = PropTypes;

export enum EnumSize {
	small = 'small',
	medium = 'medium',
	large = 'large',
}
type Size = keyof typeof EnumSize;

/** Dialog Header */
export interface IDialogHeaderProps extends StandardProps {
	description?: string;
}
const DialogHeader = (_props: IDialogHeaderProps): null => null;
DialogHeader.displayName = 'Dialog.Header';
DialogHeader.peek = {
	description: `Renders a \`<div>\`.`,
};
DialogHeader.propName = 'Header';

/** Dialog Footer */
export interface IDialogFooterProps extends StandardProps {
	description?: string;
}
const DialogFooter = (_props: IDialogFooterProps): null => null;
DialogFooter.displayName = 'Dialog.Footer';
DialogFooter.peek = {
	description: `Renders a \`<footer>\`.`,
};
DialogFooter.propName = 'Footer';

/** Dialog */
const nonPassThroughs = [
	'size',
	'isComplex',
	'hasGutters',
	'handleClose',
	'Header',
	'Footer',
	'initialState',
];

const defaultProps = {
	...Overlay.defaultProps,
	size: EnumSize.medium,
	isComplex: false,
	hasGutters: true,
};

export interface IDialogProps extends IOverlayProps {
	/** Size variations that only affect the width of the dialog. All the sizes
		will grow in height until they get too big, at which point they will
		scroll inside. */
	size: Size;

	/** If this is truthy (if a function is provided). the close button will show.
		The function that is called when the close button is triggered. */
	handleClose?: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IButtonProps;
	}) => void;

	/** Provides a more segregated design to organize more content in the Dialog.
	 * @default = false */
	isComplex: boolean;

	/** A true or false value that dictates whether or not the Body has padding. */
	hasGutters: boolean;

	/** *Child Element* - Header contents. Only one \`Header\` is used. */
	Header?: string | (React.ReactNode & { props: IDialogHeaderProps });

	/** *Child Element* - Footer contents. Only one \`Footer\` is used. */
	Footer?: string | (React.ReactNode & { props: IDialogFooterProps });
}

export const Dialog = (props: IDialogProps): React.ReactElement => {
	const {
		className,
		size,
		handleClose,
		hasGutters,
		isShown,
		isComplex,
		...passThroughs
	} = props;

	const headerChildProp = _.get(getFirst(props, Dialog.Header), 'props', {});
	const footerChildProp = _.get(getFirst(props, Dialog.Footer), 'props', null);

	return (
		<Overlay
			{...omit(passThroughs, nonPassThroughs)}
			{...pick<any>(passThroughs, overlayPropTypes)}
			isShown={isShown}
			className={cx('&', className)}
		>
			<div
				className={cx('&-window', {
					'&-window-is-small': size === EnumSize.small,
					'&-window-is-medium': size === EnumSize.medium,
					'&-window-is-large': size === EnumSize.large,
					'&-is-complex': isComplex,
					'&-no-footer': !footerChildProp,
				})}
			>
				<header className={cx('&-header')}>
					{headerChildProp.children}

					{handleClose && (
						<Button
							kind='invisible'
							hasOnlyIcon
							className={cx('&-close-button')}
							onClick={handleClose}
						>
							<CloseIcon />
						</Button>
					)}
				</header>

				<section
					className={cx('&-body', hasGutters ? '' : '&-body-no-gutters')}
				>
					{props.children}
				</section>

				{footerChildProp && (
					<footer {...footerChildProp} className={cx('&-footer')} />
				)}
			</div>
		</Overlay>
	);
};

Dialog.displayName = 'Dialog';

Dialog.defaultProps = defaultProps;

Dialog.peek = {
	description: `\`Dialog\` is used to pop open a window so the user doesn't lose the context of the page behind it. Extra props are spread through to the underlying \`Overlay\`.`,
	categories: ['layout'],
	extend: 'Overlay',
	madeFrom: ['Portal', 'Overlay'],
};

Dialog.propTypes = {
	...Overlay.propTypes,

	/**
		Size variations that only affect the width of the dialog. All the sizes
		will grow in height until they get too big, at which point they will
		scroll inside.
	*/
	size: oneOf(['small', 'medium', 'large']),

	/**
		If this is truthy (if a function is provided). the close button will show.
		The function that is called when the close button is triggered.
	*/
	handleClose: func,

	/**
		Defaults to false.
		Provides a more segregated design to organize more content in the Dialog.
	*/
	isComplex: bool,

	/**
		A true or false value that dictates whether or not the Body has padding.
	*/
	hasGutters: bool,

	Header: node,
	/*
	 *Child Element* - Header contents. Only one \`Header\` is used.
	 */

	Footer: node,
	/*
	 *Child Element* - Footer contents. Only one \`Footer\` is used.
	 */
};
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;

export default Dialog;
