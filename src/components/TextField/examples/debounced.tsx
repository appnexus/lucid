import React from 'react';
import createClass from 'create-react-class';
import { Button, TextField } from '../../../index';

const style = {
	marginBottom: '10px',
};

export default createClass({
	getInitialState() {
		return {
			value: 'foo',
		};
	},

	render() {
		return (
			<div>
				<TextField
					style={style}
					value={this.state.value}
					onChangeDebounced={value => this.setState({ value })}
				/>

				<div style={style}>this.state.value: {this.state.value}</div>

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
