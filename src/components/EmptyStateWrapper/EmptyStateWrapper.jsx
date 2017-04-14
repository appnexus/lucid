import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';

const cx = lucidClassNames.bind('&-EmptyStateWrapper');

const { any, bool, node, string } = PropTypes;

/**
 *
 * {"categories": ["utility"], "madeFrom": ["LoadingIndicator", "OverlayWrapper"]}
 *
 * A wrapper which can display either a `LoadingIndicator` or `OverlayWrapper`.
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
		 * The element to display in the body of the overlay.
		 */
		Body: any,
		/**
		 * *Child Element*
		 *
		 * The element to display in the title of the overlay.
		 */
		Title: any,
	},

	components: {
		/**
		 * Body content for the message to display when there is no data.
		 */
		Body: createClass({
			displayName: 'EmptyStateWrapper.Body',
			propName: 'Body',
		}),
		/**
		 * Title text for the message to display when there is no data.
		 */
		Title: createClass({
			displayName: 'EmptyStateWrapper.Title',
			propName: 'Title',
		}),
	},

	render() {
		const {
			children,
			className,
			isEmpty,
			isLoading,
			...passThroughs
		} = this.props;

		const emptyMessageBodyProp = _.get(
			getFirst(this.props, EmptyStateWrapper.Body),
			'props'
		);
		const emptyMessageTitleProp = _.get(
			getFirst(this.props, EmptyStateWrapper.Title),
			'props',
			{ children: 'You have no data.' }
		);

		return isLoading
			? <LoadingIndicator
					className={cx('&', className)}
					isLoading
					{...omitProps(passThroughs, EmptyStateWrapper, [], false)}
				>
					{children}
				</LoadingIndicator>
			: <OverlayWrapper
					className={cx('&', className)}
					hasOverlay={false}
					isVisible={isEmpty}
					{...omitProps(passThroughs, EmptyStateWrapper, [], false)}
				>
					<OverlayWrapper.Message className={cx('&-message-container')}>
						<div className={cx('&-message-header')} />
						<div className={cx('&-message-contents')}>
							<header
								{...emptyMessageTitleProp}
								className={cx(
									'&-message-title',
									emptyMessageTitleProp.className
								)}
							/>
							{emptyMessageBodyProp && <div {...emptyMessageBodyProp} />}
						</div>
					</OverlayWrapper.Message>

					{children}
				</OverlayWrapper>;
	},
});

export default EmptyStateWrapper;
