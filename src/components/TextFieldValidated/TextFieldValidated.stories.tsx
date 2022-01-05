import React from 'react';
import createClass from 'create-react-class';
import TextFieldValidated from './TextFieldValidated';

export default {
	title: 'Controls/TextFieldValidated',
	component: TextFieldValidated,
	parameters: {
		docs: {
			description: {
				component: (TextFieldValidated as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const Component = createClass({
		render() {
			return <TextFieldValidated Error='Nope, not even close!' />;
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Debounced */
export const Debounced = () => {
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
					<TextFieldValidated
						style={style}
						value={this.state.value}
						onChangeDebounced={(value) => this.setState({ value })}
						Error={this.state.value === 'foo' ? null : 'Please enter "foo"'}
					/>
					<div style={style}>state.value: {this.state.value}</div>
				</div>
			);
		},
	});

	return <Component />;
};
Debounced.storyName = 'Debounced';

/* Error Types */
export const ErrorTypes = () => {
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
					<TextFieldValidated
						style={style}
						value={this.state.value}
						onChangeDebounced={() => {}}
						Error={'This is an error'}
					/>
					<TextFieldValidated
						style={style}
						value={this.state.value}
						onChangeDebounced={() => {}}
						Error={null}
						Info={'This is an info'}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ErrorTypes.storyName = 'ErrorTypes';
