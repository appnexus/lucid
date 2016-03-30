import React from 'react';
import TextField from '../TextField';
import Button from '../../Button/Button';

const style = {
	marginBottom: '10px'
};

export default React.createClass({
	getInitialState() {
		return {
			value: 'foo'
		}
	},

	render() {
		return (
			<div>
				<TextField
					style={style}
					value={this.state.value}
					onChangeDebounced={(value) => this.setState({value})}
				/>

				<div style={style}>this.state.value: {this.state.value}</div>

				<Button onClick={() => { this.setState({ value: 'foo' }); }}>
					Set TextField to "foo"
				</Button>
			</div>
		);
	}
});
