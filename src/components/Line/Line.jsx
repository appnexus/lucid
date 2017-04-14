import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

const cx = lucidClassNames.bind('&-Line');

const { string, object, bool } = PropTypes;

/**
 * {"categories": ["visualizations", "geoms"]}
 *
 * *For use within an `svg`*
 *
 * Lines are typically used for line charts and are pretty much a thin wrapper
 * around svg paths.
 *
 */
const Line = createClass({
	displayName: 'Line',

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
		/**
		 * Display a dotted line.
		 */
		isDotted: bool,
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
