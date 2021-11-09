import React from 'react';
import createClass from 'create-react-class';
import { Axis, d3Scale, d3Time } from './../../index';

export default {
	title: 'Visualizations/Chart Primitives/Axis',
	component: Axis,
	parameters: {
		docs: {
			description: {
				component: (Axis as any).peek.description,
			},
		},
	},
};

/* Bottom */
export const Bottom = () => {
	const margin = { right: 40, left: 20, top: 40, bottom: 10 };
	const width = 500;
	const height = 100;
	const innerWidth = width - margin.right - margin.left;
	const x = d3Scale.scaleLinear().domain([0, 100000]).range([0, innerWidth]);

	const Component = createClass({
		render() {
			return (
				<svg width={width} height={height}>
					<g transform={`translate(${margin.left}, ${height / 2})`}>
						<Axis scale={x} orient='bottom' tickCount={6} />
					</g>
				</svg>
			);
		},
	});

	return <Component />;
};
Bottom.storyName = 'Bottom';

/* Top */
export const Top = () => {
	const margin = { right: 20, left: 20 };
	const width = 400;
	const height = 50;
	const innerWidth = width - margin.right - margin.left;
	const x = d3Scale.scaleLinear().domain([0, 100000]).range([0, innerWidth]);

	const Component = createClass({
		render() {
			return (
				<svg width={width} height={height}>
					<g transform={`translate(${margin.left}, ${height / 2})`}>
						<Axis
							scale={x}
							orient='top'
							textOrientation='horizontal'
							tickCount={6}
						/>
					</g>
				</svg>
			);
		},
	});

	return <Component />;
};
Top.storyName = 'Top';

/* Left */
export const Left = () => {
	const margin = { top: 10, bottom: 10 };
	const width = 50;
	const height = 200;
	const innerHeight = height - margin.top - margin.bottom;
	const y = d3Scale.scaleLinear().domain([0, 100000]).range([innerHeight, 0]);

	const Component = createClass({
		render() {
			return (
				<svg width={width} height={height}>
					<g transform={`translate(${width - 1}, ${margin.top})`}>
						<Axis scale={y} orient='left' />
					</g>
				</svg>
			);
		},
	});

	return <Component />;
};
Left.storyName = 'Left';

/* Right */
export const Right = () => {
	const margin = { top: 10, bottom: 10 };
	const width = 50;
	const height = 200;
	const innerHeight = height - margin.top - margin.bottom;
	const y = d3Scale.scaleLinear().domain([0, 50]).range([innerHeight, 0]);

	const Component = createClass({
		render() {
			return (
				<svg width={width} height={height}>
					<g transform={`translate(0, ${margin.top})`}>
						<Axis scale={y} orient='right' textOrientation='horizontal' />
					</g>
				</svg>
			);
		},
	});

	return <Component />;
};
Right.storyName = 'Right';

/* Time */
export const Time = () => {
	const margin = { right: 10, left: 30 };
	const width = 400;
	const height = 200;
	const innerWidth = width - margin.right - margin.left;

	const x: any = d3Scale
		.scaleTime()
		.domain([new Date('2015-01-01'), new Date('2017-02-01')])
		.range([0, innerWidth]);

	const Component = createClass({
		render() {
			return (
				<svg width={width} height={height}>
					<g transform={`translate(${margin.left}, 1)`}>
						<Axis orient='bottom' scale={x} />
					</g>

					<g transform={`translate(${margin.left}, ${(height / 3) * 1})`}>
						<Axis
							orient='bottom'
							scale={x}
							ticks={x.ticks(d3Time.timeMonth, 6)}
						/>
					</g>

					<g transform={`translate(${margin.left}, ${(height / 3) * 2})`}>
						<Axis
							orient='bottom'
							scale={x}
							ticks={x.ticks(d3Time.timeYear, 1)}
						/>
					</g>
				</svg>
			);
		},
	});

	return <Component />;
};
Time.storyName = 'Time';

/* Ordinal */
export const Ordinal = () => {
	const margin = { right: 20, left: 20 };
	const width = 400;
	const height = 40;
	const innerWidth = width - margin.right - margin.left;

	const x: any = d3Scale
		.scaleBand()
		.domain(['a', 'b', 'c', 'd'])
		.range([0, innerWidth]);

	const Component = createClass({
		render() {
			return (
				<svg width={width} height={height}>
					<g transform={`translate(${margin.left}, 1)`}>
						<Axis orient='bottom' scale={x} />
					</g>
				</svg>
			);
		},
	});

	return <Component />;
};
Ordinal.storyName = 'Ordinal';

/* Diagonal Text */
export const DiagonalText = () => {
	// individual margin values may need to be changed to
	// prevent or add extra padding depending on use of axis.
	const margin = { right: 40, left: 20, top: 40, bottom: 10 };
	const horizontalAxisWidth = 500;
	const horizontalAxisHeight = 100;
	const verticalAxisWidth = 100;
	const verticalAxisHeight = 200;
	const innerWidth = horizontalAxisWidth - margin.right - margin.left;
	const innerHeight = verticalAxisHeight - margin.top - margin.bottom;
	const x = d3Scale.scaleLinear().domain([0, 100000]).range([0, innerWidth]);
	const y = d3Scale.scaleLinear().domain([0, 100000]).range([innerHeight, 0]);

	const Component = createClass({
		render() {
			return (
				<div>
					<div>
						<p>top</p>
						<svg width={horizontalAxisWidth} height={horizontalAxisHeight}>
							<g
								transform={`translate(${margin.left}, ${
									horizontalAxisHeight / 2
								})`}
							>
								<Axis
									scale={x}
									orient='top'
									textOrientation='diagonal'
									tickCount={6}
								/>
							</g>
						</svg>
					</div>
					<div>
						<p>bottom</p>
						<svg width={horizontalAxisWidth} height={horizontalAxisHeight}>
							<g
								transform={`translate(${margin.left}, ${
									horizontalAxisHeight / 2
								})`}
							>
								<Axis
									scale={x}
									orient='bottom'
									textOrientation='diagonal'
									tickCount={6}
								/>
							</g>
						</svg>
					</div>
					<div>
						<p>right</p>
						<svg width={verticalAxisWidth} height={verticalAxisHeight}>
							<g transform={`translate(0, ${margin.top})`}>
								<Axis
									scale={y}
									orient='right'
									textOrientation='diagonal'
									tickCount={6}
								/>
							</g>
						</svg>
					</div>
					<div>
						<p>left</p>
						<svg width={verticalAxisWidth} height={verticalAxisHeight}>
							<g
								transform={`translate(${verticalAxisWidth - 1}, ${margin.top})`}
							>
								<Axis
									scale={y}
									orient='left'
									textOrientation='diagonal'
									tickCount={6}
								/>
							</g>
						</svg>
					</div>
				</div>
			);
		},
	});

	return <Component />;
};
DiagonalText.storyName = 'DiagonalText';
