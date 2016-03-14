import React from 'react';
import TextField from '../TextField';
import Button from '../../Button/Button';
import { buildStatefulComponent } from '../../../util/state-management';

const StatefulTextField = buildStatefulComponent(TextField);

export default React.createClass({
	getInitialState() {
		return {
			value: 'foo'
		}
	},

	render() {
		return (
			<div>
				<StatefulTextField value={this.state.value} onChange={(value) => {
					this.setState({ value })
				}} />

					<Button onClick={() => { this.setState({ value: 'foo' }); }}>
						Set TextField to "foo"
					</Button>

					<div>
						this.state.value: {this.state.value}
					</div>
			</div>
		);
	}
});
