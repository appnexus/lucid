import React from 'react';
import createClass from 'create-react-class';
import TextField from './TextField';
import TextFieldPlain from './TextFieldPlain';
import Button from '../Button/Button';

export default {
	title: 'Controls/TextField',
	component: TextField,
	parameters: {
		docs: {
			description: {
				component: (TextField as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const style = {
		marginBottom: '10px',
	};

	const Component = createClass({
		getInitialState() {
			return {
				value: '',
			};
		},

		render() {
			return (
				<div>
					<TextField
						style={style}
						placeholder='default'
						value={this.state.value}
						onChange={(value) => this.setState({ value })}
					/>
				</div>
			);
		},
	});

	return <Component />;
};

/* Plain */
export const Plain = () => {
	const style = {
		marginBottom: '10px',
	};

	return (
		<div>
			<TextFieldPlain style={style} placeholder='Plain Textfield example' />
			<TextFieldPlain
				isMultiLine
				rows={5}
				style={style}
				placeholder='Plain Textfield multiline example'
			/>
		</div>
	);
};

/* On Submit */
export const OnSubmit = () => {
	const Component = createClass({
		getInitialState() {
			return {
				value: 'Enter some text in and hit enter',
			};
		},

		render() {
			return (
				<div>
					<TextField
						style={{
							marginBottom: '10px',
						}}
						value={this.state.value}
						onSubmit={(value) => this.setState({ value })}
					/>
					<div style={{ marginTop: '10px', marginLeft: '10px' }}>
						this.state.value: {this.state.value}
					</div>
				</div>
			);
		},
	});

	return <Component />;
};

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
					<TextField
						style={{
							marginBottom: '10px',
						}}
						value={this.state.value}
						onChangeDebounced={(value) => this.setState({ value })}
					/>

					<div style={{ marginBottom: '10px', marginLeft: '10px' }}>
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

/* Multiline */
export const Multiline = () => {
	const style = {
		marginBottom: '10px',
	};

	const Component = createClass({
		getInitialState() {
			return {
				value: '',
			};
		},

		render() {
			return (
				<div>
					<TextField
						style={style}
						placeholder='default'
						value={this.state.value}
						onChange={(value) => this.setState({ value })}
					/>

					<TextField
						isMultiLine
						placeholder='isMultiLine'
						style={style}
						value={this.state.value}
						onChange={(value) => this.setState({ value })}
					/>

					<div style={{ marginBottom: '10px', marginLeft: '10px' }}>
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

/* Disabled */
export const Disabled = () => {
	const style = {
		marginBottom: '10px',
	};

	const Component = createClass({
		getInitialState() {
			return {
				value: '',
			};
		},

		render() {
			return (
				<div>
					<TextField
						style={style}
						placeholder='disabled'
						isDisabled
						value={this.state.value}
						onChange={(value) => this.setState({ value })}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
