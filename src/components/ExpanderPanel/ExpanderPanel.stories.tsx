import _ from 'lodash';
import React from 'react';
import { Story, Meta } from '@storybook/react';

import ExpanderPanel, { IExpanderPanelProps } from './ExpanderPanel';

export default {
	title: 'Layout/ExpanderPanel',
	component: ExpanderPanel,
	parameters: {
		docs: {
			description: {
				component: ExpanderPanel.peek.description,
			},
		},
	},
	args: ExpanderPanel.defaultProps,
} as Meta;

/* Basic */
export const Basic: Story<IExpanderPanelProps> = (args) => {
	return (
		<ExpanderPanel {...args}>
			<ExpanderPanel.Header>Show More</ExpanderPanel.Header>
			{_.times(100, (n) => (
				<div key={n}>{_.repeat('-', 75 * Math.sin(n / 5))}</div>
			))}
		</ExpanderPanel>
	);
};

/* No Padding */
export const NoPadding: Story<IExpanderPanelProps> = (args) => {
	return (
		<ExpanderPanel {...args} hasPadding={false}>
			<ExpanderPanel.Header>Show More</ExpanderPanel.Header>
			{_.times(100, (n) => (
				<div key={n}>{_.repeat('-', 75 * Math.sin(n / 5))}</div>
			))}
		</ExpanderPanel>
	);
};

/* Basic With On Rest Callback */
export const BasicWithOnRestCallback: Story<IExpanderPanelProps> = (args) => {
	const onRest = () => {
		alert('A big ball of wibbly wobbly, timey wimey stuff');
	};

	return (
		<ExpanderPanel {...args} onRest={onRest}>
			<ExpanderPanel.Header>Show More</ExpanderPanel.Header>
			{_.times(100, (n) => (
				<div key={n}>{_.repeat('-', 75 * Math.sin(n / 5))}</div>
			))}
		</ExpanderPanel>
	);
};
