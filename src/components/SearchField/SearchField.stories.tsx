import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Button from '../Button/Button';
import {
	ISearchFieldProps,
	SearchFieldDumb as SearchField,
} from './SearchField';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';

export default {
	title: 'Controls/SearchField',
	component: SearchField,
	parameters: {
		docs: {
			description: {
				component: SearchField.peek.description,
			},
		},
	},
} as Meta;

export const Basic: Story<ISearchFieldProps> = (args) => {
	return <SearchField {...args} />;
};

export const Interactive: Story<ISearchFieldProps> = (args) => {
	const [state, setState] = useState('');

	return (
		<div>
			<SearchField {...args} onSubmit={(value) => setState(value)} />
			<div style={{ marginTop: '10px', marginLeft: '10px' }}>
				Hit "enter" to submit: {state}
			</div>
		</div>
	);
};

export const Placeholder: Story<ISearchFieldProps> = (args) => {
	return <SearchField {...args} placeholder='Name/ID' />;
};

export const Disabled: Story<ISearchFieldProps> = (args) => {
	return <SearchField {...args} isDisabled />;
};

export const CustomIcon: Story<ISearchFieldProps> = (args) => {
	return (
		<SearchField {...args}>
			<SearchField.Icon>
				<LoadingIcon />
			</SearchField.Icon>
		</SearchField>
	);
};

export const CustomTextField: Story<ISearchFieldProps> = (args) => {
	const [state, setState] = useState({
		value: '',
		submission: '',
		lastValue: '',
	});

	const [key, setKey] = useState('');

	return (
		<div>
			<SearchField {...args} placeholder='Name/ID'>
				<SearchField.TextField
					value={state.value}
					onSubmit={(submission) => setState({ ...state, submission })}
					onChange={(value) => setState({ ...state, value })}
					onKeyDown={({ event: { key } }) => setKey(key)}
					onBlur={(lastValue) => setState({ ...state, lastValue })}
				/>
			</SearchField>
			<div style={{ marginTop: '10px', marginLeft: '10px' }}>
				<div>Hit "enter" to submit: {state.submission}</div>
				<div>Last keydown: {key}</div>
				<div>Value on blur: {state.lastValue}</div>
			</div>
		</div>
	);
};

export const ValidSearch: Story<ISearchFieldProps> = (args) => {
	const [state, setState] = useState({
		value: '',
		submission: '',
		lastValue: '',
	});

	return (
		<SearchField
			{...args}
			placeholder="Search icon doesn't become active until you type at least three characters ----->"
			isValid={state.value.length > 2}
			value={state.value}
			onSubmit={(submission) => setState({ ...state, submission })}
			onChange={(value) => setState({ ...state, value })}
		/>
	);
};

export const Props: Story<ISearchFieldProps> = (args) => {
	return (
		<div>
			<SearchField {...args} value='foo' />
			<SearchField {...args} placeholder='bar' />
			<SearchField {...args} isDisabled />
			<SearchField {...args} isValid={false} />
			<SearchField {...args}>
				<SearchField.Icon>
					<LoadingIcon />
				</SearchField.Icon>
			</SearchField>
			<SearchField {...args} value='foo'>
				<SearchField.Icon>
					<LoadingIcon />
				</SearchField.Icon>
			</SearchField>
			<SearchField {...args}>
				<SearchField.TextField value='bar' />
			</SearchField>
		</div>
	);
};

export const Debounced: Story<ISearchFieldProps> = (args) => {
	const [value, setValue] = useState('foo');

	return (
		<div>
			<SearchField
				{...args}
				style={{ marginBottom: '10px' }}
				value={value}
				onChangeDebounced={(value) => setValue(value)}
			/>
			<div
				style={{
					marginBottom: '10px',
					marginLeft: '10px',
				}}
			>
				Value: {value}
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
