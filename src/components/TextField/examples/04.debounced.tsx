import React from 'react';
import createClass from 'create-react-class';

import { Button, TextField } from '../../../index';

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
