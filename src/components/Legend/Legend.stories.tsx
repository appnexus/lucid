import _ from 'lodash';
import React from 'react';
import { Meta, Story } from '@storybook/react';

import * as chartConstants from '../../constants/charts';
import Legend, { ILegendProps } from './Legend';
import ToolTip from '../ToolTip/ToolTip';

export default {
	title: 'Visualizations/Legend',
	component: Legend,
	parameters: {
		docs: {
			description: {
				component: Legend.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<ILegendProps> = (args) => {
	const { Item } = Legend;

	return (
		<div>
			<Legend {...args}>
				{_.map(chartConstants.PALETTE_7, (color, i) => (
					<Item key={color} hasPoint color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend {...args}>
				{_.map(chartConstants.PALETTE_7, (color, i) => (
					<Item key={color} hasPoint pointKind={i} color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend {...args}>
				{_.map(chartConstants.PALETTE_7, (color, i) => (
					<Item key={color} hasLine color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend {...args}>
				{_.map(chartConstants.PALETTE_7, (color, i) => (
					<Item key={color} hasPoint hasLine pointKind={i} color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend {...args} isReversed>
				{_.map(chartConstants.PALETTE_7, (color, i) => (
					<Item key={color} hasPoint hasLine pointKind={i} color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend {...args} orient='horizontal'>
				<Item hasLine color={chartConstants.COLOR_GOOD}>
					Revenue
				</Item>
				<Item hasLine color={chartConstants.COLOR_BAD}>
					Loss
				</Item>
				<Item hasPoint color={chartConstants.COLOR_0}>
					Partner 0
				</Item>
				<Item hasPoint color={chartConstants.COLOR_1}>
					Partner 1
				</Item>
			</Legend>

			<br />

			<Legend {...args} orient='horizontal' isReversed>
				<Item hasLine color={chartConstants.COLOR_GOOD}>
					Revenue
				</Item>
				<Item hasLine color={chartConstants.COLOR_BAD}>
					Loss
				</Item>
				<Item hasPoint color={chartConstants.COLOR_0}>
					Partner 0
				</Item>
				<Item hasPoint color={chartConstants.COLOR_1}>
					Partner 1
				</Item>
			</Legend>

			<br />

			<Legend {...args}>
				<Item hasLine color={chartConstants.COLOR_GOOD}>
					Revenue
				</Item>
				<Item hasLine color={chartConstants.COLOR_BAD}>
					Loss
				</Item>
				<Item hasPoint color={chartConstants.COLOR_0}>
					Partner 0
				</Item>
				<Item hasPoint color={chartConstants.COLOR_1}>
					Partner 1
				</Item>
			</Legend>

			<br />
			<br />
			<br />

			<ToolTip
				isExpanded={true}
				direction='right'
				alignment='end'
				isLight={true}
			>
				<ToolTip.Target>Tooltip example</ToolTip.Target>

				<ToolTip.Body>
					<Legend {...args} hasBorders={false}>
						<Item hasLine color={chartConstants.COLOR_GOOD}>
							Revenue
						</Item>
						<Item hasLine color={chartConstants.COLOR_BAD}>
							Loss
						</Item>
						<Item hasPoint color={chartConstants.COLOR_0}>
							Partner 0
						</Item>
						<Item hasPoint color={chartConstants.COLOR_1}>
							Partner 1
						</Item>
					</Legend>
				</ToolTip.Body>
			</ToolTip>
		</div>
	);
};
