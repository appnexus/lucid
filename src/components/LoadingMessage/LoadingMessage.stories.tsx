import _ from 'lodash';
import React from 'react';
import { Story, Meta } from '@storybook/react';

import LoadingMessage, { ILoadingMessageProps } from './LoadingMessage';

export default {
	title: 'Loading Message/LoadingMessage',
	component: LoadingMessage,
	parameters: {
		docs: {
			description: {
				component: LoadingMessage.peek.description,
			},
		},
		layout: 'centered',
	},
} as Meta;

export const Basic: Story<ILoadingMessageProps> = (args) => {
	return <LoadingMessage />;
};

export const CustomTitle: Story<ILoadingMessageProps> = (args) => {
	return <LoadingMessage {...args} />;
};
CustomTitle.args = {
	Title: 'A custom title',
};

export const CustomBody: Story<ILoadingMessageProps> = (args) => {
	return <LoadingMessage {...args} />;
};
CustomBody.args = {
	Body: 'A custom body',
};
