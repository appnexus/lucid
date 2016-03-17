import _ from 'lodash';
import React from 'react';
import ValidatedTextField from '../ValidatedTextField';
import { buildStatefulComponent } from '../../../util/state-management';

const StatefulValidatedTextField = buildStatefulComponent(ValidatedTextField, {
	stateBeatsProps: true
});

export default React.createClass({
	getInitialState() {
		return {
			value: ''
		}
	},

	render() {
		return (
			<div>
				<input type='text' defaultValue={this.state.value} />
				<input
					type='text'
					value={this.state.value}
					onChange={(event) => this.setState({ value: event.target.value })}
				/>

				<StatefulValidatedTextField
					value={this.state.value}
					onChange={(value) => this.setState({ value })}
					Error='No good'
				/>

				<div>this.state.value: {this.state.value}</div>
			</div>
		)
	}
});
