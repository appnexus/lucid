import React from 'react';
import { Story, Meta } from '@storybook/react';

import * as chartConstants from '../../constants/charts';
import Line, { ILineProps } from './Line';

export default {
	title: 'Visualizations/Line',
	component: Line,
	parameters: {
		docs: {
			description: {
				component: Line.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<ILineProps> = (args) => {
	return (
		<div>
			<svg width={200} height={120}>
				<Line {...args} color={chartConstants.COLOR_0} d='M0,0 L120,120' />
				<Line {...args} color={chartConstants.COLOR_1} d='M0,20 L120,100' />
				<Line {...args} color={chartConstants.COLOR_2} d='M0,40 L120,80' />
				<Line {...args} color={chartConstants.COLOR_3} d='M0,60 L120,60' />
				<Line {...args} color={chartConstants.COLOR_4} d='M0,80 L120,40' />
				<Line {...args} color={chartConstants.COLOR_5} d='M0,100 L120,20' />
				<Line {...args} color={chartConstants.COLOR_6} d='M0,120 L120,0' />
			</svg>

			<svg width={200} height={120}>
				<Line
					{...args}
					isDotted
					color={chartConstants.COLOR_0}
					d='M0,0 L120,120'
				/>
				<Line
					{...args}
					isDotted
					color={chartConstants.COLOR_1}
					d='M0,20 L120,100'
				/>
				<Line
					{...args}
					isDotted
					color={chartConstants.COLOR_2}
					d='M0,40 L120,80'
				/>
				<Line
					{...args}
					isDotted
					color={chartConstants.COLOR_3}
					d='M0,60 L120,60'
				/>
				<Line
					{...args}
					isDotted
					color={chartConstants.COLOR_4}
					d='M0,80 L120,40'
				/>
				<Line
					{...args}
					isDotted
					color={chartConstants.COLOR_5}
					d='M0,100 L120,20'
				/>
				<Line
					{...args}
					isDotted
					color={chartConstants.COLOR_6}
					d='M0,120 L120,0'
				/>
			</svg>
		</div>
	);
};
