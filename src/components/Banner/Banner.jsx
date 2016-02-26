import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { bindClassNames } from '../../util/style-helpers';

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
	'success': '<SuccessIcon/>',
	'danger': '<DangerIcon/>',
	'info': '<InfoIcon/>',
	'warning': '<WarningIcon/>',
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
		 * set this to `true` if you want to remove rounded corners.
		 */
		isFullWidth: bool,
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
		 * size variations of the Banner
		 */
		size: oneOf([
			'small'
		]),
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
			isFullWidth: false,
			kind: 'default',
			onClick: _.noop
		};
	},

	render() {
		let {
			hasIcon,
			icon,
			kind,
			size,
			className,
			children,
			isCloseable,
			isFullWidth,
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

		let scopedClasses = boundClassNames('~', {
			'has-icon': displayedIcon,
			'has-close': isCloseable,
			'full-width': isFullWidth,
			'primary': kind === 'primary',
			'success': kind === 'success',
			'warning': kind === 'warning',
			'danger': kind === 'danger',
			'info': kind === 'info',
			'small': size === 'small',
		});

		return (
			<section
				className={classNames(className, scopedClasses)}
				onClick={this.handleClick}
				{...passThroughs}
				ref='Banner' >
				{displayedIcon ? <span className={boundClassNames('icon')}>{displayedIcon}</span> : null}
				<span className={boundClassNames('content')}>
					{children}
				</span>
				{isCloseable ? <span className={boundClassNames('close')} onClick={this.props.onClick}>{ String.fromCharCode(215) } </span> : null}
			</section>
		);
	}
});

export default Banner;
