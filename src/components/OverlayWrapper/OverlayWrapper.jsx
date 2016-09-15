import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, rejectTypes, omitProps } from '../../util/component-types';
// import LoadingMessage from '../LoadingMessage/LoadingMessage';

const cx = lucidClassNames.bind('&-OverlayWrapper');

const {
	bool,
	node,
	oneOf,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["utility"]}
 *
 * A wrapper with optional overlay to wrap content. `Overlay` is meant for overlaying an entire page, while this component is meant to wrap another component and cover its content.
 *
 */
const OverlayWrapper = createClass({
	displayName: 'OverlayWrapper',
	propTypes: {
		/**
		 * Controls whether the message should be displayed over the wrapped content.
		 */
		isVisible: bool,
		/**
		 * Set this to `false` if you don't want the semi-transparent overlay over
		 * the wrapped content.
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
		 * Style variations for the overlay behind the message.
		 */
		overlayKind: oneOf([
			'light',
			'dark',
		]),
	},

	components: {
		Message: createClass({
			displayName: 'OverlayWrapper.Message',
			propTypes: {
				/**
				 * Any valid React children.
				 */
				children: node,
			},
		}),
	},

	getDefaultProps() {
		return {
			hasOverlay: true,
			overlayKind: 'light',
		};
	},

	render() {
		const {
			props,
			props: {
				hasOverlay,
				isVisible,
				className,
				children,
				overlayKind,
				...passThroughs,
			},
		} = this;

		const { Message } = OverlayWrapper;

		console.log('props', props);
		const messageElement = getFirst(props, Message, <div />);
		const otherChildren = rejectTypes(children, [OverlayWrapper.Message]);

		console.log('messageElement', messageElement);
		console.log('isVisible', isVisible);
		return (
			<div
				{...omitProps(passThroughs, OverlayWrapper)}
				className={cx('&', className)}
			>
				{otherChildren}
				{isVisible &&
					(<div className={cx('&-message-container', {
						'&-has-overlay': hasOverlay,
						'&-kind-light': overlayKind === 'light',
					})}>
						{messageElement}
					</div>)}
			</div>
		);
	},
});

export default OverlayWrapper;
