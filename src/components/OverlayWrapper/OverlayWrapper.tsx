/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import {
	getFirst,
	rejectTypes,
	omitProps,
	StandardProps,
} from '../../util/component-types';
import { CSSTransition } from 'react-transition-group';

const cx = lucidClassNames.bind('&-OverlayWrapper');

const { bool, node, oneOf, string } = PropTypes;

export interface IMessageProps extends StandardProps {}

export const OverlayWrapperMessage = (_props: IMessageProps): null => null;
OverlayWrapperMessage.displayName = 'OverlayWrapper.Message';
OverlayWrapperMessage.peek = {
	description: `
		The Message to display in the overlay.
	`,
};
OverlayWrapperMessage.propName = 'Message';
OverlayWrapperMessage.propTypes = {
	children: node,
};

export interface IOverlayWrapperProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Controls whether the message should be displayed over the wrapped content. */
	isVisible?: boolean;

	/** Set this to \`false\` if you don't want the semi-transparent overlay over
	 * the wrapped content.
	 *
	 * @default true
	 */
	hasOverlay: boolean;

	/** Style variations for the overlay behind the message.
	 *
	 * @default 'light'
	 * */
	overlayKind: 'light' | 'dark';

	/** By default, the OverlayMessage is vertically aligned to the middle of the
	 *	OverlayWrapper. Set this to true to position the `OverlayMessage` near the top of
	 *	the `OverlayWrapper`.
	 *
	 * @default false
	 */
	anchorMessage: boolean;

	/** By default, the OverlayMessage is vertically aligned to the middle of the
	 *	OverlayWrapper, and the `OverlayWrapper` is the height of the entire content.
	 *	Set this to true to position the `OverlayMessage` near the center of the
	 *	`OverlayWrapper`, and fix the `OverlayWrapper` to the screen height and width.
	 *
	 * @default false
	 */
	fixedMessage: boolean;

	/** *Child Element* The Message to display in the overlay. */
	Message?: React.ReactNode & { props: IMessageProps };
}

const defaultProps = {
	hasOverlay: true,
	overlayKind: 'light' as const,
	anchorMessage: false,
	fixedMessage: false,
	isVisible: false,
};

export const OverlayWrapper = (
	props: IOverlayWrapperProps
): React.ReactElement => {
	const {
		hasOverlay,
		isVisible,
		className,
		children,
		overlayKind,
		anchorMessage,
		fixedMessage,
		...passThroughs
	} = props;

	const messageElementProp = _.get(
		getFirst<IMessageProps>(props, OverlayWrapperMessage),
		'props',
		{}
	);

	const otherChildren = rejectTypes(children, [OverlayWrapperMessage]);

	return (
		<div
			{...omitProps(passThroughs, undefined, _.keys(OverlayWrapper.propTypes))}
			className={cx('&', className)}
		>
			{otherChildren}
			<CSSTransition
				in={isVisible}
				classNames={cx('&-message-container')}
				timeout={300}
				unmountOnExit
			>
				<div
					className={cx('&-message-container', {
						'&-has-overlay': hasOverlay,
						'&-kind-light': hasOverlay && overlayKind === 'light',
						'&-anchored-message': anchorMessage,
						'&-fixed-message': fixedMessage,
					})}
				>
					<div {...messageElementProp} />
				</div>
			</CSSTransition>
		</div>
	);
};

OverlayWrapper.defaultProps = defaultProps;
OverlayWrapper.displayName = 'OverlayWrapper';
OverlayWrapper.peek = {
	description: `
		A wrapper with optional overlay to wrap content. \`Overlay\` is meant
		for overlaying an entire page, while this component is meant to wrap
		another component and cover its content.
	`,
	categories: ['utility'],
};
OverlayWrapper.propTypes = {
	isVisible: bool`
		Controls whether the message should be displayed over the wrapped
		content.
	`,

	hasOverlay: bool`
		Set this to \`false\` if you don't want the semi-transparent overlay over
		the wrapped content.
	`,

	className: string`
		Class names that are appended to the defaults.
	`,

	children: node`
		Any valid React children.
	`,

	overlayKind: oneOf(['light', 'dark'])`
		Style variations for the overlay behind the message.
	`,

	anchorMessage: bool`
		By default, the \`OverlayMessage\` is vertically aligned to the middle of the
		OverlayWrapper. Set this to true to position the \`OverlayMessage\` near the top of 
		the \`OverlayWrapper\`.
	`,

	fixedMessage: bool`
		By default, the OverlayMessage is vertically aligned to the middle of the
		\`OverlayWrapper\` and the \`OverlayWrapper\` is the height of the entire content.
		Set this to true to position the \`OverlayMessage\` near the center of the 
		\`OverlayWrapper\`, and fix the \`OverlayWrapper\` to the screen height and width.
	`,

	Message: node`
		*Child Element* The Message to display in the overlay.
	`,
};

OverlayWrapper.Message = OverlayWrapperMessage;

export default OverlayWrapper;
