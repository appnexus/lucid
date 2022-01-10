import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, rejectTypes } from '../../util/component-types';
import OverlayWrapper, {
	OverlayWrapperMessage,
	IOverlayWrapperProps,
} from '../OverlayWrapper/OverlayWrapper';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const cx = lucidClassNames.bind('&-LoadingIndicator');

const { bool, node, oneOf, string } = PropTypes;

export interface ILoadingIndicatorProps extends IOverlayWrapperProps {
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
	anchorMessage: false,
	fixedMessage: false,
	overlayKind: 'light' as const,
};

export const LoadingIndicator = (
	props: ILoadingIndicatorProps
): React.ReactElement => {
	const {
		children,
		className,
		isLoading,
		anchorMessage,
		fixedMessage,
		...passThroughs
	} = props;

	const messageElement = getFirst(
		props,
		LoadingIndicator.LoadingMessage,
		<LoadingMessage />
	);
	const otherChildren = rejectTypes(children, LoadingIndicator.LoadingMessage);

	return (
		<OverlayWrapper
			{..._.omit(passThroughs, ['Message', 'initialState', 'callbackId'])}
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

LoadingIndicator.LoadingMessage = LoadingMessage;

LoadingIndicator.displayName = 'LoadingIndicator';
LoadingIndicator.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading.
		`,
		intendedUse: `
			- Use in places where data takes time to load. LoadingIndicator lets users know that the information they expect to see will appear shortly.
			- Use the light overlay, \`overlayKind: "light"\`
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
	madeFrom: ['OverlayWrapper', 'LoadingMessage'],
};
LoadingIndicator.propTypes = {
	/**
		Class names that are appended to the defaults.
	*/
	className: string,

	/**
		Any valid React children.
	*/
	children: node,

	/**
		Set this to \`false\` if you don't want the semi-transparent overlay over
		the wrapped content
  */
	hasOverlay: bool,

	/**
		Controls the visibility of the \`LoadingMessage\` and overlay.
	*/
	isLoading: bool,

	/**
		Positions the loading message near the top of the container. By default,
		the loading message is vertically aligned to the middle of the container.
	*/
	anchorMessage: bool,

	/**
		By default, the OverlayMessage is vertically aligned to the middle of the
		\`OverlayWrapper\`, and the \`OverlayWrapper\` is the height of the entire content.
		Set this to true to position the \`OverlayMessage\` near the center of the 
		\`OverlayWrapper\`, and fix the \`OverlayWrapper\` to the screen height and width.
	*/
	fixedMessage: bool,

	/**
		Style variations for the overlay behind the loading indicator.
	*/
	overlayKind: oneOf(['light', 'dark']),
};
LoadingIndicator.defaultProps = defaultProps;

export default LoadingIndicator;
