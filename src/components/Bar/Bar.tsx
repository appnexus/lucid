import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	FC,
	omitProps,
	StandardProps,
	PropsWithDefaults,
} from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Bar');

const { number, bool, string, object } = PropTypes;

export interface IBarProps
	extends StandardProps,
		React.SVGAttributes<SVGRectElement> {
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

const Bar: FC<IBarProps> = ({
	className,
	color = chartConstants.COLOR_0,
	hasStroke,
	height = 0,
	width = 0,
	style,
	x = 0,
	y = 0,
	...passThroughs
}): React.ReactElement => {
	const isCustomColor = _.startsWith(color, '#');
	const colorStyle = isCustomColor ? { fill: color } : null;

	return (
		<rect
			{...omitProps<IBarProps>(passThroughs, undefined, _.keys(Bar.propTypes))}
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
	description: `
		*For use within an \`svg\`*

		Bars are typically used for bar charts and are pretty much a thin
		wrapper around svg rects.
	`,
	categories: ['visualizations', 'geoms'],
};
Bar.propTypes = {
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
};

export default Bar as FC<PropsWithDefaults<IBarProps, typeof defaultProps>>;
