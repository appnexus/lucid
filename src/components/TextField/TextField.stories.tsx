import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import TextField, { ITextFieldProps } from './TextField';
import Button from '../Button/Button';

export default {
	title: 'Controls/TextField',
	component: TextField,
	parameters: {
		docs: {
			description: {
				component: TextField.peek.description,
			},
		},
	},
} as Meta;

const style = {
	marginBottom: '10px',
};

export const Basic: Story<ITextFieldProps> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div>
			<TextField
				{...args}
				style={style}
				placeholder='default'
				value={value}
				onChange={(value) => setValue(value)}
			/>
		</div>
	);
};

export const Plain: Story<ITextFieldProps> = (args) => {
	return (
		<div>
			<TextField
				{...args}
				style={style}
				placeholder='Plain Textfield example'
			/>
			<TextField
				{...args}
				isMultiLine
				rows={5}
				style={style}
				placeholder='Plain Textfield multiline example'
			/>
		</div>
	);
};

export const OnSubmit: Story<ITextFieldProps> = (args) => {
	const [value, setValue] = useState('Enter some text in and hit enter');

	return (
		<div>
			<TextField
				{...args}
				style={style}
				value={value}
				onSubmit={(value) => setValue(value)}
			/>
			<div style={{ marginTop: '10px', marginLeft: '10px' }}>
				state.value: {value}
			</div>
		</div>
	);
};

export const Debounced: Story<ITextFieldProps> = (args) => {
	const [value, setValue] = useState('foo');

	return (
		<div>
			<TextField
				{...args}
				style={style}
				value={value}
				onChangeDebounced={(value) => setValue(value)}
			/>
			<div style={{ marginBottom: '10px', marginLeft: '10px' }}>
				state.value: {value}
			</div>
			<Button
				{...Button.defaultProps}
				onClick={() => {
					setValue('foo');
				}}
			>
				Set TextField to "foo"
			</Button>
		</div>
	);
};

export const Multiline: Story<ITextFieldProps> = (args) => {
	const [value, setValue] = useState('');

	return (
		<div>
			<TextField
				{...args}
				placeholder='default'
				style={style}
				value={value}
				onChange={(value) => setValue(value)}
			/>
			<TextField
				{...args}
				isMultiLine
				placeholder='isMultiline'
				style={style}
				value={value}
				onChange={(value) => setValue(value)}
			/>
			<div style={{ marginBottom: '10px', marginLeft: '10px' }}>
				state.value: {value}
			</div>
			<Button
				{...Button.defaultProps}
				onClick={() => {
					setValue('foo');
				}}
			>
				Set TextField to "foo"
			</Button>
		</div>
	);
};

export const Disabled: Story<ITextFieldProps> = (args) => {
	const [value, setValue] = useState('foo');

	return (
		<div>
			<TextField
				{...args}
				placeholder='disabled'
				isDisabled
				style={style}
				value={value}
				onChange={(value) => setValue(value)}
			/>
		</div>
	);
};
