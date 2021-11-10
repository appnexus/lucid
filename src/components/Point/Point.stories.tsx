import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Point, chartConstants } from './../../index';

export default {
	title: 'Visualizations/Point',
	component: Point,
	parameters: {
		docs: {
			description: {
				component: (Point as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const svgProps = {
		width: 20,
		height: 20,
	};

	const pointProps = {
		x: 10,
		y: 10,
	};

	const Component = createClass({
		render() {
			return (
				<div>
					{_.map(chartConstants.PALETTE_7, (color, i) => (
						<svg key={i} {...svgProps}>
							<Point {...pointProps} kind={i} color={color} />
						</svg>
					))}
				</div>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Big With Stroke */
export const BigWithStroke = () => {
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

	const Component = createClass({
		render() {
			return (
				<div>
					{_.map(chartConstants.PALETTE_7, (color, i) => (
						<svg key={i} {...svgProps}>
							<Point {...pointProps} kind={i} color={color} />
						</svg>
					))}
				</div>
			);
		},
	});

	return <Component />;
};
BigWithStroke.storyName = 'BigWithStroke';
