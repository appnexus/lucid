import _ from 'lodash';
import React from 'react';
import { Meta } from '@storybook/react';

import CheckIcon from '../Icon/CheckIcon/CheckIcon';
import { Button } from './Button';

const kinds = [undefined, 'primary', 'link', 'danger', 'invisible'];
const sizes = [undefined, 'small', 'short', 'large'];

export default {
	title: 'Controls/Button',
	component: Button,
	parameters: {
		docs: {
			description: {
				component: Button.peek.description,
			},
			inlineStories: true,
		},
	},
} as Meta;

export const Basic = (args) => <Button {...args}>Button</Button>;

export const AllTypes = () => (
	<div
		style={{
			display: 'grid',
			gridGap: '10px',
			gridTemplateColumns: `repeat(${kinds.length}, auto)`,
			justifyItems: 'start',
			alignItems: 'center',
			gridAutoFlow: 'column',
		}}
	>
		{_.map(sizes, (size, sizeIndex) =>
			_.map(kinds, (kind) => (
				<React.Fragment key={`${size}-${kind}`}>
					<Button
						style={{ gridColumn: sizeIndex + 1 }}
						size={size as any}
						kind={kind as any}
					>
						{size ? size : 'standard'} {kind}
					</Button>
					<Button
						style={{ gridColumn: sizeIndex + 1 }}
						size={size as any}
						kind={kind as any}
					>
						<CheckIcon />
						{size ? size : 'standard'} {kind}
					</Button>
					<Button
						isDisabled
						style={{ gridColumn: sizeIndex + 1 }}
						size={size as any}
						kind={kind as any}
					>
						<CheckIcon />
						disabled {size ? size : 'standard'} {kind}
					</Button>
					<Button
						style={{ gridColumn: sizeIndex + 1 }}
						size={size as any}
						kind={kind as any}
						hasOnlyIcon={true}
					>
						<CheckIcon />
					</Button>
				</React.Fragment>
			))
		)}
	</div>
);
