import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import RadioGroup, { IRadioGroupProps } from './RadioGroup';
import SingleSelect from '../SingleSelect/SingleSelect';
import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';
import RadioButton from '../RadioButton/RadioButton';

export default {
	title: 'Controls/RadioGroup',
	component: RadioGroup,
	parameters: {
		docs: {
			description: {
				component: RadioGroup.peek.description,
			},
		},
	},
	args: RadioGroup.defaultProps,
	argTypes: {
		children: { control: false },
	},
} as Meta;

const style = {
	marginRight: '13px',
};

const radioButtonDefaultProps = RadioButton.defaultProps;
const singleSelectDefaultProps = SingleSelect.defaultProps;

export const Stateful: Story<IRadioGroupProps> = (args) => {
	return (
		<RadioGroup {...args} isDisabled={false}>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Alvin</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Simon</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Theodore</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);
};

export const OnSelect: Story<IRadioGroupProps> = (args) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleSelect = (idx) => {
		setSelectedIndex(idx);
	};

	return (
		<div>
			<RadioGroup
				{...args}
				isDisabled={false}
				onSelect={handleSelect}
				selectedIndex={selectedIndex}
			>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Alvin</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Simon</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Theodore</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>

			<pre>Selected Index: {selectedIndex}</pre>
		</div>
	);
};

export const OnSelectOnChild: Story<IRadioGroupProps> = (args) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleSelect = (index) => {
		setSelectedIndex(index);
	};

	const children = ['Alvin', 'Simon', 'Theodore'];

	return (
		<RadioGroup {...args} isDisabled={false} selectedIndex={selectedIndex}>
			{children.map((child, idx) => {
				return (
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						key={idx}
						style={style}
						onSelect={() => handleSelect(idx)}
					>
						<RadioGroup.Label>{child}</RadioGroup.Label>
					</RadioGroup.RadioButton>
				);
			})}
		</RadioGroup>
	);
};

export const NestedSelect: Story<IRadioGroupProps> = (args) => {
	const subSelection = {
		display: 'block',
		marginTop: '13px',
	};

	const [height, setHeight] = useState('');

	const handleSelectedTallSimon = () => {
		setHeight('Tall Simon');
	};

	const handleSelectedShortSimon = () => {
		setHeight('Short Simon');
	};

	return (
		<RadioGroup {...args}>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Alvin</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>
					Simon
					<RadioButtonLabeled
						{...radioButtonDefaultProps}
						isSelected={height === 'Tall Simon'}
						onSelect={handleSelectedTallSimon}
					>
						<RadioButtonLabeled.Label>Tall Simon</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
						{...radioButtonDefaultProps}
						isSelected={height === 'Short Simon'}
						onSelect={handleSelectedShortSimon}
					>
						<RadioButtonLabeled.Label>Short Simon</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
				</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>
					Theodore
					<SingleSelect {...singleSelectDefaultProps} style={subSelection}>
						<SingleSelect.Option>Tall Theo</SingleSelect.Option>
						<SingleSelect.Option>Short Theo</SingleSelect.Option>
						<SingleSelect.Option>Average height Theo</SingleSelect.Option>
					</SingleSelect>
				</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);
};

export const SelectedIndexAsProp: Story<IRadioGroupProps> = (args) => {
	return (
		<section>
			<RadioGroup
				{...args}
				name='name'
				selectedIndex={3}
				style={{
					display: 'inline-flex',
					flexDirection: 'column',
				}}
			>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Captain America</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Iron Man</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Thor</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Hulk</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Black Widow</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
					<RadioGroup.Label>Hawkeye</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		</section>
	);
};

export const SelectedIndexFromChild: Story<IRadioGroupProps> = (args) => {
	return (
		<RadioGroup
			{...args}
			name='name'
			selectedIndex={2}
			style={{
				display: 'inline-flex',
				flexDirection: 'column',
			}}
		>
			<RadioGroup.RadioButton
				{...radioButtonDefaultProps}
				isSelected={true}
				style={style}
			>
				<RadioGroup.Label>Leonardo</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton
				{...radioButtonDefaultProps}
				isSelected={true}
				style={style}
			>
				<RadioGroup.Label>Raphael</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton
				{...radioButtonDefaultProps}
				isSelected={true}
				style={style}
			>
				<RadioGroup.Label>Donatello</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Michelangelo</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Venus</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);
};

export const DefaultProps: Story<IRadioGroupProps> = (args) => {
	return (
		<RadioGroup {...args}>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Superman</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Batman</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Wonder Woman</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Aquaman</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...radioButtonDefaultProps} style={style}>
				<RadioGroup.Label>Robin</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);
};
