import React from 'react';
import createReactClass from 'create-react-class';
import { SearchField } from '../../../index';

export default createReactClass({
	getInitialState: () => ({}),
	render() {
		return (
			<div>
				<SearchField placeholder="Name/ID">
					<SearchField.TextField
						value={this.state.value}
						onSubmit={submission => this.setState({ submission })}
						onChange={value => this.setState({ value })}
						onKeyDown={({ key }) => this.setState({ key })}
						onBlur={lastValue => this.setState({ lastValue })}
					/>
				</SearchField>
				<div>
					Hit "enter" to submit: {this.state.submission}
				</div>
				<div>
					Last keydown: {this.state.key}
				</div>
				<div>
					Value on blur: {this.state.lastValue}
				</div>
			</div>
		);
	},
});
