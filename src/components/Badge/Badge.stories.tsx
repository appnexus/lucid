import _ from 'lodash';
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Badge, IBadgeProps } from './Badge';

const kinds = [undefined, 'primary', 'success', 'danger'];
const types = [undefined, 'stroke'];

export default {
	title: 'Visual Design/Badge',
	component: Badge,
	parameters: {
		docs: {
			description: {
				component: Badge.peek.description,
			},
		},
	},
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IBadgeProps> = (args) => <Badge {...args}>Badge</Badge>;

//👇 Each story then reuses that template
export const Basic: Story<IBadgeProps> = Template.bind({});

export const AllTypes: Story<IBadgeProps> = (args) => (
	<div>
		{_.map(kinds, (kind, idx) => (
			<div key={`${kind}-${idx}`}>
				{_.map(types, (ty) => (
					<React.Fragment key={`${kind}-${ty}`}>
						<Badge
							{...args}
							style={{ marginBottom: '10px', marginRight: '10px' }}
							kind={kind as any}
							type={ty as any}
						>
							Badge
						</Badge>
					</React.Fragment>
				))}
			</div>
		))}
	</div>
);
