import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-AxisLabel');
const SPACER = '\u00a0\u00a0\u00a0';

const {
	number,
	string,
	oneOf,
	arrayOf,
	oneOfType,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "chart primitives"]}
 *
 * Labels for axes.
 */
const AxisLabel = React.createClass({
	_lucidIsPrivate: true,

	propTypes: {
		/**
		 * Height of the margin this label should fit into.
		 */
		height: number,
		/**
		 * Width of the margin this label should fit into.
		 */
		width: number,
		/**
		 * Zero-based color. If there are multiple labels this will act like an
		 * offset.
		 */
		color: number,
		/**
		 * Contents of the label, should only ever be a string since we use a `text`
		 * under the hood. If you provide an array of strings we'll color them
		 * appropriately.
		 */
		label: oneOfType([string, arrayOf(string)]),
		/**
		 * Determine orientation of the label.
		 */
		orient: oneOf(['top', 'bottom', 'left', 'right']),
	},

	getDefaultProps() {
		return {
			color: 0,
		};
	},

	render() {
		const {
			height,
			width,
			orient,
			label,
			color,
			...passThroughs,
		} = this.props;

		const isH = orient === 'top' || orient === 'bottom';

		return (
			<text
				{...passThroughs}
				className={boundClassNames('&')}
				x={isH ? width / 2 : height / 2 * -1}
				y={orient === 'right' ? width : orient === 'bottom' ? height : 0}
				dy={orient === 'top' || orient === 'left' ? '1em' : '-.32em'}
				transform={isH ? '' : `rotate(-90)`}
			>
				{_.map([].concat(label), (str, i) => (
					<tspan
						key={i}
						className={boundClassNames(`&-color-${i + color % 6}`)}
					>
						{`${i === 0 ? '' : SPACER}${str}`}
					</tspan>
				))}
			</text>
		);
	}
});

export default AxisLabel;
