import _ from 'lodash';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import DangerIcon from '../Icon/DangerIcon/DangerIcon';
import InfoIcon from '../Icon/InfoIcon/InfoIcon';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';
import WarningIcon from '../Icon/WarningIcon/WarningIcon';

const boundClassNames = lucidClassNames.bind('&-Banner');

const {
	any,
	bool,
	element,
	func,
	oneOf,
	string,
} = React.PropTypes;

const defaultIcons = {
	'success': <SuccessIcon />,
	'danger': <DangerIcon />,
	'info': <InfoIcon isBadge />,
	'warning': <WarningIcon />,
	'primary': null,
	'default': null
};

/**
 *
 * {"categories": ["controls", "banners"]}
 *
 * A basic Banner. Any props that are not explicitly called out below will be
 * passed through to the native `Banner` component.
 *
 * Short single line content can be passed in as a simple string. Multi line
 * messages should be passed wrapped in a `<p>` tag.
 *
 * It is valid to use `strong` or `em` within a `Banner` message.
 */
const Banner = React.createClass({
	propTypes: {
		/**
		 * Pass in a bool to display predefined icon based on `kind`.
		 */
		hasIcon: bool,
		/**
		 * Pass in a icon component for custom icons within `Banner`.
		 */
		icon: element,
		/**
		 * Set this to `true` if you want to have a `x` close icon.
		 */
		isCloseable: bool,
		/**
		 * Set this value to `false` if you want to remove the rounded corners on
		 * the `Banner`.  **default is `true`**
		 */
		hasRoundedCorners: bool,
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Any valid React children.
		 */
		children: any,
		/**
		 * Style variations of the `Banner`.
		 */
		kind: oneOf([
			'primary',
			'success',
			'warning',
			'danger',
			'info',
			'default',
		]),
		/**
		 * If set to `true` the banner have smaller padding on the inside.
		 */
		isSmall: bool,
		/**
		 * Called when the user closes the `Banner`.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onClose: func,
		/**
		 * Controls the visibility of the `Banner`.
		 */
		isClosed: bool,

	},

	getDefaultProps() {
		return {
			hasIcon: false,
			icon: null,
			isCloseable: true,
			hasRoundedCorners: true,
			kind: 'default',
			isSmall: false,
			onClose: _.noop,
		};
	},

	handleClose(event) {
		const {
			onClose,
		} = this.props;

		onClose({ event, props: this.props });
	},

	render() {
		const {
			hasIcon,
			icon,
			kind,
			isSmall,
			className,
			children,
			isCloseable,
			hasRoundedCorners,
			isClosed,
			...passThroughs
		} = this.props;

		let displayedIcon = null;

		if (icon) {
			displayedIcon = icon;
		} else if (hasIcon) {
			displayedIcon = defaultIcons[kind];
		}

		return (
			<ReactCSSTransitionGroup
				transitionName={boundClassNames('&')}
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
			>
				{!isClosed ?
					<section
						{...passThroughs}
						className={boundClassNames('&', {
							'&-has-icon': displayedIcon,
							'&-has-close': isCloseable,
							'&-has-no-roundedCorners': !hasRoundedCorners,
							'&-primary': kind === 'primary',
							'&-success': kind === 'success',
							'&-warning': kind === 'warning',
							'&-danger': kind === 'danger',
							'&-info': kind === 'info',
							'&-small': isSmall,
						}, className)}
					>
						{displayedIcon ?
							<span className={boundClassNames('&-icon')}>{displayedIcon}</span>
						: null}

						<span className={boundClassNames('&-content')}>
							{children}
						</span>

						{isCloseable ?
							<span className={boundClassNames('&-close')} onClick={this.handleClose}>
								{String.fromCharCode(0x00d7)}
							</span>
						: null}
					</section>
				: null}
			</ReactCSSTransitionGroup>
		);
	}
});

export default Banner;
