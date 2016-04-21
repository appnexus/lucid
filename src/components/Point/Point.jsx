import _ from 'lodash';
// import d3 from 'd3-scale';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Scatter');

const {
	func,
	array,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "charts", "plot"]}
 *
 * Scatter plot
 */
const Scatter = React.createClass({
	propTypes: {
		data: array,
		/**
		 * A D3 scale with preconfigured domain and range.
		 */
		xScale: func.isRequired,
		/**
		 * A D3 scale with preconfigured domain and range.
		 */
		yScale: func.isRequired,
	},

	getDefaultProps() { },

	render() {
		const {
			data,
		} = this.props;

		<g className={boundClassNames('&')}>
			{_.map(data, (d) =>
				<circle />
			)}
		</g>
	}
});

export default Scatter;
