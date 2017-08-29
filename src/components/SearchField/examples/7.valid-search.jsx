import React from 'react';
import createReactClass from 'create-react-class';
import { SearchField } from '../../../index';

export default createReactClass({
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
