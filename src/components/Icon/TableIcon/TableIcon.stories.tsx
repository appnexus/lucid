import React from 'react';
import { Story, Meta } from '@storybook/react';
import { IIconProps } from '../Icon';
import { TableIcon } from './TableIcon';

export default {
	title: 'Icons/Icons/TableIcon',
	component: TableIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IIconProps> = (args) => <TableIcon {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
