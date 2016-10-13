import _ from 'lodash';
import React from 'react';
import { createClass, getFirst } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';

const cx = lucidClassNames.bind('&-DataTableWrapper');

const {
	any,
	bool,
	node,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["utility"], "madeFrom": ["LoadingIndicator", "OverlayWrapper"]}
 *
 * A wrapper for the DataTable which can display either a `LoadingIndicator` or `OverlayWrapper`.
 *
 */
const DataTableWrapper = createClass({
	_isPrivate: true,

	displayName: 'DataTableWrapper',

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
		 * The element to display in the body of the overlay for an empty data table.
		 */
		EmptyMessageBody: any,
		/**
		 * *Child Element*
		 *
		 * The element to display in the title of the overlay for an empty data table.
		 */
		EmptyMessageTitle: any,
	},

	components: {
		/**
		 * Body content for the message to display when the data table has no data.
		 */
		EmptyMessageBody: createClass({
			displayName: 'DataTableWrapper.EmptyMessageBody',
			propName: 'EmptyMessageBody',
		}),
		/**
		 * Title text for the message to display when the data table has no data.
		 */
		EmptyMessageTitle: createClass({
			displayName: 'DataTableWrapper.EmptyMessageTitle',
			propName: 'EmptyMessageTitle',
		}),
	},

	render() {
		const {
			children,
			isEmpty,
			isLoading,
		} = this.props;

		const emptyMessageBodyProp = _.get(getFirst(this.props, DataTableWrapper.EmptyMessageBody), 'props');
		const emptyMessageTitleProp = _.get(getFirst(this.props, DataTableWrapper.EmptyMessageTitle), 'props', {children: 'You have no Line Items.'});

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
						<div className={cx('&-message-header')} />
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

export default DataTableWrapper;
