import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { UnlinkedIcon } from './UnlinkedIcon';

export default {
	title: 'Icons/Icons/UnlinkedIcon',
	component: UnlinkedIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <UnlinkedIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
