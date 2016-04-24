import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Point');

const {
	number,
	oneOf,
	object,
	string,
} = React.PropTypes;

const borderRadius = 2;

/**
 * {"categories": ["visualizations", "geoms"]}
 *
 * Points are typically used for scatter plots. They were originally built in a
 * 14x14 grid.
 */
const Point = React.createClass({
	propTypes: {
		/**
		 * Styles are passed through to the underlying element.
		 */
		style: object,
		/**
		 * Class name appended to the underling element.
		 */
		className: string,
		/**
		 * x coordinate
		 */
		x: number,
		/**
		 * y coordinate
		 */
		y: number,
		/**
		 * Determines which shape to display.
		 *
		 * 1. circle
		 * 2. square
		 * 3. triangle up
		 * 4. triangle down
		 * 5. diamond
		 */
		kind: oneOf([
			1, // circle
			2, // square
			3, // triangle up
			4, // triangle down
			5, // diamond
		]),
		/**
		 * Determines which color the shape is.
		 */
		color: oneOf([
			1,
			2,
			3,
			4,
			5,
			6,
		]),
	},

	getDefaultProps() {
		return {
			x: 0,
			y: 0,
			kind: 1,
			color: 1,
		};
	},

	render() {
		const {
			x,
			y,
			kind,
			color,
			style,
			className,
			...passThroughs,
		} = this.props;

		switch (kind) {
			case 1:
				return (
					<circle
						{...passThroughs}
						className={boundClassNames('&', `&-color-${color}`, className)}
						cx={0}
						cy={0}
						r={7}
						transform={`translate(${x}, ${y})`}
						style={style}
					/>
				)
			case 2:
				return (
					<rect
						{...passThroughs}
						className={boundClassNames('&', `&-color-${color}`, className)}
						x={0}
						y={0}
						rx={borderRadius}
						ry={borderRadius}
						width={14}
						height={14}
						transform={`translate(${x - 7}, ${y - 7})`}
						style={style}
					/>
				)
			// TODO: don't rely on stroke for the rounded corners
			case 3:
				return (
					<path
						{...passThroughs}
						className={boundClassNames('&', `&-color-${color}`, className)}
						d='M0,13 L7,1 L14,13 L0,13 Z'
						transform={`translate(${x - 7}, ${y - 7})`}
						style={_.assign({}, style, {
							strokeWidth: borderRadius,
						})}
					/>
				)
			// TODO: don't rely on stroke for the rounded corners
			case 4:
				return (
					<path
						{...passThroughs}
						className={boundClassNames('&', `&-color-${color}`, className)}
						d='M0,1 L14,1 L7,13 L0,1 Z'
						transform={`translate(${x - 7}, ${y - 7})`}
						style={_.assign({}, style, {
							strokeWidth: borderRadius,
						})}
					/>
				)
			// TODO: don't rely on stroke for the rounded corners
			case 5:
				return (
					<path
						{...passThroughs}
						className={boundClassNames('&', `&-color-${color}`, className)}
						d='M7,1 L13,7 L7,13 L1,7 Z'
						transform={`translate(${x - 7}, ${y - 7})`}
						style={_.assign({}, style, {
							strokeWidth: borderRadius,
						})}
					/>
				)
		}

	}
});

export default Point;
