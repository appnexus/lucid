import _ from 'lodash';
import React from 'react';
import { Badge, IBadgeProps } from './Badge';
import { Story, Meta } from '@storybook/react';

const kinds = [undefined, 'primary', 'success', 'danger'];
const types = [undefined, 'stroke'];

export default {
	title: 'Visual Design/Badge',
	component: Badge,
	parameters: {
		docs: {
			description: {
				component: Badge.description,
			},
		},
	},
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<IBadgeProps> = (args) => <Badge {...args}>Badge</Badge>;

//👇 Each story then reuses that template
export const Default = Template.bind({});

export const AllTypes = () => (
	<div>
		{_.map(kinds, (kind) => (
			<div key={kind}>
				{_.map(types, (ty) => (
					<React.Fragment key={`${kind}-${ty}`}>
						<Badge
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
