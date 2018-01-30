import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-AxisLabel');

const { number, string, oneOf, object } = PropTypes;

const AxisLabel = createClass({
	displayName: 'AxisLabel',

	statics: {
		peek: {
			description: `
				*For use within an \`svg\`*

				Centered labels for axes that typically are fit into the margins of a
				chart.
			`,
			categories: ['visualizations', 'chart primitives'],
		},
	},

	propTypes: {
		style: object`
			Passed through to the root element.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		height: number.isRequired`
			Height of the margin this label should fit into.
		`,

		width: number.isRequired`
			Width of the margin this label should fit into.
		`,

		color: string`
			Strings should match an existing color class unless they start with a '#'
			for specific colors. E.g.:

			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\`
		`,

		label: string`
			Contents of the label, should only ever be a string since we use a
			\`text\` under the hood.
		`,

		orient: oneOf(['top', 'bottom', 'left', 'right'])`
			Determine orientation of the label.
		`,
	},

	getDefaultProps() {
		return {
			color: '#000',
		};
	},

	render() {
		const {
			height,
			width,
			orient,
			label,
			color,
			style,
			className,
			...passThroughs
		} = this.props;

		const isH = orient === 'top' || orient === 'bottom';
		const isCustomColor = _.startsWith(color, '#');
		const colorStyle = isCustomColor ? { fill: color } : null;

		return (
			<text
				{...omitProps(passThroughs, AxisLabel)}
				style={{
					...colorStyle,
					...style,
				}}
				className={cx(className, '&', {
					[`&-${color}`]: !isCustomColor,
				})}
				x={isH ? width / 2 : height / 2 * -1}
				y={orient === 'right' ? width : orient === 'bottom' ? height : 0}
				dy={orient === 'top' || orient === 'left' ? '1em' : '-.32em'}
				transform={isH ? '' : 'rotate(-90)'}
			>
				{label}
			</text>
		);
	},
});

export default AxisLabel;
