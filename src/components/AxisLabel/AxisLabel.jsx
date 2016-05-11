import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-AxisLabel');

const {
	number,
	string,
	oneOf,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "chart primitives"]}
 *
 * Labels for axes.
 */
const AxisLabel = createClass({
	displayName: 'AxisLabel',

	statics: {
		_lucidIsPrivate: true,
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Height of the margin this label should fit into.
		 */
		height: number,
		/**
		 * Width of the margin this label should fit into.
		 */
		width: number,
		/**
		 * Zero-based color, defaults to -1 which is black.
		 */
		color: number,
		/**
		 * Contents of the label, should only ever be a string since we use a `text`
		 * under the hood.
		 */
		label: string,
		/**
		 * Determine orientation of the label.
		 */
		orient: oneOf(['top', 'bottom', 'left', 'right']),
	},

	getDefaultProps() {
		return {
			color: -1,
		};
	},

	render() {
		const {
			height,
			width,
			orient,
			label,
			color,
			className,
			...passThroughs,
		} = this.props;

		const isH = orient === 'top' || orient === 'bottom';

		return (
			<text
				{...passThroughs}
				className={cx(className, '&', `&-color-${color % 6}`)}
				x={isH ? width / 2 : height / 2 * -1}
				y={orient === 'right' ? width : orient === 'bottom' ? height : 0}
				dy={orient === 'top' || orient === 'left' ? '1em' : '-.32em'}
				transform={isH ? '' : `rotate(-90)`}
			>
				{label}
			</text>
		);
	}
});

export default AxisLabel;
