import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	getFirst,
	rejectTypes,
	omitProps,
} from '../../util/component-types';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const cx = lucidClassNames.bind('&-OverlayWrapper');

const { bool, node, oneOf, string } = PropTypes;

const OverlayWrapper = createClass({
	displayName: 'OverlayWrapper',

	statics: {
		peek: {
			description: `
				A wrapper with optional overlay to wrap content. \`Overlay\` is meant
				for overlaying an entire page, while this component is meant to wrap
				another component and cover its content.
			`,
			categories: ['utility'],
		},
	},

	propTypes: {
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
	},

	components: {
		Message: createClass({
			displayName: 'OverlayWrapper.Message',
			propName: 'Message',
			propTypes: {
				children: node`
					Any valid React children.
				`,
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
				...passThroughs
			},
		} = this;

		const { Message } = OverlayWrapper;

		const messageElementProp = _.get(getFirst(props, Message), 'props', {});
		const otherChildren = rejectTypes(children, [Message]);

		return (
			<div
				{...omitProps(passThroughs, OverlayWrapper)}
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
	},
});

export default OverlayWrapper;
