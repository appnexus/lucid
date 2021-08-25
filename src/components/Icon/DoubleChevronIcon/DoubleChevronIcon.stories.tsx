import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconWithDirectionProps } from '../../../util/component-types';
import { DoubleChevronIcon } from './DoubleChevronIcon';

export default {
	title: 'Icons/Icons/DoubleChevronIcon',
	component: DoubleChevronIcon,
	argTypes: {
		direction: {
			name: 'direction',
			description: 'direction variations of the icon',
			defaultValue: 'down',
			options: ['up', 'down', 'left', 'right'],
			control: { type: 'radio' },
			table: {
				category: 'Orientation',
				defaultValue: { summary: 'down' },
			},
		},
		height: {
			name: 'height',
			description: 'adjust the height of the icon',
			defaultValue: 16,
			control: { type: 'range' },
			table: {
				category: 'Transformation',
				defaultValue: { summary: '16px' },
			},
		},
		width: {
			name: 'width',
			description: 'adjust the width of the icon',
			defaultValue: 16,
			control: { type: 'range' },
			table: {
				category: 'Transformation',
				defaultValue: { summary: '16px' },
			},
		},
		isClickable: {
			name: 'isClickable',
			description: 'control the ability to click the icon',
			defaultValue: false,
			control: { type: 'boolean' },
			table: {
				category: 'Controls',
				defaultValue: { summary: false },
			},
		},
		isDisabled: {
			name: 'isDisabled',
			description: 'control the ability to diable the icon',
			defaultValue: false,
			control: { type: 'boolean' },
			table: {
				category: 'Controls',
				defaultValue: { summary: false },
			},
		},
	},
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconWithDirectionProps> = (args) => (
	<DoubleChevronIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
