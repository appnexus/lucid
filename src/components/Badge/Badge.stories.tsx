import _ from 'lodash';
import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Badge, IBadgeProps } from './Badge';

const kinds = [undefined, 'primary', 'success', 'danger'];
const types = [undefined, 'stroke'];

export default {
	title: 'visual design/Badge',
	component: Badge,
	parameters: {
		docs: {
			description: {
				component: Badge.description,
			},
		},
	},
} as Meta;

//👇 We create a default story for the component
export const Default: Story<IBadgeProps> = (args) => (
	<Badge {...args}>Badge</Badge>
);

/** All Types */
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
