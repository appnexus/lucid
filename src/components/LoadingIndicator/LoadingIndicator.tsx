/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	FC,
	getFirst,
	rejectTypes,
	omitProps,
	FixDefaults,
} from '../../util/component-types';
import OverlayWrapper, {
	OverlayWrapperMessage,
	IOverlayWrapperProps,
} from '../OverlayWrapper/OverlayWrapper';
import LoadingMessage, {
	ILoadingMessageProps,
} from '../LoadingMessage/LoadingMessage';

const cx = lucidClassNames.bind('&-LoadingIndicator');

const { bool, node, oneOf, string } = PropTypes;

export interface ILoadingIndicatorProps extends IOverlayWrapperProps {
	/** Set this to `false` if you don't want the semi-transparent overlay over
		the wrapped content */
	hasOverlay?: boolean;

	/** Controls the visibility of the `LoadingMessage` and overlay. */
	isLoading?: boolean;

	/** Style variations for the overlay behind the loading indicator. */
	overlayKind?: 'light' | 'dark';
}

export interface ILoadingIndicatorFC extends FC<ILoadingIndicatorProps> {
	LoadingMessage: FC<ILoadingMessageProps>;
}

const defaultProps = {
	hasOverlay: true,
	isLoading: false,
	overlayKind: 'light' as const,
};

export const LoadingIndicator: ILoadingIndicatorFC = (props): React.ReactElement => {
	const { children, className, isLoading } = props as FixDefaults<
		ILoadingIndicatorProps,
		typeof defaultProps
	>;

	const messageElement = getFirst(
		props,
		LoadingIndicator.LoadingMessage,
		<LoadingMessage />
	);
	const otherChildren = rejectTypes(children, LoadingIndicator.LoadingMessage);

	return (
		<OverlayWrapper
			{...omitProps(
				props,
				undefined,
				// _.keys(LoadingIndicator.propTypes)
				['children', 'className', 'isLoading', 'Message']
			)}
			className={cx('&', className)}
			isVisible={isLoading}
		>
			{otherChildren}
			<OverlayWrapperMessage>{messageElement}</OverlayWrapperMessage>
		</OverlayWrapper>
	);
};

LoadingIndicator.LoadingMessage = LoadingMessage;

LoadingIndicator.displayName = 'LoadingIndicator';
LoadingIndicator.peek = {
	description: `
		A loading indicator wrapper with optional overlay.
	`,
	categories: ['communication'],
	madeFrom: ['OverlayWrapper', 'LoadingMessage'],
};
LoadingIndicator.propTypes = {
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

	overlayKind: oneOf(['light', 'dark'])`
		Style variations for the overlay behind the loading indicator.
	`,
};
LoadingIndicator.defaultProps = defaultProps;

export default LoadingIndicator;
