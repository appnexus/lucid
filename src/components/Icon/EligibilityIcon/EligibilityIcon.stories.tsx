import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EligibilityIcon, IEligibilityIconProps } from './EligibilityIcon';

export default {
	title: 'Icons/Icons/EligibilityIcon',
	component: EligibilityIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IEligibilityIconProps> = (args) => (
	<EligibilityIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
