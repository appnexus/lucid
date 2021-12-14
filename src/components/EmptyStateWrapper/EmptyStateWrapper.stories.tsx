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

/* Default */
export const Default: Story<IEmptyStateWrapperProps> = (args) => {
	return <EmptyStateWrapper {...args} />;
};
Default.args = {
	Title: 'Empty State Wrapper',
	isEmpty: true,
	isLoading: false,
	anchorMessage: false,
};
Default.storyName = 'Default';

/* isLoading */
export const IsLoading: Story<IEmptyStateWrapperProps> = (args) => {
	return <EmptyStateWrapper {...args} />;
};
IsLoading.args = {
	isEmpty: false,
	isLoading: true,
	anchorMessage: false,
};
IsLoading.storyName = 'Is Loading';

/* YouHaveNoData */
export const YouHaveNoData: Story<IEmptyStateWrapperProps> = (args) => {
	return <EmptyStateWrapper {...args} />;
};
YouHaveNoData.args = {
	isEmpty: true,
	isLoading: false,
	anchorMessage: false,
};
YouHaveNoData.storyName = 'You Have No Data';
