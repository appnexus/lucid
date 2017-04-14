import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, rejectTypes } from '../../util/component-types';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const cx = lucidClassNames.bind('&-LoadingIndicator');

const { bool, node, oneOf, string } = PropTypes;

/**
 *
 * {"categories": ["communication"], "madeFrom": ["OverlayWrapper", "LoadingMessage"]}
 *
 * A loading indicator wrapper with optional overlay.
 *
 */
const LoadingIndicator = createClass({
	displayName: 'LoadingIndicator',
	propTypes: {
		/**
		 * Set this to `false` if you don't want the semi-transparent overlay over
		 * the wrapped content
		 */
		hasOverlay: bool,
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Any valid React children.
		 */
		children: node,
		/**
		 * Controls the visibility of the `LoadingMessage` and overlay.
		 */
		isLoading: bool,
		/**
		 * Style variations for the overlay behind the loading indicator.
		 */
		overlayKind: oneOf(['light', 'dark']),
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

		const messageElement = getFirst(props, LoadingMessage, <LoadingMessage />);
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
