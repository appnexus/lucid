import React from 'react';
import { Meta, Story } from '@storybook/react';

import ButtonGroup, { ButtonGroupDumb, IButtonGroupProps } from './ButtonGroup';

export default {
	title: 'Controls/ButtonGroup',
	component: ButtonGroupDumb,
	subcomponents: { 'ButtonGroup.Button': ButtonGroup.Button },
	parameters: {
		docs: {
			inlineStories: false,
			description: {
				component: ButtonGroup.peek.description,
			},
		},
	},
} as Meta;

/** Default */
export const Default: Story<IButtonGroupProps> = (args) => {
	const buttonStyle = { width: '100px' };
	return (
		<ButtonGroup {...args} selectedIndices={[1, 2]}>
			<ButtonGroup.Button style={buttonStyle}>Smol</ButtonGroup.Button>
			<ButtonGroup.Button style={buttonStyle}>Lonnnnnnnng</ButtonGroup.Button>
			<ButtonGroup.Button style={buttonStyle}>Medium</ButtonGroup.Button>
		</ButtonGroup>
	);
};

/** Stateful */
export const Stateful: Story<IButtonGroupProps> = (args) => {
	return (
		<ButtonGroup {...args}>
			<ButtonGroup.Button>Zero</ButtonGroup.Button>
			<ButtonGroup.Button>One</ButtonGroup.Button>
			<ButtonGroup.Button>Two</ButtonGroup.Button>
			<ButtonGroup.Button>Three</ButtonGroup.Button>
		</ButtonGroup>
	);
};

/** Stateless */
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

/** Disabled */
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

/** On Click */
export const OnClick: Story<IButtonGroupProps> = (args) => {
	return (
		<ButtonGroup {...args}>
			<ButtonGroup.Button onClick={() => alert('zero')}>
				Zero
			</ButtonGroup.Button>
			<ButtonGroup.Button onClick={() => alert('one')}>One</ButtonGroup.Button>
		</ButtonGroup>
	);
};
