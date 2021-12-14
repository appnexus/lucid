import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-AxisLabel');

const { number, string, oneOf, object } = PropTypes;

const defaultProps = {
	color: '#000',
};

export interface IAxisLabelProps extends StandardProps {
	/** Height of the margin this label should fit into. */
	height: number;

	/** Width of the margin this label should fit into. */
	width: number;

	/** Strings should match an existing color class unless they start with a '#' 
	 * for specific colors. E.g.:
	 * 
		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\`
	`*/
	color: string;

	/** Contents of the label, should only ever be a string since we use a
		\`text\` under the hood. */
	label: string;

	/** Determine orientation of the label. */
	orient: 'top' | 'bottom' | 'left' | 'right';
}

export const AxisLabel = (props: IAxisLabelProps): React.ReactElement => {
	const {
		height,
		width,
		orient,
		label,
		color,
		style,
		className,
		...passThroughs
	} = props;

	const isH = orient === 'top' || orient === 'bottom';
	const isCustomColor = _.startsWith(color, '#');
	const colorStyle = isCustomColor ? { fill: color } : null;

	return (
		<text
			{...(passThroughs as any)}
			style={{
				...colorStyle,
				...style,
			}}
			className={cx(className, '&', {
				[`&-${color}`]: !isCustomColor,
			})}
			x={isH ? width / 2 : (height / 2) * -1}
			y={orient === 'right' ? width : orient === 'bottom' ? height : 0}
			dy={orient === 'top' || orient === 'left' ? '1em' : '-.32em'}
			transform={isH ? '' : 'rotate(-90)'}
		>
			{label}
		</text>
	);
};

AxisLabel.defaultProps = defaultProps;
AxisLabel.displayName = 'AxisLabel';
AxisLabel.peek = {
	description: `\`AxisLabel\` is used within a \`svg\`. Centered labels for axes that typically are fit into the margins of a chart.`,
	categories: ['visualizations', 'chart primitives'],
};
AxisLabel.propTypes = {
	/**
		Passed through to the root element.
	*/
	style: object,

	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Height of the margin this label should fit into.
	*/
	height: number.isRequired,

	/**
		Width of the margin this label should fit into.
	*/
	width: number.isRequired,

	/**
		Strings should match an existing color class unless they start with a '#'
		for specific colors. E.g.:

		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\`
	*/
	color: string,

	/**
		Contents of the label, should only ever be a string since we use a
		\`text\` under the hood.
	*/
	label: string,

	/**
		Determine orientation of the label.
	*/
	orient: oneOf(['top', 'bottom', 'left', 'right']),
};

export default AxisLabel;
