import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import { transformFromCenter } from '../../util/chart-helpers';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Point');

const { number, bool, string, object } = PropTypes;

// These were originally built in a 12x12 grid, except triangles which were
// 14x12 cause triangles are poo.
const PATHS = [
	'M6,12 C2.686,12 0,9.314 0,6 C0,2.686 2.686,0 6,0 C9.314,-0 12,2.686 12,6 C12,9.314 9.314,12 6,12 z',
	'M6,12 C0,12 0,12 0,6 C0,0 -0,0 6,0 C12,0 12,0 12,6 C12,12 12,12 6,12 z',
	'M6.034,1.656 C7,0 7,0 7.966,1.656 L13.034,10.344 C14,12 13,12 12,12 L2,12 C1,12 0,12 0.966,10.344 L6.034,1.656 z',
	'M7.966,10.344 C7,12 7,12 6.034,10.344 L0.966,1.656 C-0,0 1,0 2,0 L12,0 C13,0 14,0 13.034,1.656 L7.966,10.344 z',
	'M2.594,9.406 C-0.812,6 -0.812,6 2.594,2.594 C6,-0.812 6,-0.812 9.406,2.594 C12.812,6 12.812,6 9.406,9.406 C6,12.812 6,12.812 2.594,9.406 z',
];

export enum Kind {
	Circle,
	Square,
	TriangleUp,
	TriangleDown,
	Diamond,
}

export interface IPointProps
	extends StandardProps,
		React.SVGProps<SVGPathElement> {
	hasStroke: boolean;
	kind: Kind;
	color: string;
	scale: number;
	x: number;
	y: number;
}

const defaultProps = {
	x: 0,
	y: 0,
	kind: 0,
	color: chartConstants.COLOR_0,
	hasStroke: false,
	scale: 1,
};

export const Point = (props: IPointProps): React.ReactElement => {
	const {
		color,
		hasStroke,
		kind,
		x,
		y,
		scale,
		className,
		style,
		...passThroughs
	} = props;

	const kindIndex = kind % 5;

	const isCustomColor = _.startsWith(color, '#');
	const colorStyle = isCustomColor ? { fill: color } : null;

	// These transforms are used to center the icon on the x y coordinate
	// provided.
	const transforms = [
		transformFromCenter(x, y, 6, 6, scale),
		transformFromCenter(x, y, 6, 6, scale),
		transformFromCenter(x, y, 7, 6, scale), // triangle
		transformFromCenter(x, y, 7, 6, scale), // triangle
		transformFromCenter(x, y, 6, 6, scale),
	];

	return (
		<path
			{...passThroughs}
			style={{
				...style,
				...colorStyle,
			}}
			className={cx(className, '&', {
				'&-has-stroke': hasStroke,
				[`&-${color}`]: !isCustomColor,
			})}
			transform={transforms[kindIndex]}
			d={PATHS[kindIndex]}
		/>
	);
};

Point.defaultProps = defaultProps;

Point.displayName = 'Point';

Point.peek = {
	description: `*For use within an \`svg\`*. A \`Point\` is typically used for scatter plots or overlaying shapes on lines.`,
	categories: ['visualizations', 'geoms'],
};

Point.propTypes = {
	/**
			Passed through to the root element.
		*/
	style: object,

	/**
			Appended to the component-specific class names set on the root element.
		*/
	className: string,

	/**
			Determines if the point has a white stroke around it.
		*/
	hasStroke: bool,

	/**
			x coordinate
		*/
	x: number,

	/**
			y coordinate
		*/
	y: number,

	/**
			Zero-based set of shapes. It's recommended that you pass the index of
			your array for shapes.
		*/
	kind: number,

	/**
			Strings should match an existing color class unless they start with a '#'
			for specific colors. E.g.:

			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\`
		*/
	color: string,

	/**
			Scale up the size of the symbol. 2 would be double the original size.
		*/
	scale: number,
};

export default Point;
