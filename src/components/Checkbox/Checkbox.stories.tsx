import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Checkbox, { ICheckboxProps } from './Checkbox';

export default {
	title: 'Controls/Checkbox',
	component: Checkbox,
	parameters: {
		docs: {
			description: {
				component: Checkbox.peek.description,
			},
		},
	},
} as Meta;

const Template: Story<ICheckboxProps> = (args) => {
	const [selected, setSelected] = useState(args.isSelected || false);
	return (
		<Checkbox
			{...args}
			isSelected={selected}
			onSelect={() => setSelected(!selected)}
		/>
	);
};

export const Basic: Story<ICheckboxProps> = Template.bind({});
Basic.args = {
	title: 'Default',
};

export const Plain: Story<ICheckboxProps> = Template.bind({});
Plain.args = {
	title: 'Plain',
	isDisabled: false,
	isSelected: true,
};

export const DisabledUnselected: Story<ICheckboxProps> = Template.bind({});
DisabledUnselected.args = {
	title: 'Disabled Unselected',
	isDisabled: true,
	isSelected: false,
};

export const DisabledSelected: Story<ICheckboxProps> = Template.bind({});
DisabledSelected.args = {
	title: 'Disabled Selected',
	isDisabled: true,
	isSelected: true,
};

export const DisabledIndeterminate: Story<ICheckboxProps> = Template.bind({});
DisabledIndeterminate.args = {
	title: 'Disabled Selected',
	isIndeterminate: true,
	isDisabled: true,
};
