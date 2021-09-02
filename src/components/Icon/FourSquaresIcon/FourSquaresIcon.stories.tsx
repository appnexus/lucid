import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { FourSquaresIcon } from './FourSquaresIcon';

export default {
	title: 'Icons/Icons/FourSquaresIcon',
	component: FourSquaresIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <FourSquaresIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
