import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Line');

const {
	number,
	string,
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
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
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
				className={cx(className, '&', `&-color-${colorIndex}`)}
				d={d}
			/>
		);
	},
});

export default Line;
