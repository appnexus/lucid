import React from 'react';
import { ExampleComponent, IExampleComponentProps } from './ExampleComponent';
import { Story, Meta } from '@storybook/react';

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

/* Default */
export const Default: Story<IExampleComponentProps> = (args) => {
	return (
		<ExampleComponent {...args}>
			Feel free to play with this example component to see how to create your
			own.
		</ExampleComponent>
	);
};
Default.storyName = 'Default';

/* Prop Example */
export const PropExample = (args) => {
	return (
		<ExampleComponent {...args} isX={true}>
			Be sure to show consumers of your component examples of how each prop is
			implemented.
		</ExampleComponent>
	);
};
PropExample.storyName = 'PropExample';
