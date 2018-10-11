import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Bar');

const { number, bool, string, object } = PropTypes;

const Bar = createClass({
	displayName: 'Bar',

	statics: {
		peek: {
			description: `
				*For use within an \`svg\`*

				Bars are typically used for bar charts and are pretty much a thin
				wrapper around svg rects.
			`,
			categories: ['visualizations', 'geoms'],
		},
	},

	propTypes: {
		style: object`
			Passed through to the root element.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		x: number`
			x coordinate.
		`,

		y: number`
			y coordinate.
		`,

		height: PropTypes.oneOfType([number, string])`
			Height of the bar.
		`,

		width: PropTypes.oneOfType([number, string])`
			Width of the bar.
		`,

		hasStroke: bool`
			Determines if the bar has a white stroke around it.
		`,

		color: string`
			Strings should match an existing color class unless they start with a '#'
			for specific colors. E.g.:

			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\`
		`,
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
