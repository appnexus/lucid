import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, rejectTypes } from '../../util/component-types';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';

const cx = lucidClassNames.bind('&-LoadingIndicator');

const {
	bool,
	element,
	func,
	node,
	string,
} = React.PropTypes;

const defaultIcons = {
	default: <LoadingIcon />,
};

/**
 *
 * {"categories": ["communication"], "madeFrom": ["DangerIcon", "InfoIcon", "SuccessIcon", "WarningIcon"]}
 *
 * A loading indicator. Any props that are not explicitly called out below will be
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
		 * Pass in an icon component for custom icon to show in `LoadingIndicator`.
		 */
		icon: element,
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Any valid React children.
		 */
		children: node,
		/**
		 * Called when the user closes the `LoadingIndicator`.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onClose: func,
		/**
		 * Controls the visibility of the `LoadingIndicator`.
		 */
		isLoading: bool,

	},

	components: {
		Title: createClass({
			displayName: 'LoadingIndicator.Title',
			propName: 'Title',
		}),
		Body: createClass({
			displayName: 'LoadingIndicator.Body',
			propName: 'Body',
		}),
	},

	getDefaultProps() {
		return {
			hasOverlay: true,
			onClose: _.noop,
			isLoading: false,
		};
	},

	render() {
		const {
			props,
			props: {
				hasOverlay,
				icon = defaultIcons['default'],
				className,
				children,
				isLoading,
				...passThroughs,
			},
		} = this;

		const defaultTitle = 'Loading';
		const titleElement = _.first(findTypes(props, LoadingIndicator.Title));
		const titleChildren = _.get(titleElement, 'props.children');
		const bodyElement = _.first(findTypes(props, LoadingIndicator.Body));
		const bodyChildren = _.get(bodyElement, 'props.children', null);
		const otherChildren = rejectTypes(children, [LoadingIndicator.Title, LoadingIndicator.Body]);

		return (
			<div
				{..._.omit(passThroughs, ['Title', 'Body'])}
				className={cx('&', '&-container', className)}
			>
				{otherChildren}
				<ReactCSSTransitionGroup
					transitionName={cx('&-banner-container')}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{isLoading && (
						<div className={cx('&-banner-container', { '&-has-overlay': hasOverlay })}>
							<div className={cx('&-banner', { '&-no-content': !titleChildren && !bodyChildren })}>
								{icon}
								{!_.isNull(titleChildren) && <h3 className={cx('&-title')}>{titleChildren || defaultTitle}</h3>}
								{bodyChildren && <span className={cx('&-body')}>{bodyChildren}</span>}
							</div>
						</div>
					)}
				</ReactCSSTransitionGroup>
			</div>
		);
	},
});

export default LoadingIndicator;
