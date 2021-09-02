import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { CrownIcon } from './CrownIcon';

export default {
	title: 'Icons/Icons/CrownIcon',
	component: CrownIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <CrownIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
