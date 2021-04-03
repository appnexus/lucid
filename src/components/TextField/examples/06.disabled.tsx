import React from 'react';
import createClass from 'create-react-class';
import { Button, TextField } from '../../../index';

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
