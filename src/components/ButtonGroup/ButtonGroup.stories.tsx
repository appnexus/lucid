import React from 'react';
import { Meta } from '@storybook/react';
import ButtonGroup, { ButtonGroupDumb } from './ButtonGroup';

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

export const Default = () => {
	const buttonStyle = { width: '100px' };
	return (
		<ButtonGroup selectedIndices={[1, 2]}>
			<ButtonGroup.Button style={buttonStyle}>Smol</ButtonGroup.Button>
			<ButtonGroup.Button style={buttonStyle}>Lonnnnnnnng</ButtonGroup.Button>
			<ButtonGroup.Button style={buttonStyle}>Medium</ButtonGroup.Button>
		</ButtonGroup>
	);
};

export const Stateful = () => {
	return (
		<ButtonGroup>
			<ButtonGroup.Button>Zero</ButtonGroup.Button>
			<ButtonGroup.Button>One</ButtonGroup.Button>
			<ButtonGroup.Button>Two</ButtonGroup.Button>
			<ButtonGroup.Button>Three</ButtonGroup.Button>
		</ButtonGroup>
	);
};

export const Stateless = () => {
	return (
		<ButtonGroup selectedIndices={[7, 8]}>
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
