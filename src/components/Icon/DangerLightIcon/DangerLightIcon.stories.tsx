import React from 'react';
import { DangerLightIcon, IDangerLightIconProps } from './DangerLightIcon';
import { Story, Meta } from '@storybook/react';

export default {
	title: 'Deprecated/DangerLightIcon',
	component: DangerLightIcon,
	parameters: {
		docs: {
			description: {
				component: DangerLightIcon.peek.description,
			},
		},
	},
	args: DangerLightIcon.defaultProps,
} as Meta;

/* Basic */
export const Basic: Story<IDangerLightIconProps> = (args) => {
	return (
		<section>
			<div style={{ margin: 10 }}>
				<DangerLightIcon {...args} />
				<br />
			</div>
			<div style={{ margin: 10 }}>
				<DangerLightIcon {...args} isClickable />
				<br />
			</div>
			<div style={{ margin: 10 }}>
				<DangerLightIcon {...args} isDisabled />
				<br />
			</div>
		</section>
	);
};
