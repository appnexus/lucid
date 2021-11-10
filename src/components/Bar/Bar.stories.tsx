import React from 'react';
import createClass from 'create-react-class';
import { Bar, chartConstants } from './../../index';
import _ from 'lodash';

export default {
	title: 'Visualizations/Bar',
	component: Bar,
	parameters: {
		docs: {
			description: {
				component: (Bar as any).peek.description,
			},
		},
	},
};

/* Custom Colors */
export const CustomColors = () => {
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

	const Component = createClass({
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

	return <Component />;
};
CustomColors.storyName = 'CustomColors';

/* Custom Dimension Units */
export const CustomDimensionUnits = () => {
	const svgProps = {
		width: 20,
		height: 100,
	};

	const pointProps = {
		x: 5,
		y: 0,
		width: '10%',
		height: '100%',
	};

	const Component = createClass({
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

	return <Component />;
};
CustomDimensionUnits.storyName = 'CustomDimensionUnits';

/* Regular Colors */
export const RegularColors = () => {
	const svgProps = {
		width: 20,
		height: 100,
	};

	const barProps = {
		x: 5,
		y: 0,
		width: 10,
		height: 100,
	};

	const colors = [
		chartConstants.COLOR_0_LIGHTEST,
		chartConstants.COLOR_0_LIGHT,
		chartConstants.COLOR_0,
		chartConstants.COLOR_0_DARK,
		chartConstants.COLOR_0_DARKEST,
		chartConstants.COLOR_1_LIGHTEST,
		chartConstants.COLOR_1_LIGHT,
		chartConstants.COLOR_1,
		chartConstants.COLOR_1_DARK,
		chartConstants.COLOR_1_DARKEST,
		chartConstants.COLOR_2_LIGHTEST,
		chartConstants.COLOR_2_LIGHT,
		chartConstants.COLOR_2,
		chartConstants.COLOR_2_DARK,
		chartConstants.COLOR_2_DARKEST,
		chartConstants.COLOR_3_LIGHTEST,
		chartConstants.COLOR_3_LIGHT,
		chartConstants.COLOR_3,
		chartConstants.COLOR_3_DARK,
		chartConstants.COLOR_3_DARKEST,
		chartConstants.COLOR_4_LIGHTEST,
		chartConstants.COLOR_4_LIGHT,
		chartConstants.COLOR_4,
		chartConstants.COLOR_4_DARK,
		chartConstants.COLOR_4_DARKEST,
		chartConstants.COLOR_5_LIGHTEST,
		chartConstants.COLOR_5_LIGHT,
		chartConstants.COLOR_5,
		chartConstants.COLOR_5_DARK,
		chartConstants.COLOR_5_DARKEST,
		chartConstants.COLOR_6_LIGHTEST,
		chartConstants.COLOR_6_LIGHT,
		chartConstants.COLOR_6,
		chartConstants.COLOR_6_DARK,
		chartConstants.COLOR_6_DARKEST,
		chartConstants.COLOR_GOOD_LIGHT,
		chartConstants.COLOR_GOOD,
		chartConstants.COLOR_GOOD_DARK,
		chartConstants.COLOR_BAD_LIGHT,
		chartConstants.COLOR_BAD,
		chartConstants.COLOR_BAD_DARK,
		chartConstants.COLOR_NEUTRAL,
	];

	const Component = createClass({
		render() {
			return (
				<div>
					{_.map(colors, (color) => (
						<svg key={color} {...svgProps}>
							<Bar {...barProps} color={color} />
						</svg>
					))}
				</div>
			);
		},
	});

	return <Component />;
};
RegularColors.storyName = 'RegularColors';
