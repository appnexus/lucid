import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Bar');

const { number, bool, string, object } = PropTypes;

export interface IBarProps
	extends StandardProps,
		React.SVGProps<SVGRectElement> {
	/** x coordinate. */
	x: number;

	/** y coordinate. */
	y: number;

	/** Height of the bar. */
	height: number | string;

	/** Width of the bar. */
	width: number | string;

	/** Determines if the bar has a white stroke around it. */
	hasStroke: boolean;

	/** Strings should match an existing color class unless they start with a '#'
		for specific colors. E.g.:

		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\`
	 */
	color: string;
}

const defaultProps = {
	x: 0,
	y: 0,
	height: 0,
	width: 0,
	color: chartConstants.COLOR_0,
	hasStroke: false,
};

export const Bar = (props: IBarProps): React.ReactElement => {
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
	} = props;

	const isCustomColor = _.startsWith(color, '#');
	const colorStyle = isCustomColor ? { fill: color } : null;

	return (
		<rect
			{...passThroughs}
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
};

Bar.defaultProps = defaultProps;
Bar.displayName = 'Bar';
Bar.peek = {
	description: `*For use within an \`svg\`*. A \`Bar\` is typically used for a \`Bar Chart\` and is pretty much a thin wrapper around an \`svg rect\`.`,
	categories: ['visualizations', 'geoms'],
};
Bar.propTypes = {
	/**
		Passed through to the root element.
	*/
	style: object,

	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		x coordinate.
	*/
	x: number,

	/**
		y coordinate.
	*/
	y: number,

	/**
		Height of the bar.
	*/
	height: PropTypes.oneOfType([number, string]),

	/**
		Width of the bar.
	*/
	width: PropTypes.oneOfType([number, string]),

	/**
		Determines if the bar has a white stroke around it.
	*/
	hasStroke: bool,

	/**
		Strings should match an existing color class unless they start with a '#'
		for specific colors. E.g.:

		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\`
	*/
	color: string,
};

export default Bar;
