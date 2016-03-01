import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { bindClassNames } from '../../util/style-helpers';
import CheckIcon from '../Icon/CheckIcon/CheckIcon';
import InfoIcon from '../Icon/InfoIcon/InfoIcon';
import CrossIcon from '../Icon/CrossIcon/CrossIcon';
import WarningIcon from '../Icon/WarningIcon/WarningIcon';

const boundClassNames = bindClassNames('Banner');

const {
	bool,
	string,
	oneOfType,
	oneOf,
	node,
	arrayOf,
	func,
	element
} = React.PropTypes;

const defaultIcons = {
	'success': <CheckIcon size='18' isBadge/>,
	'danger': <CrossIcon size='18' isBadge />,
	'info': <InfoIcon size='18' isBadge />,
	'warning': <WarningIcon size='18' />,
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
		 * pass in a bool to display predefined icon based on `kind`.
		 */
		hasIcon: bool,
		/**
		 * pass in a icon component for custom icons within banner.
		 */
		icon: element,
		/**
		 * set this to `true` if you want to have a `x` close icon.
		 */
		isCloseable: bool,
		/**
		 * set this value to `false` of you want to remove the rounded corners
		 * on the `Banner`.  **default is `true`**
		 */
		hasRoundedCorners: bool,
		/**
		 * class names that are appended to the defaults
		 */
		className: string,
		/**
		 * any valid React children
		 */
		children: oneOfType([
			node,
			arrayOf(node)
		]),
		/**
		 * style variations of the Banner
		 */
		kind: oneOf([
			'primary',
			'success',
			'warning',
			'danger',
			'info'
		]),
		/**
		 * if set to `true` the banner have smaller padding on the inside
		 */
		isSmall: bool,
		/**
		 * called when the user clicks the Banner
		 */
		onClick: func,
	},

	getDefaultProps() {
		return {
			hasIcon: false,
			icon: null,
			isCloseable: true,
			hasRoundedCorners: true,
			kind: 'default',
			isSmall: false,
			onClick: _.noop
		};
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
			...passThroughs
		} = this.props;

		let displayedIcon = null;

		if(icon) {
			displayedIcon = icon;
		}
		else if(hasIcon) {
			displayedIcon = defaultIcons[kind];
		}

		//if icon than hasicon needs to be ture

		const scopedClasses = boundClassNames('~', {
			'has-icon': displayedIcon,
			'has-close': isCloseable,
			'has-no-roundedCorners': !hasRoundedCorners,
			'primary': kind === 'primary',
			'success': kind === 'success',
			'warning': kind === 'warning',
			'danger': kind === 'danger',
			'info': kind === 'info',
			'small': isSmall,
		});

		return (
			<section
				className={classNames(className, scopedClasses)}
				{...passThroughs}
				>
				{displayedIcon ? <span className={boundClassNames('icon')}>{displayedIcon}</span> : null}
				<span className={boundClassNames('content')}>
					{children}
				</span>
				{isCloseable ? <span className={boundClassNames('close')} onClick={this.props.onClick}>{String.fromCharCode(0x00d7)}</span> : null}
			</section>
		);
	}
});

export default Banner;
