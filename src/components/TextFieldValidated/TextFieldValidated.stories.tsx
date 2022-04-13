import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import TextFieldValidated, {
	ITextFieldValidatedProps,
} from './TextFieldValidated';

export default {
	title: 'Controls/TextFieldValidated',
	component: TextFieldValidated,
	parameters: {
		docs: {
			description: {
				component: TextFieldValidated.peek.description,
			},
		},
	},
} as Meta;

const style = {
	marginBottom: '10px',
};

export const Basic: Story<ITextFieldValidatedProps> = (args) => {
	return <TextFieldValidated {...args} />;
};

export const Debounced: Story<ITextFieldValidatedProps> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={(value) => setValue(value)}
				Error={value === 'foo' ? null : 'Please enter "foo"'}
			/>
		</div>
	);
};

export const ErrorTypes: Story<ITextFieldValidatedProps> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={'This is an error'}
			/>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={null}
				Info={'This is an info'}
			/>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={null}
				Success={{
					message: 'This is a Success',
				}}
			/>
			<TextFieldValidated
				{...args}
				style={style}
				value={value}
				onChangeDebounced={() => {}}
				Error={null}
				Success={{
					message: 'This is a disappearing Success',
					disappearing: true,
				}}
			/>
		</div>
	);
};
