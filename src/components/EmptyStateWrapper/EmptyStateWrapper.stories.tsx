import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
	EmptyStateWrapper,
	IEmptyStateWrapperProps,
} from './EmptyStateWrapper';

export default {
	title: 'Utility/EmptyStateWrapper',
	component: EmptyStateWrapper,
	parameters: {
		docs: {
			description: {
				component: EmptyStateWrapper.peek.description,
			},
		},
	},
	argTypes: {
		children: {
			control: false,
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<IEmptyStateWrapperProps> = (args) => {
	return <EmptyStateWrapper {...args} />;
};
Basic.args = {
	Title: 'Empty State Wrapper',
	isEmpty: true,
	isLoading: false,
	anchorMessage: false,
};

/* isLoading */
export const IsLoading: Story<IEmptyStateWrapperProps> = (args) => {
	return <EmptyStateWrapper {...args} />;
};
IsLoading.args = {
	isEmpty: false,
	isLoading: true,
	anchorMessage: false,
};

/* YouHaveNoData */
export const YouHaveNoData: Story<IEmptyStateWrapperProps> = (args) => {
	return <EmptyStateWrapper {...args} />;
};
YouHaveNoData.args = {
	isEmpty: true,
	isLoading: false,
	anchorMessage: false,
};
