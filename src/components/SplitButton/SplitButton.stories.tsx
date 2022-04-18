import React from 'react';
import { Meta, Story } from '@storybook/react';

import SplitButton, { ISplitButtonProps } from './SplitButton';

export default {
	title: 'Controls/SplitButton',
	component: SplitButton,
	parameters: {
		docs: {
			description: {
				component: SplitButton.peek.description,
			},
		},
	},
	args: SplitButton.defaultProps,
} as Meta;

/* Basic */
export const Basic: Story<ISplitButtonProps> = (args) => {
	const style = { marginRight: '20px', height: 100 };

	return (
		<section>
			<SplitButton {...args} style={style}>
				<SplitButton.Button>Basic</SplitButton.Button>
				<SplitButton.Button>One</SplitButton.Button>
				<SplitButton.Button>Two</SplitButton.Button>
			</SplitButton>

			<SplitButton {...args} kind='primary' style={style}>
				<SplitButton.Button>Primary</SplitButton.Button>
				<SplitButton.Button>One</SplitButton.Button>
				<SplitButton.Button>Two</SplitButton.Button>
			</SplitButton>
		</section>
	);
};

/* Disabled */
export const Disabled: Story<ISplitButtonProps> = (args) => {
	return (
		<section style={{ height: 100 }}>
			<SplitButton {...args}>
				<SplitButton.Button isDisabled>Save</SplitButton.Button>
				<SplitButton.Button isDisabled>
					This action should be disabled
				</SplitButton.Button>
				<SplitButton.Button>This one should be enabled</SplitButton.Button>
				<SplitButton.Button isDisabled>
					This should be disabled, too
				</SplitButton.Button>
			</SplitButton>
		</section>
	);
};

/* Up */
export const Up: Story<ISplitButtonProps> = (args) => {
	return (
		<section style={{ height: 100 }}>
			<SplitButton {...args} direction='up' kind='primary'>
				<SplitButton.Button>Save</SplitButton.Button>
				<SplitButton.Button>Action 01</SplitButton.Button>
				<SplitButton.Button>Here's Another Action</SplitButton.Button>
				<SplitButton.Button>And Another Action</SplitButton.Button>
			</SplitButton>
		</section>
	);
};

/* Sizes */
export const Sizes: Story<ISplitButtonProps> = (args) => {
	const style = { marginRight: '20px', height: 100 };

	return (
		<section>
			<SplitButton {...args} size='large' style={style}>
				<SplitButton.Button>Large</SplitButton.Button>
				<SplitButton.Button>One</SplitButton.Button>
				<SplitButton.Button>Two</SplitButton.Button>
			</SplitButton>
			<SplitButton {...args} size='small' style={style}>
				<SplitButton.Button>Small</SplitButton.Button>
				<SplitButton.Button>One</SplitButton.Button>
				<SplitButton.Button>Two</SplitButton.Button>
			</SplitButton>
			<SplitButton {...args} size='short' style={style}>
				<SplitButton.Button>Short</SplitButton.Button>
				<SplitButton.Button>One</SplitButton.Button>
				<SplitButton.Button>Two</SplitButton.Button>
			</SplitButton>
		</section>
	);
};
