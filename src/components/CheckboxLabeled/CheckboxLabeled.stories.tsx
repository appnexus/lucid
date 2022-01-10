import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import CheckboxLabeled, { ICheckboxLabeledProps } from './CheckboxLabeled';

export default {
	title: 'Controls/CheckboxLabeled',
	component: CheckboxLabeled,
	subcomponents: { 'CheckboxLabeled.Label': CheckboxLabeled.Label },
	parameters: {
		docs: {
			description: {
				component: CheckboxLabeled.peek.description,
			},
		},
	},
} as Meta;

const Template: Story<ICheckboxLabeledProps> = (args) => {
	const [selected, setSelected] = useState(args.isSelected || false);
	return (
		<CheckboxLabeled
			{...args}
			isSelected={selected}
			onSelect={() => setSelected(!selected)}
		/>
	);
};

export const Basic: Story<ICheckboxLabeledProps> = Template.bind({});
Basic.args = {
	title: 'Default',
	Label: 'Default',
};

export const Disabled: Story<ICheckboxLabeledProps> = Template.bind({});
Disabled.args = {
	title: 'Disabled',
	Label: 'Disabled',
	isDisabled: true,
};

export const Selected: Story<ICheckboxLabeledProps> = Template.bind({});
Selected.args = {
	title: 'Selected',
	Label: 'Selected',
	isSelected: true,
};

export const DisabledSelected: Story<ICheckboxLabeledProps> = Template.bind({});
DisabledSelected.args = {
	title: 'Disabled Selected',
	Label: 'Disabled Selected',
	isDisabled: true,
	isSelected: true,
};

export const LabelAsProp: Story<ICheckboxLabeledProps> = Template.bind({});
LabelAsProp.args = {
	Label: 'Label as prop',
	title: 'Label as prop',
};

export const HTMLElement: Story<ICheckboxLabeledProps> = Template.bind({});
HTMLElement.args = {
	Label: <span>HTML element</span>,
	title: 'HTML element',
};

export const TextInAnArray: Story<ICheckboxLabeledProps> = Template.bind({});
TextInAnArray.args = {
	Label: [
		'Text in an array',
		'Only the first value in the array is used',
		'The rest of these should be ignored',
	],
	title: 'Text in an array',
};

export const HTMLElementInAnArray: Story<ICheckboxLabeledProps> = Template.bind(
	{}
);
HTMLElementInAnArray.args = {
	Label: [
		<span key='1'>HTML element in an array</span>,
		<span key='2'>Again only the first value in the array is used</span>,
		<span key='3'>The rest should not be rendered</span>,
	] as any,
	title: 'HTML element in an array',
};

export const LabelAsChild: Story<ICheckboxLabeledProps> = (args) => {
	const [selected, setSelected] = useState(args.isSelected || false);

	return (
		<CheckboxLabeled
			{...args}
			isSelected={selected}
			onSelect={() => setSelected(!selected)}
		>
			<CheckboxLabeled.Label>
				<span>HTML element as Child</span>
			</CheckboxLabeled.Label>
		</CheckboxLabeled>
	);
};
LabelAsChild.args = {
	title: 'Label as Child',
};
