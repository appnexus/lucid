import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Bar');

const { number, bool, string, object } = PropTypes;

/**
 * {"categories": ["visualizations", "geoms"]}
 *
 * *For use within an `svg`*
 *
 * Bars are typically used for bar charts and are pretty much a thin wrapper
 * around svg rects.
 *
 */
const Bar = createClass({
	displayName: 'Bar',

	propTypes: {
		/**
		 * Passed through to the root element.
		 */
		style: object,
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
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
		 * Strings should match an existing color class unless they start with a
		 * '#' for specific colors. E.g.:
		 *
		 * - `COLOR_0`
		 * - `COLOR_GOOD`
		 * - `'#123abc'`
		 */
		color: string,
	},

	getDefaultProps() {
		return {
			x: 0,
			y: 0,
			height: 0,
			width: 0,
			color: chartConstants.COLOR_0,
		};
	},

	render() {
		const {
			className,
			color,
			hasStroke,
			height,
			width,
			style,
			x,
			y,
			...passThroughs
		} = this.props;

		const isCustomColor = _.startsWith(color, '#');
		const colorStyle = isCustomColor ? { fill: color } : null;

		return (
			<rect
				{...omitProps(passThroughs, Bar)}
				className={cx(className, '&', {
					'&-has-stroke': hasStroke,
					[`&-${color}`]: !isCustomColor,
				})}
				x={x}
				y={y}
				height={height}
				width={width}
				style={{
					...style,
					...colorStyle,
				}}
			/>
		);
	},
});

export default Bar;
