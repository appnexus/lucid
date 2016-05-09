import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Line');

const {
	number,
	any,
	string,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "geoms"]}
 *
 * Lines are typically used for line charts.
 *
 */
const Line = React.createClass({
	_lucidIsPrivate: true,

	propTypes: {
		/**
		 * Classes are appended to existing classes using the `classnames` library.
		 */
		className: any,
		/**
		 * The path for the line.
		 */
		d: string,
		/**
		 * Zero-based set of colors. It's recommended that you pass the index of
		 * your array for colors.
		 */
		color: number,
	},

	getDefaultProps() {
		return {
			color: 0,
		};
	},

	render() {
		const {
			className,
			color,
			d,
			...passThroughs,
		} = this.props;

		const colorIndex = color % 6;

		return (
			<path
				{...passThroughs}
				className={boundClassNames(className, '&', `&-color-${colorIndex}`)}
				d={d}
			/>
		);
	}
});

export default Line;
