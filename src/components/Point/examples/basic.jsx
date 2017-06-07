import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Point, chartConstants } from '../../../index';

const svgProps = {
	width: 20,
	height: 20,
};

const pointProps = {
	x: 10,
	y: 10,
};

export default createClass({
	render() {
		return (
			<div>
				{_.map(chartConstants.PALETTE_6, (color, i) => (
					<svg key={i} {...svgProps}>
						<Point {...pointProps} kind={i} color={color} />
					</svg>
				))}
			</div>
		);
	},
});
