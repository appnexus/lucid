import { Meta, Story } from '@storybook/react';
import _ from 'lodash';
import React from 'react';

import Button from '../Button/Button';
import ToolTip, { IToolTipProps } from '../ToolTip/ToolTip';

const { Target, Body } = ToolTip;

export default {
	title: 'communication/ToolTip',
	component: ToolTip,
	parameters: {
		docs: {
			description: {
				component: ToolTip.peek.description,
			},
		},
	},
	argTypes: {
		isCloseable: { type: { required: false }, control: { type: 'boolean' } },
		isLight: { control: { type: 'boolean' } },
		onClose: { control: false },
		onMouseOver: { control: false },
		onMouseOut: { control: false },
		flyOutMaxWidth: { default: { value: '200px' }, control: { type: 'text' } },
		direction: { options: ['down', 'up', 'right', 'left'] },
		alignment: { options: ['start', 'center', 'end'] },
		isExpanded: { control: { type: 'boolean' } },
		portalId: { control: { type: 'text' } },
		Body: { control: false },
		Title: { control: false },
		Target: { control: false },
		children: { control: false },
		className: {
			control: { type: 'object' },
			table: {
				category: 'Uncommon Props',
			},
		},
		style: {
			control: { type: 'object' },
			table: {
				category: 'Uncommon Props',
			},
		},
		flyOutStyle: {
			control: { type: 'object' },
			table: {
				category: 'Uncommon Props',
			},
		},
	},
} as Meta;

export const Default: Story<IToolTipProps> = (args) => {
	return (
		<section
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ToolTip {...args}>
				<Body>
					ToolTip is a utility component to create a transient message anchored
					to another component.
				</Body>
				<Target>
					<div>Example Target</div>
				</Target>
			</ToolTip>
		</section>
	);
};

type Direction = 'right' | 'up' | 'down' | 'left';
type Alignment = 'start' | 'center' | 'end';

const directions: Direction[] = ['right', 'up', 'down', 'left'];
const alignments: Alignment[] = ['start', 'center', 'end'];

export const DirectionAndAlignmentVariants: Story<IToolTipProps> = (args) => {
	return (
		<section style={{ display: 'flex', flexDirection: 'row' }}>
			{_.map(directions, (direction) => (
				<section
					key={direction}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						flexGrow: 1,
					}}
				>
					{_.map(alignments, (alignment) => (
						<section
							key={`${direction}${alignment}`}
							style={{ margin: '30px' }}
						>
							<ToolTip direction={direction} alignment={alignment}>
								<Body>
									ToolTip: is a utility component to create a transient message
									anchored to another component. My direction is "{direction}".
									My alignment is "{alignment}".
								</Body>
								<Target>
									<div>
										Target {direction} {alignment}
									</div>
								</Target>
							</ToolTip>
						</section>
					))}
				</section>
			))}
		</section>
	);
};

export const ToolTipWithButton: Story<IToolTipProps> = (args) => {
	return (
		<section
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ToolTip {...args}>
				<Body>
					ToolTip is a utility component to create a transient message anchored
					to another component.
					<Button kind='primary'>View Results</Button>
				</Body>
				<Target>
					<div>Example Target</div>
				</Target>
			</ToolTip>
		</section>
	);
};
