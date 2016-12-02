import React from 'react';
import { SearchField } from '../../../index';

export default React.createClass({
	getInitialState: () => ({}),
	render() {
		return (
			<div>
				<SearchField onSubmit={(value) => this.setState({ value })}/>
				<div>Hit "enter" to submit: {this.state.value}</div>
			</div>
		);
	},
});
