import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import RadioButtonLabeled, {
	IRadioButtonLabeledProps,
} from './RadioButtonLabeled';

export default {
	title: 'Controls/RadioButtonLabeled',
	component: RadioButtonLabeled,
	parameters: {
		docs: {
			description: {
				component: RadioButtonLabeled.peek.description,
			},
		},
	},
	args: RadioButtonLabeled.defaultProps,
} as Meta;

/* Basic */
export const Basic: Story<IRadioButtonLabeledProps> = (args) => {
	const style = {
		marginBottom: '3px',
	};

	const [flavor, setFlavor] = useState('vanilla');

	const handleSelectedFlavor = (flavor: string) => {
		setFlavor(flavor);
	};

	return (
		<section>
			<span
				style={{
					display: 'inline-flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<RadioButtonLabeled
					{...args}
					isSelected={flavor === 'vanilla'}
					name='interactive-radio-buttons'
					onSelect={() => handleSelectedFlavor('vanilla')}
					style={style}
				>
					<RadioButtonLabeled.Label>Vanilla</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
				<RadioButtonLabeled
					{...args}
					isSelected={flavor === 'chocolate'}
					name='interactive-radio-buttons'
					onSelect={() => handleSelectedFlavor('chocolate')}
					style={style}
				>
					<RadioButtonLabeled.Label>Chocolate</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
				<RadioButtonLabeled
					{...args}
					isSelected={flavor === 'strawberry'}
					name='interactive-radio-buttons'
					onSelect={() => handleSelectedFlavor('strawberry')}
					style={style}
				>
					<RadioButtonLabeled.Label>Strawberry</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
				<RadioButtonLabeled
					{...args}
					isSelected={flavor === 'saltedCaramel'}
					name='interactive-radio-buttons'
					onSelect={() => handleSelectedFlavor('saltedCaramel')}
					style={style}
				>
					<RadioButtonLabeled.Label>Salted caramel</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
				<RadioButtonLabeled
					{...args}
					isSelected={flavor === 'mintChip'}
					name='interactive-radio-buttons'
					onSelect={() => handleSelectedFlavor('mintChip')}
					style={style}
				>
					<RadioButtonLabeled.Label>
						Mint chocolate chip (the best)
					</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
			</span>
		</section>
	);
};

/* States */
export const States: Story<IRadioButtonLabeledProps> = (args) => {
	const style = {
		marginBottom: '3px',
		marginRight: '13px',
	};

	return (
		<section>
			<RadioButtonLabeled {...args} style={style}>
				<RadioButtonLabeled.Label>(default props)</RadioButtonLabeled.Label>
			</RadioButtonLabeled>

			<section style={{ display: 'flex' }}>
				<RadioButtonLabeled {...args} isDisabled={true} style={style}>
					<RadioButtonLabeled.Label>Disabled</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
				<RadioButtonLabeled {...args} isSelected={true} style={style}>
					<RadioButtonLabeled.Label>Selected</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
				<RadioButtonLabeled
					{...args}
					isDisabled={true}
					isSelected={true}
					style={style}
				>
					<RadioButtonLabeled.Label>
						Disabled and Selected
					</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
			</section>
		</section>
	);
};

/* Label As Child */
export const LabelAsChild: Story<IRadioButtonLabeledProps> = (args) => {
	const style = {
		marginBottom: '3px',
	};
	return (
		<section>
			<RadioButtonLabeled {...args} style={style}>
				<RadioButtonLabeled.Label>Just text</RadioButtonLabeled.Label>
			</RadioButtonLabeled>
			<RadioButtonLabeled {...args} style={style}>
				<RadioButtonLabeled.Label>
					<span>HTML element</span>
				</RadioButtonLabeled.Label>
			</RadioButtonLabeled>
		</section>
	);
};

/* Label As Prop */
export const LabelAsProp: Story<IRadioButtonLabeledProps> = (args) => {
	const style = {
		marginBottom: '3px',
	};

	return (
		<section>
			<RadioButtonLabeled Label='Just text' style={style}></RadioButtonLabeled>
			<RadioButtonLabeled
				Label={<span>HTML element</span>}
				style={style}
			></RadioButtonLabeled>
			<RadioButtonLabeled
				Label={
					[
						'Text in an array',
						'Only the first value in the array is used',
						'The rest of these should be ignored',
					] as any
				}
				style={style}
			></RadioButtonLabeled>
			<RadioButtonLabeled
				Label={
					[
						<span key='1'>HTML element in an array</span>,
						<span key='2'>
							Again only the first value in the array is used
						</span>,
						<span key='3'>The rest should not be rendered</span>,
					] as any
				}
				style={style}
			></RadioButtonLabeled>
		</section>
	);
};
