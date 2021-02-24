import React from 'react';
import createClass from 'create-react-class';
import { SearchField } from '../../../index';

export default createClass({
	getInitialState: () => ({}),
	render() {
		return (
			<div>
				<SearchField onSubmit={value => this.setState({ value })} />
				<div>Hit "enter" to submit: {this.state.value}</div>
			</div>
		);
	},
});
