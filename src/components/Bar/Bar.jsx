import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Bar');

const {
	number,
	any,
	bool,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "geoms"]}
 *
 * Bars are typically used for bar charts.
 *
 */
const Bar = React.createClass({
	_lucidIsPrivate: true,

	propTypes: {
		/**
		 * Classes are appended to existing classes using the `classnames` library.
		 */
		className: any,
		/**
		 * x coordinate.
		 */
		x: number,
		/**
		 * y coordinate.
		 */
		y: number,
		/**
		 * Height of the bar.
		 */
		height: number,
		/**
		 * Width of the bar.
		 */
		width: number,
		/**
		 * Determines if the bar has a white stroke around it.
		 */
		hasStroke: bool,
		/**
		 * Zero-based set of colors. It's recommended that you pass the index of
		 * your array for colors.
		 */
		color: number,
	},

	getDefaultProps() {
		return {
			x: 0,
			y: 0,
			height: 0,
			width: 0,
			color: 0,
		};
	},

	render() {
		const {
			className,
			color,
			hasStroke,
			height,
			width,
			x,
			y,
			...passThroughs,
		} = this.props;

		const colorIndex = color % 6;

		return (
			<rect
				{...passThroughs}
				className={boundClassNames(className, '&', `&-color-${colorIndex}`, {
					'&-has-stroke': hasStroke,
				})}
				x={x}
				y={y}
				height={height}
				width={width}
			/>
		);
	}
});

export default Bar;
