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
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const cx = lucidClassNames.bind('&-OverlayWrapper');

const { bool, node, oneOf, string } = PropTypes;

interface IMessageProps extends StandardProps {}

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

	/** *Child Element* The Message to display in the overlay. */
	Message?: React.ReactNode & { props: IMessageProps };
}

const defaultProps = {
	hasOverlay: true,
	overlayKind: 'light' as const,
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
			<ReactTransitionGroup
				transitionName={cx('&-message-container')}
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
			>
				{isVisible && (
					<div
						className={cx('&-message-container', {
							'&-has-overlay': hasOverlay,
							'&-kind-light': hasOverlay && overlayKind === 'light',
						})}
					>
						<div {...messageElementProp} />
					</div>
				)}
			</ReactTransitionGroup>
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

	Message: node`
		*Child Element* The Message to display in the overlay.
	`,
};

OverlayWrapper.Message = OverlayWrapperMessage;

export default OverlayWrapper;
