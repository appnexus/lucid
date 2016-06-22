import React from 'react';
import Bar from '../Bar';

const svgProps = {
	width: 20,
	height: 100,
};

const pointProps = {
	x: 5,
	y: 0,
	width: 10,
	height: 100,
};

export default React.createClass({
	render() {
		return (
			<div>
				<svg {...svgProps}>
					<Bar {...pointProps} color='#f80' />
				</svg>

				<svg {...svgProps}>
					<Bar {...pointProps} color='#abc123' />
				</svg>
			</div>
		);
	},
});
