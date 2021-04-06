import React from 'react';
import createClass from 'create-react-class';

import { TextField } from '../../../index';

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
