import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, rejectTypes } from '../../util/component-types';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const cx = lucidClassNames.bind('&-LoadingIndicator');

const {
	bool,
	node,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["communication"], "madeFrom": ["LoadingMessage"]}
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
	},

	components: { LoadingMessage },

	getDefaultProps() {
		return {
			hasOverlay: true,
			isLoading: false,
		};
	},

	render() {
		const {
			props,
			props: {
				hasOverlay,
				className,
				children,
				isLoading,
				...passThroughs,
			},
		} = this;

		const { LoadingMessage } = LoadingIndicator;

		const messageElement = _.first(findTypes(props, LoadingMessage)) || <LoadingMessage />;
		const otherChildren = rejectTypes(children, [LoadingMessage]);

		return (
			<div
				{...passThroughs}
				className={cx('&', className)}
			>
				{otherChildren}
				<ReactCSSTransitionGroup
					transitionName={cx('&-message-container')}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{isLoading && (
						<div className={cx('&-message-container', { '&-has-overlay': hasOverlay })}>
							{messageElement}
						</div>
					)}
				</ReactCSSTransitionGroup>
			</div>
		);
	},
});

export default LoadingIndicator;
