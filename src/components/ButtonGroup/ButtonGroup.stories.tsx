import React, { useState } from 'react';
import _ from 'lodash';
import { Meta, Story } from '@storybook/react';

import ButtonGroup, { IButtonGroupProps } from './ButtonGroup';

export default {
	title: 'Controls/ButtonGroup',
	component: ButtonGroup,
	subcomponents: { 'ButtonGroup.Button': ButtonGroup.Button },
	args: ButtonGroup.defaultProps,
	parameters: {
		docs: {
			inlineStories: false,
			description: {
				component: ButtonGroup.peek.description,
			},
		},
	},
} as Meta;

export const Basic: Story<IButtonGroupProps> = (args) => {
	const buttonStyle = { width: '100px' };
	return (
		<ButtonGroup {...args}>
			<ButtonGroup.Button style={buttonStyle}>Smol</ButtonGroup.Button>
			<ButtonGroup.Button style={buttonStyle}>Lonnnnnnnng</ButtonGroup.Button>
			<ButtonGroup.Button style={buttonStyle}>Medium</ButtonGroup.Button>
		</ButtonGroup>
	);
};

export const Stateful: Story<IButtonGroupProps> = (args) => {
	const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

	const handleSelect = (selectedIndex: number, { event, props }) => {
		const currentIndices = selectedIndices;
		// If the item does not exist in the original array add it, if it exists remove it.
		setSelectedIndices(_.xor(currentIndices, [selectedIndex]));
	};

	return (
		<ButtonGroup
			{...args}
			selectedIndices={selectedIndices}
			onSelect={handleSelect}
		>
			<ButtonGroup.Button>Zero</ButtonGroup.Button>
			<ButtonGroup.Button>One</ButtonGroup.Button>
			<ButtonGroup.Button>Two</ButtonGroup.Button>
			<ButtonGroup.Button>Three</ButtonGroup.Button>
		</ButtonGroup>
	);
};

export const Stateless: Story<IButtonGroupProps> = (args) => {
	return (
		<ButtonGroup {...args} selectedIndices={[7, 8]}>
			<ButtonGroup.Button>Zero</ButtonGroup.Button>
			<ButtonGroup.Button>One</ButtonGroup.Button>
			<ButtonGroup.Button>Two</ButtonGroup.Button>
			<ButtonGroup.Button>Three</ButtonGroup.Button>
			<ButtonGroup.Button>Four</ButtonGroup.Button>
			<ButtonGroup.Button isDisabled={true}>Five</ButtonGroup.Button>
			<ButtonGroup.Button>Six</ButtonGroup.Button>
			<ButtonGroup.Button>Seven</ButtonGroup.Button>
			<ButtonGroup.Button>Eight</ButtonGroup.Button>
			<ButtonGroup.Button>Nine</ButtonGroup.Button>
		</ButtonGroup>
	);
};

export const Disabled: Story<IButtonGroupProps> = (args) => {
	const buttonStyle = { width: '100px' };
	return (
		<ButtonGroup {...args}>
			<ButtonGroup.Button style={buttonStyle}>Zero</ButtonGroup.Button>
			<ButtonGroup.Button isDisabled={true} style={buttonStyle}>
				One
			</ButtonGroup.Button>
			<ButtonGroup.Button style={buttonStyle}>Two</ButtonGroup.Button>
			<ButtonGroup.Button style={buttonStyle}>Three</ButtonGroup.Button>
		</ButtonGroup>
	);
};

export const OnClick: Story<IButtonGroupProps> = (args) => {
	const handleClick = (label) => {
		alert(label);
	};

	return (
		<ButtonGroup {...args}>
			<ButtonGroup.Button onClick={() => handleClick('Zero')}>
				Zero
			</ButtonGroup.Button>
			<ButtonGroup.Button onClick={() => handleClick('One')}>
				One
			</ButtonGroup.Button>
		</ButtonGroup>
	);
};
