import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Point, chartConstants } from '../../../index';

const svgProps = {
	width: 40,
	height: 40,
	style: {
		backgroundColor: 'black',
	},
};

const pointProps = {
	x: 20,
	y: 20,
	scale: 2,
	hasStroke: true,
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
