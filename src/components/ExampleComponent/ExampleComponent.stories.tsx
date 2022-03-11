import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ExampleComponent, IExampleComponentProps } from './ExampleComponent';

export default {
	title: 'Documentation/ExampleComponent',
	component: ExampleComponent,
	parameters: {
		docs: {
			description: {
				component: ExampleComponent.description,
			},
		},
	},
	argTypes: {
		children: {
			control: false,
		},
	},
} as Meta;

export const Basic: Story<IExampleComponentProps> = (args) => {
	return (
		<ExampleComponent {...args}>
			Feel free to play with this example component to see how to create your
			own.
		</ExampleComponent>
	);
};

export const PropExample: Story<IExampleComponentProps> = (args) => {
	return (
		<ExampleComponent {...args} isX={true}>
			Be sure to show consumers of your component examples of how each prop is
			implemented.
		</ExampleComponent>
	);
};
