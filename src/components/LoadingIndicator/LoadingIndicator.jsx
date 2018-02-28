import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, rejectTypes } from '../../util/component-types';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const cx = lucidClassNames.bind('&-LoadingIndicator');

const { bool, node, oneOf, string } = PropTypes;

const LoadingIndicator = createClass({
	displayName: 'LoadingIndicator',

	statics: {
		peek: {
			description: `
				A loading indicator wrapper with optional overlay.
			`,
			categories: ['communication'],
			madeFrom: ['OverlayWrapper', 'LoadingMessage'],
		},
	},

	propTypes: {
		hasOverlay: bool`
			Set this to \`false\` if you don't want the semi-transparent overlay over
			the wrapped content
		`,

		className: string`
			Class names that are appended to the defaults.
		`,

		children: node`
			Any valid React children.
		`,

		isLoading: bool`
			Controls the visibility of the \`LoadingMessage\` and overlay.
		`,

		overlayKind: oneOf(['light', 'dark'])`
			Style variations for the overlay behind the loading indicator.
		`,
	},

	components: { LoadingMessage },

	getDefaultProps() {
		return {
			hasOverlay: true,
			isLoading: false,
			overlayKind: 'light',
		};
	},

	render() {
		const { props, props: { children, className, isLoading } } = this;

		const { LoadingMessage } = LoadingIndicator;

		const messageElement = getFirst(props, LoadingMessage) || (
			<LoadingMessage />
		);
		const otherChildren = rejectTypes(children, LoadingMessage);

		return (
			<OverlayWrapper
				{..._.omit(props, ['children', 'className', 'isLoading'])}
				className={cx('&', className)}
				isVisible={isLoading}
			>
				{otherChildren}
				<OverlayWrapper.Message>{messageElement}</OverlayWrapper.Message>
			</OverlayWrapper>
		);
	},
});

export default LoadingIndicator;
