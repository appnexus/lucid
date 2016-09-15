import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-HatchPattern');

const {
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["communication"], "madeFrom": ["Button"]}
 *
 * An emptiness indicator wrapper
 *
 */
const HatchPattern = createClass({
	displayName: 'HatchPattern',
	propTypes: {
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Height of the rectangle.
		 */
		height: string.isRequired,
		/**
		 * Stroke color to use for the pattern..
		 */
		stroke: string,
		/**
		 * Stroke width to use for the pattern.
		 */
		strokeWidth: string,
		/**
		 * Width of the rectangle.
		 */
		width: string.isRequired,
	},

	getDefaultProps() {
		return {
			stroke: 'lightgrey',
			strokeWidth: '1',
		};
	},

	render() {
		const {
			className,
			height,
			stroke,
			strokeWidth,
			width,
		} = this.props;

		return (
			<svg className={cx('&', className)}>
				<rect
					x='0'
					y='0'
					fill='url(#diagonalHatch)'
					style={{ width, height}}
				/>
				<pattern
					id='diagonalHatch'
					patternUnits='userSpaceOnUse'
					width='4'
					height='4'
					style={{stroke, strokeWidth}}
				>
					<path d='M-1,1 l2,-2
									M0,4 l4,-4
									M3,5 l2,-2' />
				</pattern>
			</svg>
		);
	},
});

export default HatchPattern;
