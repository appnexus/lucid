import React from 'react';
import createClass from 'create-react-class';
import { TextFieldValidated } from '../../../index';

const style = {
	marginBottom: '10px',
};

export default createClass({
	getInitialState() {
		return {
			value: '',
		};
	},

	render() {
		return (
			<div>
				<TextFieldValidated
					value={this.state.value}
					onChangeDebounced={value => this.setState({ value })}
					Error={this.state.value === 'foo' ? null : 'Please enter "foo"'}
				/>

				<div style={style}>state.value: {this.state.value}</div>
			</div>
		);
	},
});
