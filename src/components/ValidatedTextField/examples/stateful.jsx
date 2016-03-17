import React from 'react';
import Button  from '../../Button/Button';
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
				<StatefulValidatedTextField
					value={this.state.value}
					Error='No good'
				/>

				<Button onClick={() => { this.setState({ value: 'foo' }); }}>
					Set ValidatedTextField to "foo"
				</Button>
			</div>
		)
	}
});
