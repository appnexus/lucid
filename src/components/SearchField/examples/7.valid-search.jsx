import React from 'react';
import createClass from 'create-react-class';
import { SearchField } from '../../../index';

export default createClass({
	getInitialState: () => ({ value: '' }),
	render() {
		return (
			<SearchField
				placeholder="icon doesn't become active until you type at least three characters ----->"
				isValid={this.state.value.length > 2}
				value={this.state.value}
				onSubmit={submission => this.setState({ submission })}
				onChange={value => this.setState({ value })}
				onKeyDown={({ key }) => this.setState({ key })}
				onBlur={lastValue => this.setState({ lastValue })}
			/>
		);
	},
});
