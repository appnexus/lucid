import _ from 'lodash';
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Switch, { ISwitchProps } from './Switch';

export default {
	title: 'Controls/Switch',
	component: Switch,
	parameters: {
		docs: {
			description: {
				component: (Switch as any).peek.description,
			},
		},
	},
	args: Switch.defaultProps,
} as Meta;

export const Basic: Story<ISwitchProps> = (args) => {
	const [selected, setSelected] = useState(true);

	const handleSelect = () => {
		setSelected(!selected);
	};

	return <Switch {...args} onSelect={handleSelect} isSelected={selected} />;
};

export const Selected: Story<ISwitchProps> = (args) => (
	<Switch {...args} title='Selected' isSelected={true} />
);

export const Disabled: Story<ISwitchProps> = (args) => (
	<Switch {...args} title='Disabled' isDisabled={true} />
);

export const DisabledSelected: Story<ISwitchProps> = (args) => (
	<Switch
		{...args}
		title='Disabled and Selected'
		isSelected={true}
		isDisabled={true}
	/>
);

export const IncludeExclude: Story<ISwitchProps> = (args) => (
	<Switch {...args} title='Include/Exclude' isIncludeExclude={true} />
);

export const SelectedIncludeExclude: Story<ISwitchProps> = (args) => (
	<Switch
		{...args}
		title='Selected Include/Exclude'
		isIncludeExclude={true}
		isSelected={true}
	/>
);

export const DisabledIncludeExclude: Story<ISwitchProps> = (args) => (
	<Switch
		{...args}
		title='Disabled Include/Exclude'
		isIncludeExclude={true}
		isDisabled={true}
	/>
);

export const SelectedDisabledIncludeExclude: Story<ISwitchProps> = (args) => (
	<Switch
		{...args}
		title='Selected and Disabled Include/Exclude'
		isIncludeExclude={true}
		isSelected={true}
		isDisabled={true}
	/>
);
