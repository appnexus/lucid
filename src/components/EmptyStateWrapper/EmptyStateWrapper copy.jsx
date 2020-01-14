import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';

const cx = lucidClassNames.bind('&-EmptyStateWrapper');

const { any, bool, node, string } = PropTypes;

const EmptyStateWrapper = createClass({
	_isPrivate: true,

	statics: {
		peek: {
			description: `
				A wrapper which can display either a \`LoadingIndicator\` or
				\`OverlayWrapper\`.
			`,
			categories: ['utility'],
			madeFrom: ['LoadingIndicator', 'OverlayWrapper'],
		},
	},

	displayName: 'EmptyStateWrapper',

	propTypes: {
		className: string`
			Class names that are appended to the defaults.
		`,

		children: node`
			Any valid React children.
		`,

		isEmpty: bool`
			Controls the visibility of the \`EmptyMessage\`
		`,

		isLoading: bool`
			Controls the visibility of the \`LoadingMessage\`.
		`,

		Body: any`
			*Child Element* The element to display in the body of the overlay.
		`,

		Title: any`
			*Child Element* The element to display in the title of the overlay.
		`,
	},

	components: {
		Body: createClass({
			displayName: 'EmptyStateWrapper.Body',
			statics: {
				peek: {
					description: `
						Body content for the message to display when there is no data.
					`,
				},
			},
			propName: 'Body',
		}),
		Title: createClass({
			displayName: 'EmptyStateWrapper.Title',
			statics: {
				peek: {
					description: `
						Title text for the message to display when there is no data.
					`,
				},
			},
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

		return isLoading ? (
			<LoadingIndicator
				className={cx('&', className)}
				isLoading
				{...omitProps(passThroughs, EmptyStateWrapper, [], false)}
			>
				{children}
			</LoadingIndicator>
		) : (
			<OverlayWrapper
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
							className={cx('&-message-title', emptyMessageTitleProp.className)}
						/>
						{emptyMessageBodyProp && <div {...emptyMessageBodyProp} />}
					</div>
				</OverlayWrapper.Message>

				{children}
			</OverlayWrapper>
		);
	},
});

export default EmptyStateWrapper;
