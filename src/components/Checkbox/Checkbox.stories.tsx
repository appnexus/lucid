import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import Checkbox from './Checkbox';

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

const Template: any = (args) => {
	const [selected, setSelected] = useState(args.isSelected || false);
	return (
		<Checkbox
			{...args}
			isSelected={selected}
			onSelect={() => setSelected(!selected)}
		/>
	);
};

export const Default = Template.bind({});
Default.args = {
	title: 'Default',
};

export const Plain = Template.bind({});
Plain.args = {
	title: 'Plain',
	isDisabled: false,
	isSelected: true,
};

export const DisabledUnselected = Template.bind({});
DisabledUnselected.args = {
	title: 'Disabled Unselected',
	isDisabled: true,
	isSelected: false,
};

export const DisabledSelected = Template.bind({});
DisabledSelected.args = {
	title: 'Disabled Selected',
	isDisabled: true,
	isSelected: true,
};

export const DisabledIndeterminate = Template.bind({});
DisabledIndeterminate.args = {
	title: 'Disabled Selected',
	isIndeterminate: true,
	isDisabled: true,
};
