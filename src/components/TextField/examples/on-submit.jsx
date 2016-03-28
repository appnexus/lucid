import React from 'react';
import TextField from '../TextField';

const style = {
	marginBottom: '10px'
};

export default React.createClass({
	getInitialState() {
		return {
			value: 'Enter some text in and hit enter'
		}
	},

	render() {
		return (
			<div>
				<TextField
					style={style}
					value={this.state.value}
					onSubmit={(value) => this.setState({value})}
				/>

				<div style={style}>this.state.value: {this.state.value}</div>
			</div>
		);
	}
});
