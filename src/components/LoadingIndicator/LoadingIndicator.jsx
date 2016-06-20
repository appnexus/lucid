import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, rejectTypes } from '../../util/component-types';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';
import CrossIcon from '../Icon/CrossIcon/CrossIcon';

const cx = lucidClassNames.bind('&-LoadingIndicator');

const {
	bool,
	element,
	func,
	node,
	oneOf,
	string,
} = React.PropTypes;

const defaultIcons = {
	success: <SuccessIcon />,
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
		 * Set this to `true` if you want to have an `x` close icon.
		 */
		isCloseable: bool,
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Any valid React children.
		 */
		children: node,
		/**
		 * Style variations of the `LoadingIndicator`.
		 */
		kind: oneOf([
			'success',
			'default',
		]),
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
			isCloseable: false,
			kind: 'default',
			onClose: _.noop,
			isLoading: false,
		};
	},

	handleClose(event) {
		this.props.onClose({ event, props: this.props });
	},

	render() {
		const {
			props,
			props: {
				kind,
				hasOverlay,
				icon = defaultIcons[kind],
				className,
				children,
				isCloseable,
				isLoading,
				...passThroughs,
			},
			handleClose,
		} = this;

		const defaultTitle = icon === defaultIcons[kind] ? 'Loading' : null;
		const titleElement = _.first(findTypes(props, LoadingIndicator.Title));
		const titleChildren = _.get(titleElement, 'props.children', defaultTitle);
		const bodyElement = _.first(findTypes(props, LoadingIndicator.Body));
		const bodyChildren = _.get(bodyElement, 'props.children', null);
		const otherChildren = rejectTypes(children, [LoadingIndicator.Title, LoadingIndicator.Body]);

		return (
			<div {...passThroughs} className={cx('&', '&-container', className)} >
				{otherChildren}
				<ReactCSSTransitionGroup
					transitionName={cx('&-banner-container')}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{isLoading && (
						<div className={cx('&-banner-container', { '&-has-overlay': hasOverlay })}>
							<div className={cx('&-banner')}>
								{icon}
								{titleChildren && <h3 className={cx('&-title')}>{titleChildren}</h3>}
								{isCloseable && <CrossIcon className={cx('&-close')} onClick={handleClose}/>}
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
