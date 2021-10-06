import _ from 'lodash';
import React from 'react';
import { Badge } from './Badge';

const kinds = [undefined, 'primary', 'success', 'danger'];
const types = [undefined, 'stroke'];

export default {
	title: 'visual design/Badge',
	component: Badge,
	parameters: {
		notes: Badge.peek.description,
		docs: {
			inlineStories: true,
		},
	},
};

export const Default = (args) => <Badge {...args}>Badge</Badge>;

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
