import React from 'react';
import { SearchField } from '../../../index';

export default React.createClass({
	getInitialState: () => ({}),
  render() {
    return (
			<div>
				<SearchField placeholder='Name/ID'>
					<SearchField.TextField
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
