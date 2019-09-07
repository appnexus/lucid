/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import {
	FC,
	getFirst,
	rejectTypes,
	omitProps,
	StandardProps,
} from '../../util/component-types';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const cx = lucidClassNames.bind('&-OverlayWrapper');

const { bool, node, oneOf, string } = PropTypes;

interface IMessageProps extends StandardProps {}

export const OverlayWrapperMessage: FC<IMessageProps> = (): null => null;
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

export interface IOverlayWrapperProps extends StandardProps {
	/** Controls whether the message should be displayed over the wrapped content. */
	isVisible: boolean;

	/** Set this to \`false\` if you don't want the semi-transparent overlay over
	 * the wrapped content.
	 *
	 * @default true
	 */
	hasOverlay?: boolean;

	/** Style variations for the overlay behind the message.
	 *
	 * @default 'light'
	 * */
	overlayKind?: 'light' | 'dark';

	/** *Child Element* The Message to display in the overlay. */
	Message?: FC<IMessageProps>;
}

interface IOverlayWrapperFC extends FC<IOverlayWrapperProps> {
	Message?: FC<IMessageProps>;
}

const OverlayWrapper: IOverlayWrapperFC = (props): React.ReactElement => {
	const {
		hasOverlay = true,
		isVisible,
		className,
		children,
		overlayKind = 'light',
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
