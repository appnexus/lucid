import React from 'react';
import { ValidatedTextField } from '../../../index';

const style = {
	marginBottom: '10px'
};

export default React.createClass({
	getInitialState() {
		return {
			value: ''
		}
	},

	render() {
		return (
			<div>
				<ValidatedTextField
					value={this.state.value}
					onChangeDebounced={(value) => this.setState({ value })}
					Error={this.state.value === 'foo' ? null : 'Please enter "foo"'}
				/>

				<div style={style}>state.value: {this.state.value}</div>
			</div>
		)
	}
});
