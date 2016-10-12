import _ from 'lodash';
import React from 'react';
import { createClass, getFirst } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';

import HatchPattern from '../HatchPattern/HatchPattern';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';

const cx = lucidClassNames.bind('&-EmptyStateWrapper');

const {
	any,
	bool,
	node,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["utility"], "madeFrom": ["HatchPattern", "LoadingIndicator", "OverlayWrapper"]}
 *
 * A wrapper for Charts which can display either a `LoadingIndicator` or `OverlayWrapper`.
 *
 */
const EmptyStateWrapper = createClass({
	_isPrivate: true,

	displayName: 'EmptyStateWrapper',

	propTypes: {
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Any valid React children.
		 */
		children: node,
		/**
		 * Controls the visibility of the `EmptyMessage`
		 */
		isEmpty: bool,
		/**
		 * Controls the visibility of the `LoadingMessage`.
		 */
		isLoading: bool,
		/**
		 * *Child Element*
		 *
		 * The element to display in the body of the overlay for an empty chart.
		 */
		EmptyMessageBody: any,
		/**
		 * *Child Element*
		 *
		 * The element to display in the title of the overlay for an empty chart.
		 */
		EmptyMessageTitle: any,
	},

	components: {
		/**
		 * Body content for the message to display when the chart has no data.
		 */
		EmptyMessageBody: createClass({
			displayName: 'EmptyStateWrapper.EmptyMessageBody',
			propName: 'EmptyMessageBody',
		}),
		/**
		 * Title text for the message to display when the chart has no data.
		 */
		EmptyMessageTitle: createClass({
			displayName: 'EmptyStateWrapper.EmptyMessageTitle',
			propName: 'EmptyMessageTitle',
		}),
	},

	render() {
		const {
			children,
			isEmpty,
			isLoading,
		} = this.props;

		const emptyMessageBodyProp = _.get(getFirst(this.props, EmptyStateWrapper.EmptyMessageBody), 'props');
		const emptyMessageTitleProp = _.get(getFirst(this.props, EmptyStateWrapper.EmptyMessageTitle), 'props', {children: 'You have no Line Items.'});

		return (
			isLoading ?
				<LoadingIndicator isLoading>
					{children}
				</LoadingIndicator>
			:
				<OverlayWrapper
					hasOverlay={false}
					isVisible={isEmpty}
				>
					<OverlayWrapper.Message className={cx('&-message-container')}>
						<HatchPattern />
						<div className={cx('&-message-contents')}>
							<header {...emptyMessageTitleProp} className={cx('&-message-title', emptyMessageTitleProp.className)} />
							{emptyMessageBodyProp && <div {...emptyMessageBodyProp} />}
						</div>
					</OverlayWrapper.Message>

					{children}
				</OverlayWrapper>
		);
	},
})

export default EmptyStateWrapper;
