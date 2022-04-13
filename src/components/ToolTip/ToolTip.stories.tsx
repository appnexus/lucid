import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';

import Button from '../Button/Button';
import ToolTip, { IToolTipProps, ToolTipDumb } from './ToolTip';

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
		isCloseable: {
			type: { required: false } as any,
			control: { type: 'boolean' },
		},
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
	args: ToolTip.defaultProps,
} as Meta;

export const Basic: Story<IToolTipProps> = (args) => {
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
							<ToolTip {...args} direction={direction} alignment={alignment}>
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

/* Interactive */
export const Interactive: Story<IToolTipProps> = (args) => {
	const { Target, Title, Body } = ToolTip;

	type Direction = 'right' | 'up' | 'down' | 'left';
	type Alignment = 'start' | 'center' | 'end';

	const directions: Direction[] = ['right', 'up', 'down', 'left'];
	const alignments: Alignment[] = ['start', 'center', 'end'];

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
							<ToolTip {...args} direction={direction} alignment={alignment}>
								<Title>
									Title: {direction} {alignment}
								</Title>
								<Body>
									ToolTip is a utility component to create a transient message
									anchored to another component. My direction is "{direction}
									". My alignment is "{alignment}".
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

/* Variants */
export const Variants: Story<IToolTipProps> = ({ ...args }) => {
	const { Target, Title, Body } = ToolTipDumb;

	const Component = createClass({
		getInitialState: () => ({ isExpanded: true }),
		render() {
			return (
				<section
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<section
						style={{
							marginTop: 150,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						<div style={{ marginTop: 60, marginBottom: 60 }}>
							<ToolTipDumb {...args} isExpanded={this.state.isExpanded}>
								<Body>
									ToolTip is a utility component to create a transient message
									anchored to another component.
								</Body>
								<Target>
									<div>No Title or Close Button</div>
								</Target>
							</ToolTipDumb>
						</div>

						<div style={{ marginTop: 60, marginBottom: 60 }}>
							<ToolTipDumb
								isCloseable
								onClose={() => this.setState({ isExpanded: false })}
								isExpanded={this.state.isExpanded}
							>
								<Body>
									ToolTip is a utility component to create a transient message
									anchored to another component.
								</Body>
								<Target>
									<div>With Close Button</div>
								</Target>
							</ToolTipDumb>
						</div>

						<div style={{ marginTop: 60, marginBottom: 60 }}>
							<ToolTipDumb
								isCloseable
								onClose={() => this.setState({ isExpanded: false })}
								isExpanded={this.state.isExpanded}
							>
								<Title>Title</Title>
								<Body>
									ToolTip is a utility component to create a transient message
									anchored to another component.
								</Body>
								<Target>
									<div>With Title and Close Button</div>
								</Target>
							</ToolTipDumb>
						</div>
					</section>

					<section
						style={{
							marginTop: 150,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						<div style={{ marginTop: 60, marginBottom: 60 }}>
							<ToolTipDumb isLight isExpanded={this.state.isExpanded}>
								<Body>
									ToolTip is a utility component to create a transient message
									anchored to another component.
								</Body>
								<Target>
									<div>No Title or Close Button</div>
								</Target>
							</ToolTipDumb>
						</div>

						<div style={{ marginTop: 60, marginBottom: 60 }}>
							<ToolTipDumb
								isLight
								isCloseable
								onClose={() => this.setState({ isExpanded: false })}
								isExpanded={this.state.isExpanded}
							>
								<Body>
									ToolTip is a utility component to create a transient message
									anchored to another component.
								</Body>
								<Target>
									<div>With Close Button</div>
								</Target>
							</ToolTipDumb>
						</div>

						<div style={{ marginTop: 60, marginBottom: 60 }}>
							<ToolTipDumb
								isLight
								isCloseable
								onClose={() => this.setState({ isExpanded: false })}
								isExpanded={this.state.isExpanded}
							>
								<Title>Title</Title>
								<Body>
									ToolTip is a utility component to create a transient message
									anchored to another component.
								</Body>
								<Target>
									<div>With Title and Close Button</div>
								</Target>
							</ToolTipDumb>
						</div>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};

/* Unchanging */
export const Unchanging: Story<IToolTipProps> = (args) => {
	const { Target, Title, Body } = ToolTipDumb;

	return (
		<section
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{_.map(['right', 'up', 'down', 'left'], (direction) =>
				_.map(['start', 'center', 'end'], (alignment) => (
					<section key={`${direction}${alignment}`} style={{ margin: '90px' }}>
						<ToolTipDumb
							{...args}
							direction={direction as any}
							alignment={alignment as any}
							isExpanded={true}
						>
							<Title>
								Title: {direction} {alignment}
							</Title>
							<Body>
								ToolTip is a utility component to create a transient message
								anchored to another component. My direction is "{direction}
								". My alignment is "{alignment}".
							</Body>
							<Target>
								<div>
									Target {direction} {alignment}
								</div>
							</Target>
						</ToolTipDumb>
					</section>
				))
			)}
		</section>
	);
};
