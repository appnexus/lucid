import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Icon');

const { any, string, number, object, bool } = PropTypes;

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * A basic svg icon. Any props that are not explicitly called out below will be
 * passed through to the native `svg` component.
 */
const Icon = createClass({
	displayName: 'Icon',
	propTypes: {
		/**
		 * Styles that are passed through to the `svg`.
		 */
		style: object,
		/**
		 * Classes that are appended to the component defaults. This prop is run
		 * through the `classnames` library.
		 */
		className: any,
		/**
		 * Size variations of the icons. `size` directly effects height and width
		 * but the developer should also be conscious of the relationship with
		 * `viewBox`.
		 */
		size: number,
		/**
		 * `viewBox` is very important for SVGs. You can think of `viewBox` as the
		 * "artboard" for our SVG while `size` is the presented height and width.
		 */
		viewBox: string,
		/**
		 * Any valid SVG aspect ratio.
		 */
		aspectRatio: string,
		/**
		 * Add badge styling.
		 */
		isBadge: bool,
		/**
		 * Adds styling that makes the icon appear clickable.
		 */
		isClickable: bool,
		/**
		 * Adds styling that makes the icon appear disabled.
		 * Also forces isClickable to be false.
		 */
		isDisabled: bool,
		/**
		 * Any valid React children.
		 */
		children: any,
	},

	getDefaultProps() {
		return {
			size: 16,
			aspectRatio: 'xMidYMid meet',
			viewBox: '0 0 16 16',
			isBadge: false,
			isDisabled: false,
		};
	},

	render() {
		const {
			className,
			children,
			size,
			style,
			viewBox,
			aspectRatio,
			isBadge,
			isClickable,
			isDisabled,
			...passThroughs
		} = this.props;

		// Because we control the icon size inline, we must also control the border
		// radius in the case where they user wants `isBadge`. Later one, we filter
		// out any `undefined` properties using lodash methods.
		const actualStyle = {
			...style,
			borderRadius: _.get(
				style,
				'borderRadius',
				isBadge ? `${size}px` : undefined
			),
		};

		return (
			<svg
				width={size}
				height={size}
				viewBox={viewBox}
				preserveAspectRatio={aspectRatio}
				{...omitProps(passThroughs, Icon)}
				style={_.pickBy(actualStyle, _.negate(_.isUndefined))}
				className={cx(
					'&',
					{
						'&-is-badge': isBadge,
						'&-is-clickable': !isDisabled && isClickable,
						'&-is-disabled': isDisabled,
					},
					className
				)}
			>
				{children}
			</svg>
		);
	},
});

export default Icon;
