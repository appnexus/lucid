import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Line');

const { string, object, bool } = PropTypes;

export interface ILineProps
	extends StandardProps,
		React.SVGProps<SVGPathElement> {
	/** The path for the line. */
	d?: string;

	/** Strings should match an existing color class unless they start with a '#' for specific colors. E.g.:

		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\` */
	color: string;

	/** Display a dotted line. */
	isDotted: boolean;
}

const defaultProps = {
	color: chartConstants.COLOR_0,
	isDotted: false,
};

export const Line = (props: ILineProps): React.ReactElement => {
	const { className, color, isDotted, d, style, ...passThroughs } = props;
	const isCustomColor = _.startsWith(color, '#');
	const colorStyle = isCustomColor ? { fill: color, stroke: color } : null;

	return (
		<path
			{...passThroughs}
			style={{
				...style,
				...colorStyle,
			}}
			className={cx(className, '&', {
				[`&-${color}`]: !isCustomColor,
				'&-is-dotted': isDotted,
			})}
			d={d}
		/>
	);
};

Line.defaultProps = defaultProps;

Line.displayName = 'Line';
Line.peek = {
	description: `*For use within an \`svg\`*. A \`Line\` is typically used for line charts and is pretty much a thin wrapper around \`svg\` paths.`,
	categories: ['visualizations', 'geoms'],
};
Line.propTypes = {
	/**
		Passed through to the root element.
	*/
	style: object,

	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		The path for the line.
	*/
	d: string,

	/**
		Strings should match an existing color class unless they start with a '#' for specific colors. E.g.:

		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\`
	*/
	color: string,
	/**
		Display a dotted line.
	*/
	isDotted: bool,
};

export default Line;
