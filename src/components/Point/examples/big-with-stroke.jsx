import _ from 'lodash';
import React from 'react';
import Point from '../Point';
import * as chartConstants from '../../../constants/charts';

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

export default React.createClass({
	render() {
		return (
			<div>
				{_.map(chartConstants.PALETTE_6, (color, i) =>
					<svg key={i} {...svgProps}>
						<Point {...pointProps} kind={i} color={color} />
					</svg>
				)}
			</div>
		);
	},
});
