import _ from 'lodash';
import React, { useState } from 'react';
import createClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';

import RadioButton, { IRadioButtonProps } from './RadioButton';

export default {
	title: 'Controls/RadioButton',
	component: RadioButton,
	parameters: {
		docs: {
			description: {
				component: (RadioButton as any).peek.description,
			},
		},
	},
} as Meta;

/* Interactive */
export const Interactive: Story<IRadioButtonProps> = (args) => {
	const style = {
		listStyleType: 'none',
		display: 'flex',
		alignItems: 'center',
	};

	const [selected, setSelected] = useState(false);

	const handleSelected = (value) => {
		setSelected(!value);
	};

	return (
		<ul>
			<li style={style}>
				<label>Enabled</label>
				<RadioButton
					{...args}
					isSelected={selected}
					name='interactive-radio-buttons'
					onSelect={() => handleSelected(selected)}
					tabIndex={20}
				/>
			</li>
		</ul>
	);
};

/* States */
export const States: Story<IRadioButtonProps> = (args) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
	};

	const Component = createClass({
		render() {
			return (
				<ul>
					<li style={style}>
						<label>Unselected</label>
						<RadioButton {...args} tabIndex={20} />
					</li>
					<li style={style}>
						<label>Selected</label>
						<RadioButton {...args} isSelected={true} tabIndex={21} />
					</li>
					<li style={style}>
						<label>Disabled</label>
						<RadioButton {...args} isDisabled={true} tabIndex={22} />
					</li>
					<li style={style}>
						<label>Disabled & selected</label>
						<RadioButton
							{...args}
							isDisabled={true}
							isSelected={true}
							tabIndex={23}
						/>
					</li>
				</ul>
			);
		},
	});

	return <Component />;
};
