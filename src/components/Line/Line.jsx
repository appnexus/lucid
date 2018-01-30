import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Line');

const { string, object, bool } = PropTypes;

const Line = createClass({
	displayName: 'Line',

	statics: {
		peek: {
			description: `
				*For use within an \`svg\`*

				Lines are typically used for line charts and are pretty much a thin
				wrapper around svg paths.
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

		d: string`
			The path for the line.
		`,

		color: string`
			Strings should match an existing color class unless they start with a '#' for specific colors. E.g.:

			- \`COLOR_0\`
			- \`COLOR_GOOD\`
			- \`'#123abc'\`
		`,
		isDotted: bool`
			Display a dotted line.
		`,
	},

	getDefaultProps() {
		return {
			color: chartConstants.COLOR_0,
			isDotted: false,
		};
	},

	render() {
		const {
			className,
			color,
			isDotted,
			d,
			style,
			...passThroughs
		} = this.props;

		const isCustomColor = _.startsWith(color, '#');
		const colorStyle = isCustomColor ? { fill: color, stroke: color } : null;

		return (
			<path
				{...omitProps(passThroughs, Line)}
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
	},
});

export default Line;
