import React from 'react';
import { Story, Meta } from '@storybook/react';

import Icon, { IIconProps } from './Icon';

export default {
	title: 'Visual Design/Icon',
	component: Icon,
	parameters: {
		docs: {
			description: {
				component: Icon.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<IIconProps> = (args) => {
	return (
		<Icon {...args}>
			<path d='M13.234,2.43 L13.402,2.766 L15.831,7.625 L15.967,7.896 L15.831,8.168 L13.13,13.57 L12.587,13.298 L8,11.005 L2.87,13.57 L0.033,7.896 L0.169,7.625 L2.598,2.766 L2.766,2.43 L13.234,2.43 z M12.483,3.645 L3.517,3.645 L1.391,7.896 L3.413,11.94 L7.728,9.782 L8,9.646 L12.587,11.94 L14.609,7.896 L12.483,3.645 z' />
			<path d='M5.571,8 C4.9,8 4.356,7.456 4.356,6.785 C4.356,6.114 4.9,5.571 5.571,5.571 C6.241,5.571 6.785,6.114 6.785,6.785 C6.785,7.456 6.241,8 5.571,8 z' />
			<path d='M10.429,8 C9.759,8 9.215,7.456 9.215,6.785 C9.215,6.114 9.759,5.571 10.429,5.571 C11.1,5.571 11.644,6.114 11.644,6.785 C11.644,7.456 11.1,8 10.429,8 z' />
		</Icon>
	);
};
