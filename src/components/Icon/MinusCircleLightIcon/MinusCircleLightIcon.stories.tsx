import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
	MinusCircleLightIcon,
	IMinusCircleLightIconProps,
} from './MinusCircleLightIcon';

export default {
	title: 'Icons/Icons/MinusCircleLightIcon',
	component: MinusCircleLightIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IMinusCircleLightIconProps> = (args) => (
	<MinusCircleLightIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
