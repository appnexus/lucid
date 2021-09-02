import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
	EligibilityLightIcon,
	IEligibilityLightIconProps,
} from './EligibilityLightIcon';

export default {
	title: 'Icons/Icons/EligibilityLightIcon',
	component: EligibilityLightIcon,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IEligibilityLightIconProps> = (args) => (
	<EligibilityLightIcon {...args} />
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
