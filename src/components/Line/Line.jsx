import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Line');

const {
	string,
	object,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "geoms"]}
 *
 * Lines are great. If I told you they aren't, I'd be li'n.
 *
 */
const Line = createClass({
	displayName: 'Line',

	_lucidIsPrivate: true,

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
		 * The path for the line.
		 */
		d: string,
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
			color: chartConstants.COLOR_0,
		};
	},

	render() {
		const {
			className,
			color,
			d,
			style,
			...passThroughs,
		} = this.props;

		const isCustomColor = _.startsWith(color, '#');
		const colorStyle = isCustomColor
			? { fill: color, stroke: color }
			: null;

		return (
			<path
				{...passThroughs}
				style={{
					...style,
					...colorStyle,
				}}
				className={cx(className, '&', {
					[`&-${color}`]: !isCustomColor,
				})}
				d={d}
			/>
		);
	},
});

export default Line;
