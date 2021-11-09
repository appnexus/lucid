import React from 'react';
import createClass from 'create-react-class';
import { LoadingIcon, SearchFieldDumb as SearchField } from './../../index';
import Button from '../Button/Button';

export default {
	title: 'Controls/SearchField',
	component: SearchField,
	parameters: {
		docs: {
			description: {
				component: (SearchField as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const Component = createClass({
		render() {
			return <SearchField />;
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Interactive */
export const Interactive = () => {
	const Component = createClass({
		getInitialState: () => ({}),
		render() {
			return (
				<div>
					<SearchField onSubmit={(value) => this.setState({ value })} />
					<div style={{ marginTop: '10px', marginLeft: '10px' }}>
						Hit "enter" to submit: {this.state.value}
					</div>
				</div>
			);
		},
	});

	return <Component />;
};
Interactive.storyName = 'Interactive';

/* Placeholder */
export const Placeholder = () => {
	const Component = createClass({
		render() {
			return <SearchField placeholder='Name/ID' />;
		},
	});

	return <Component />;
};
Placeholder.storyName = 'Placeholder';

/* Disabled */
export const Disabled = () => {
	const Component = createClass({
		render() {
			return <SearchField isDisabled />;
		},
	});

	return <Component />;
};
Disabled.storyName = 'Disabled';

/* Custom Icon */
export const CustomIcon = () => {
	const Component = createClass({
		render() {
			return (
				<SearchField>
					<SearchField.Icon>
						<LoadingIcon />
					</SearchField.Icon>
				</SearchField>
			);
		},
	});

	return <Component />;
};
CustomIcon.storyName = 'CustomIcon';

/* Custom Text Field */
export const CustomTextField = () => {
	const Component = createClass({
		getInitialState: () => ({}),
		render() {
			return (
				<div>
					<SearchField placeholder='Name/ID'>
						<SearchField.TextField
							value={this.state.value}
							onSubmit={(submission) => this.setState({ submission })}
							onChange={(value) => this.setState({ value })}
							onKeyDown={({ event: { key } }) => this.setState({ key })}
							onBlur={(lastValue) => this.setState({ lastValue })}
						/>
					</SearchField>
					<div style={{ marginTop: '10px', marginLeft: '10px' }}>
						<div>Hit "enter" to submit: {this.state.submission}</div>
						<div>Last keydown: {this.state.key}</div>
						<div>Value on blur: {this.state.lastValue}</div>
					</div>
				</div>
			);
		},
	});

	return <Component />;
};
CustomTextField.storyName = 'CustomTextField';

/* Valid Search */
export const ValidSearch = () => {
	const Component = createClass({
		getInitialState: () => ({ value: '' }),
		render() {
			return (
				<SearchField
					placeholder="Search icon doesn't become active until you type at least three characters ----->"
					isValid={this.state.value.length > 2}
					value={this.state.value}
					onSubmit={(submission) => this.setState({ submission })}
					onChange={(value) => this.setState({ value })}
					onKeyDown={({ key }) => this.setState({ key })}
					onBlur={(lastValue) => this.setState({ lastValue })}
				/>
			);
		},
	});

	return <Component />;
};
ValidSearch.storyName = 'ValidSearch';

/* Props */
export const Props = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<SearchField value='foo' />
					<SearchField placeholder='bar' />
					<SearchField isDisabled />
					<SearchField isValid={false} />
					<SearchField>
						<SearchField.Icon>
							<LoadingIcon />
						</SearchField.Icon>
					</SearchField>
					<SearchField value='foo'>
						<SearchField.Icon>
							<LoadingIcon />
						</SearchField.Icon>
					</SearchField>
					<SearchField>
						<SearchField.TextField value='bar' />
					</SearchField>
				</div>
			);
		},
	});

	return <Component />;
};
Props.storyName = 'Props';

/* Debounced */
export const Debounced = () => {
	const Component = createClass({
		getInitialState() {
			return {
				value: 'foo',
			};
		},

		render() {
			return (
				<div>
					<SearchField
						style={{ marginBottom: '10px' }}
						value={this.state.value}
						onChangeDebounced={(value) => this.setState({ value })}
					/>

					<div
						style={{
							marginBottom: '10px',
							marginLeft: '10px',
						}}
					>
						this.state.value: {this.state.value}
					</div>

					<Button
						onClick={() => {
							this.setState({ value: 'foo' });
						}}
					>
						Set TextField to "foo"
					</Button>
				</div>
			);
		},
	});

	return <Component />;
};
Debounced.storyName = 'Debounced';
