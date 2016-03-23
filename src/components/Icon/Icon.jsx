import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Icon');

const {
	any,
	string,
	number,
	bool,
	object,
	oneOfType,
} = React.PropTypes;

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * A basic svg icon. Any props that are not explicitly called out below will be
 * passed through to the native `svg` component.
 */
const Icon = React.createClass({
	propTypes: {
		/**
		 * Classes that are appended to the component defaults. This prop is run
		 * through the `classnames` library.
		 */
		className: any,
		/**
		 * Size is the height and width of the icon. This can be either a number
		 * like `16` which will apply the width and height as a 16x16 square or
		 * set an object array like `{16, 8}` which will apply a width of 16 and a
		 * height of 8.
		 * Tthe developer should also be conscious of the relationship with `viewBox`.
		 */
		size: oneOfType(number, object),
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
		 * Any valid React children.
		 */
		children: any
	},

	getDefaultProps() {
		return {
			size: 16,
			aspectRatio: 'xMidYMid meet',
			viewBox: '0 0 16 16',
			isBadge: false
		};
	},

	render() {
		let {
			className,
			children,
			size,
			viewBox,
			aspectRatio,
			isBadge,
			...passThroughs
		} = this.props;

		const width = typeof(size) ==='number' ?
										size : size[0];
		const height = typeof(size) ==='number' ?
										size : size[1];

		return (
			<svg
				{...passThroughs}
				className={boundClassNames('&', {
					'&-is-badge': isBadge,
				}, className)}
				width={width}
				height={height}
				viewBox={viewBox}
				preserveAspectRatio={aspectRatio}
			>
				{children}
			</svg>
		);
	}
});

export default Icon;
