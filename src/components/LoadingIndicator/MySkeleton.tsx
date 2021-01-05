/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, rejectTypes, omitProps } from '../../util/component-types';
import OverlayWrapper, {
	OverlayWrapperMessage,
	IOverlayWrapperProps,
} from '../OverlayWrapper/OverlayWrapper';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const cx = lucidClassNames.bind('&-MySkeleton');

const { bool, node, oneOf, string } = PropTypes;

export interface IMySkeletonProps extends IOverlayWrapperProps {
	/** Set this to `false` if you don't want the semi-transparent overlay over
		the wrapped content */
	hasOverlay: boolean;

	/** Controls the visibility of the `LoadingMessage` and overlay. */
	isLoading: boolean;

	/** Positions the loading message near the top of the container. By default,
	 *  the loading message is vertically aligned to the middle of the container.
	 */
	anchorMessage: boolean;

	/** By default, the OverlayMessage is vertically aligned to the middle of the
	 *	OverlayWrapper, and the `OverlayWrapper` is the height of the entire content.
	 *	Set this to true to position the `OverlayMessage` near the center of the
	 *	`OverlayWrapper`, and fix the `OverlayWrapper` to the screen height and width.
	 */
	fixedMessage: boolean;

	/** Style variations for the overlay behind the loading indicator. */
	overlayKind: 'light' | 'dark';
}

const defaultProps = {
	hasOverlay: true,
	isLoading: false,
	overlayKind: 'light' as const,
	anchorMessage: false,
	fixedMessage: false,
};

export const MySkeleton = (
	props: IMySkeletonProps
): React.ReactElement => {
	const { children, className, isLoading, anchorMessage, fixedMessage } = props;

	const messageElement = getFirst(
		props,
		MySkeleton.LoadingMessage,
		<LoadingMessage />
	);
	const otherChildren = rejectTypes(children, MySkeleton.LoadingMessage);

	return (
		<OverlayWrapper
			{...omitProps(
				props,
				undefined,
				// _.keys(MySkeleton.propTypes)
				['children', 'className', 'isLoading', 'Message']
			)}
			className={cx('&', className)}
			isVisible={isLoading}
			anchorMessage={anchorMessage}
			fixedMessage={fixedMessage}
		>
			{otherChildren}
			<OverlayWrapperMessage>{messageElement}</OverlayWrapperMessage>
		</OverlayWrapper>
	);
};

MySkeleton.LoadingMessage = LoadingMessage;

MySkeleton.displayName = 'MySkeleton';
MySkeleton.peek = {
	description: `
		A loading indicator wrapper with optional overlay.
	`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading.
		`,
		intendedUse: `
			- Use in places where data takes time to load. MySkeleton lets users know that the information they expect to see will appear shortly.
			- Use the light overlay, \`overlayKind: "light"\`
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['communication'],
	madeFrom: ['OverlayWrapper', 'LoadingMessage'],
};
MySkeleton.propTypes = {
	className: string`
		Class names that are appended to the defaults.
	`,

	children: node`
		Any valid React children.
	`,

	hasOverlay: bool`
		Set this to \`false\` if you don't want the semi-transparent overlay over
		the wrapped content
    `,

	isLoading: bool`
		Controls the visibility of the \`LoadingMessage\` and overlay.
	`,

	anchorMessage: bool`
		Positions the loading message near the top of the container. By default,
		the loading message is vertically aligned to the middle of the container.
	`,

	fixedMessage: bool`
		By default, the OverlayMessage is vertically aligned to the middle of the
		\`OverlayWrapper\`, and the \`OverlayWrapper\` is the height of the entire content.
		Set this to true to position the \`OverlayMessage\` near the center of the 
		\`OverlayWrapper\`, and fix the \`OverlayWrapper\` to the screen height and width.
	`,

	overlayKind: oneOf(['light', 'dark'])`
		Style variations for the overlay behind the loading indicator.
	`,
};
MySkeleton.defaultProps = defaultProps;

export default MySkeleton;
