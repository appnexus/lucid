import React from 'react';
import Point from '../Point';

const svgProps = {
	width: 20,
	height: 20,
};

export default React.createClass({
	render() {
		return (
			<div>
				<svg {...svgProps}>
					<Point x={10} y={10} kind={1} />
				</svg>

				<svg {...svgProps}>
					<Point x={10} y={10} kind={2} />
				</svg>

				<svg {...svgProps}>
					<Point x={10} y={10} kind={3} />
				</svg>

				<svg {...svgProps}>
					<Point x={10} y={10} kind={4} />
				</svg>

				<svg {...svgProps}>
					<Point x={10} y={10} kind={5} />
				</svg>
			</div>
		);
	}
});
