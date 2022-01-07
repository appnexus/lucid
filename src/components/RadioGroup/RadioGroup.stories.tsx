import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import RadioGroup, { IRadioGroupProps } from './RadioGroup';
import SingleSelect from '../SingleSelect/SingleSelect';
import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';

export default {
	title: 'Controls/RadioGroup',
	component: RadioGroup,
	parameters: {
		docs: {
			description: {
				component: (RadioGroup as any).peek.description,
			},
		},
	},
	argTypes: {
		children: { control: false },
	},
} as Meta;

/* Stateful */
export const Stateful: Story<IRadioGroupProps> = (args) => {
	const style = {
		marginRight: '13px',
	};

	return (
		<RadioGroup {...args} isDisabled={false}>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Alvin</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Simon</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Theodore</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);
};
Stateful.storyName = 'Stateful';

/* Nested Select */
export const NestedSelect: Story<IRadioGroupProps> = (args) => {
	const style = {
		marginRight: '15px',
	};

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
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Alvin</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>
					Simon
					<RadioButtonLabeled
						isSelected={height === 'Tall Simon'}
						onSelect={handleSelectedTallSimon}
					>
						<RadioButtonLabeled.Label>Tall Simon</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
						isSelected={height === 'Short Simon'}
						onSelect={handleSelectedShortSimon}
					>
						<RadioButtonLabeled.Label>Short Simon</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
				</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>
					Theodore
					<SingleSelect style={subSelection}>
						<SingleSelect.Option>Tall Theo</SingleSelect.Option>
						<SingleSelect.Option>Short Theo</SingleSelect.Option>
						<SingleSelect.Option>Average height Theo</SingleSelect.Option>
					</SingleSelect>
				</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);

	// begin-hide-from-docs
	const notes = `You can nest items in the \`RadioGroup\` for sub-selections. Please work with a designer to style and define states for sub-selections.`;
	// end-hide-from-docs
};
NestedSelect.storyName = 'Nested Select';

/* Selected Index As Prop */
export const SelectedIndexAsProp: Story<IRadioGroupProps> = (args) => {
	const style = {
		marginRight: '13px',
	};

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
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Captain America</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Iron Man</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Thor</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Hulk</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Black Widow</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Hawkeye</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		</section>
	);
};
SelectedIndexAsProp.storyName = 'Selected Index As Prop';

/* Selected Index From Child */
export const SelectedIndexFromChild: Story<IRadioGroupProps> = (args) => {
	const style = {
		marginRight: '13px',
	};

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
			<RadioGroup.RadioButton isSelected={true} style={style}>
				<RadioGroup.Label>Leonardo</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton isSelected={true} style={style}>
				<RadioGroup.Label>Raphael</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton isSelected={true} style={style}>
				<RadioGroup.Label>Donatello</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Michelangelo</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Venus</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);
};
SelectedIndexFromChild.storyName = 'Selected Index From Child';

/* Default Props */
export const DefaultProps: Story<IRadioGroupProps> = (args) => {
	const style = {
		marginRight: '13px',
	};

	return (
		<RadioGroup {...args}>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Superman</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Batman</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Wonder Woman</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Aquaman</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton style={style}>
				<RadioGroup.Label>Robin</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);
};
DefaultProps.storyName = 'Default Props';
