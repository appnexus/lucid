import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import CheckboxLabeled from './CheckboxLabeled';

export default {
	title: 'Controls/CheckboxLabeled',
	component: CheckboxLabeled,
	subcomponents: { 'CheckboxLabeled.Label': CheckboxLabeled.Label },
	parameters: {
		notes: CheckboxLabeled.peek.description,
	},
} as Meta;

const Template: any = (args) => {
	const [selected, setSelected] = useState(args.isSelected || false);
	return (
		<CheckboxLabeled
			{...args}
			isSelected={selected}
			onSelect={() => setSelected(!selected)}
		/>
	);
};

export const Default = Template.bind({});
Default.args = {
	title: 'Default',
	Label: 'Default',
};

export const Disabled = Template.bind({});
Disabled.args = {
	title: 'Disabled',
	Label: 'Disabled',
	isDisabled: true,
};

export const Selected = Template.bind({});
Selected.args = {
	title: 'Selected',
	Label: 'Selected',
	isSelected: true,
};

export const DisabledSelected = Template.bind({});
DisabledSelected.args = {
	title: 'Disabled Selected',
	Label: 'Disabled Selected',
	isDisabled: true,
	isSelected: true,
};

export const LabelAsProp = Template.bind({});
LabelAsProp.args = {
	Label: 'Label as prop',
	title: 'Label as prop',
};

export const HTMLElement = Template.bind({});
HTMLElement.args = {
	Label: <span>HTML element</span>,
	title: 'HTML element',
};

export const TextInAnArray = Template.bind({});
TextInAnArray.args = {
	Label: [
		'Text in an array',
		'Only the first value in the array is used',
		'The rest of these should be ignored',
	],
	title: 'Text in an array',
};

export const HTMLElementInAnArray = Template.bind({});
HTMLElementInAnArray.args = {
	Label: [
		<span key='1'>HTML element in an array</span>,
		<span key='2'>Again only the first value in the array is used</span>,
		<span key='3'>The rest should not be rendered</span>,
	],
	title: 'HTML element in an array',
};

export const LabelAsChild = (args) => {
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
