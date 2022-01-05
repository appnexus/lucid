import _ from 'lodash';
import React from 'react';
import { Story, Meta } from '@storybook/react';

import * as chartConstants from '../../constants/charts';
import Bar, { IBarProps } from '../Bar/Bar';

export default {
	title: 'Visualizations/Bar',
	component: Bar,
	parameters: {
		docs: {
			description: {
				component: Bar.peek.description,
			},
		},
	},
} as Meta;

/* Custom Colors */
export const CustomColors: Story<IBarProps> = (args) => {
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

	return (
		<div>
			<svg {...svgProps}>
				<Bar {...args} {...pointProps} color='#f80' />
			</svg>

			<svg {...svgProps}>
				<Bar {...args} {...pointProps} color='#abc123' />
			</svg>
		</div>
	);
};
CustomColors.storyName = 'CustomColors';

/* Custom Dimension Units */
export const CustomDimensionUnits: Story<IBarProps> = (args) => {
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

	return (
		<div>
			<svg {...svgProps}>
				<Bar {...args} {...pointProps} color='#f80' />
			</svg>

			<svg {...svgProps}>
				<Bar {...args} {...pointProps} color='#abc123' />
			</svg>
		</div>
	);
};

/* Regular Colors */
export const RegularColors: Story<IBarProps> = (args) => {
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

	return (
		<div>
			{_.map(colors, (color) => (
				<svg key={color} {...svgProps}>
					<Bar {...args} {...barProps} color={color} />
				</svg>
			))}
		</div>
	);
};
