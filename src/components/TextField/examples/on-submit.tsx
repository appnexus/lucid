import React from 'react';
import createClass from 'create-react-class';
import { TextField } from '../../../index';

const style = {
	marginBottom: '10px',
};

export default createClass({
	getInitialState() {
		return {
			value: 'Enter some text in and hit enter',
		};
	},

	render() {
		return (
			<div>
				<TextField
					style={style}
					value={this.state.value}
					onSubmit={value => this.setState({ value })}
				/>

				<div style={style}>this.state.value: {this.state.value}</div>
			</div>
		);
	},
});
