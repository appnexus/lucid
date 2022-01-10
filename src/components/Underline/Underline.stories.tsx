import React from 'react';
import { Meta, Story } from '@storybook/react';

import Underline, { IUnderlineProps } from './Underline';

export default {
	title: 'Controls/Underline',
	component: Underline,
	parameters: {
		docs: {
			description: {
				component: Underline.peek.description,
			},
		},
	},
} as Meta;

/* With Defaults */
export const WithDefaults: Story<IUnderlineProps> = (args) => {
	return <Underline {...args}>foo bar baz</Underline>;
};

/* With Regex Match */
export const WithRegexMatch: Story<IUnderlineProps> = (args) => {
	return (
		<Underline {...args} match={/foo?/i}>
			foo bar baz
		</Underline>
	);
};

/* With String Match */
export const WithStringMatch: Story<IUnderlineProps> = (args) => {
	return (
		<Underline {...args} match='bar'>
			foo bar baz
		</Underline>
	);
};
