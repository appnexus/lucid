import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { getFirst, StandardProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import OverlayWrapper, {
	OverlayWrapperMessage,
} from '../OverlayWrapper/OverlayWrapper';

const cx = lucidClassNames.bind('&-EmptyStateWrapper');

const { any, bool, node, string } = PropTypes;

export interface IEmptyStateWrapperBodyProps extends StandardProps {}

const EmptyStateWrapperBody = (_props: IEmptyStateWrapperBodyProps): null =>
	null;

export interface IEmptyStateWrapperTitleProps extends StandardProps {}

const EmptyStateWrapperTitle = (_props: IEmptyStateWrapperTitleProps): null =>
	null;

export interface IEmptyStateWrapperProps extends StandardProps {
	/** *Child Element* The element to display in the body of the overlay. */
	Body?: React.ReactNode;

	/**	*Child Element* The element to display in the title of the overlay. */
	Title?: React.ReactNode | string;

	/** Controls the visibility of the \`EmptyMessage\`. */
	isEmpty: boolean;

	/** Controls the visibility of the \`LoadingMessage\`. */
	isLoading: boolean;

	/** Position the `EmptyMessage` and `LoadingMessage` near the top of the container. */
	anchorMessage: boolean;
}

const nonPassthroughs = [
	'className',
	'children',
	'isEmpty',
	'isLoading',
	'anchorMessage',
	'Body',
	'Title',
	'initialState',
	'callbackId',
];

const defaultProps = {
	isEmpty: false,
	isLoading: false,
	anchorMessage: false,
};

export const EmptyStateWrapper = (
	props: IEmptyStateWrapperProps
): React.ReactElement => {
	const {
		children,
		className,
		isEmpty,
		isLoading,
		anchorMessage,
		...passThroughs
	} = props;

	const emptyMessageBodyProp = _.get(
		getFirst(props, EmptyStateWrapperBody),
		'props'
	);

	const emptyMessageTitleProp = _.get(
		getFirst(props, EmptyStateWrapperTitle),
		'props',
		{ children: 'You have no data.' }
	);

	return isLoading ? (
		<LoadingIndicator
			className={cx('&', className)}
			isLoading
			{..._.omit(passThroughs, nonPassthroughs)}
			anchorMessage={anchorMessage}
		>
			{children}
		</LoadingIndicator>
	) : (
		<OverlayWrapper
			className={cx('&', className)}
			hasOverlay={false}
			isVisible={isEmpty}
			anchorMessage={anchorMessage}
			{..._.omit(passThroughs, nonPassthroughs)}
		>
			<OverlayWrapperMessage className={cx('&-message-container')}>
				<div className={cx('&-message-header')} />
				<div className={cx('&-message-contents')}>
					<header
						{...emptyMessageTitleProp}
						className={cx('&-message-title', emptyMessageTitleProp.className)}
					/>
					{emptyMessageBodyProp && <div {...emptyMessageBodyProp} />}
				</div>
			</OverlayWrapperMessage>

			{children}
		</OverlayWrapper>
	);
};

EmptyStateWrapper._isPrivate = true;

EmptyStateWrapper.peek = {
	description: `A wrapper which can display either a \`LoadingIndicator\` or \`OverlayWrapper\`.`,
	categories: ['utility'],
	madeFrom: ['LoadingIndicator', 'OverlayWrapper'],
};

EmptyStateWrapper.displayName = 'EmptyStateWrapper';

EmptyStateWrapper.defaultProps = defaultProps;

EmptyStateWrapper.propTypes = {
	/**
		Class names that are appended to the defaults.
	*/
	className: string,

	/**
		Any valid React children.
	*/
	children: node,

	/**
		Controls the visibility of the \`EmptyMessage\`.
	*/
	isEmpty: bool,

	/**
		Controls the visibility of the \`LoadingMessage\`.
	*/
	isLoading: bool,

	/**
		Position the \`EmptyMessage\` and \`LoadingMessage\` near the top of the container.
	*/
	anchorMessage: bool,

	/**
	 * Child Element* The element to display in the body of the overlay.
	 */
	Body: any,

	/**
	 * Child Element* The element to display in the title of the overlay.
	 */
	Title: any,
};

EmptyStateWrapperBody.displayName = 'EmptyStateWrapper.Body';
EmptyStateWrapper.Body = EmptyStateWrapperBody;
EmptyStateWrapperBody.peek = {
	description: `Body content for the message to display when there is no data.`,
};
EmptyStateWrapperBody.propName = 'Body';

EmptyStateWrapperTitle.displayName = 'EmptyStateWrapper.Title';
EmptyStateWrapper.Title = EmptyStateWrapperTitle;
EmptyStateWrapperTitle.peek = {
	description: `Title text for the message to display when there is no data.`,
};
EmptyStateWrapperTitle.propName = 'Title';

export default EmptyStateWrapper;
