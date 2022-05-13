import React from 'react';
import Resizer, { IResizerProps } from './Resizer';
import { Meta, Story } from '@storybook/react';

export default {
	title: 'Utility/Resizer',
	component: Resizer,
	parameters: {
		docs: {
			description: {
				component: Resizer.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<IResizerProps> = (args) => {
	return (
		<Resizer>
			{(width, height) => (
				<div>
					<div>Width: {width}</div>
					<div>Height: {height}</div>
				</div>
			)}
		</Resizer>
	);
};

/* With Flex */
export const WithFlex: Story<IResizerProps> = (args) => {
	return (
		<section
			style={{
				display: 'flex',
			}}
		>
			<div>Other content</div>

			<Resizer
				style={{
					flexGrow: 1,
					overflow: 'hidden',
				}}
			>
				{(width) => (
					<div
						style={{
							width,
							height: width * 0.3,
							border: '1px solid black',
						}}
					>
						<div>
							When using Resizer within a flexed container, its critical to add{' '}
							<code>flexGrow: 1, overflow: 'hidden'</code> to its styles so it
							will behave correctly.
						</div>
						<div>Width: {width}</div>
						<div>Height: {width * 0.3}</div>
					</div>
				)}
			</Resizer>
		</section>
	);
};
