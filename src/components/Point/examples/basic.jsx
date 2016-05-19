import React from 'react';
import Point from '../Point';

const svgProps = {
	width: 20,
	height: 20,
};

const pointProps = {
	x: 10,
	y: 10,
};

export default React.createClass({
	render() {
		return (
			<div>
				<svg {...svgProps}>
					<Point {...pointProps} kind={1} color={1} />
				</svg>

				<svg {...svgProps}>
					<Point {...pointProps} kind={2} color={2} />
				</svg>

				<svg {...svgProps}>
					<Point {...pointProps} kind={3} color={3} />
				</svg>

				<svg {...svgProps}>
					<Point {...pointProps} kind={4} color={4} />
				</svg>

				<svg {...svgProps}>
					<Point {...pointProps} kind={5} color={5} />
				</svg>
			</div>
		);
	},
});
