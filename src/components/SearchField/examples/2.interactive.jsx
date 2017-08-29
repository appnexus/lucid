import React from 'react';
import createReactClass from 'create-react-class';
import { SearchField } from '../../../index';

export default createReactClass({
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
