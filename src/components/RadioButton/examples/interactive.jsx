import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { RadioButton } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isSelected: false,
		};
	},

	handleSelected(isSelected) {
		this.setState(
			_.assign({}, this.state, {
				isSelected,
			})
		);
	},

	render() {
		return (
			<ul>
				<li>
					<label>Enabled</label>
					<RadioButton
						isSelected={this.state.isSelected}
						name="interactive-radio-buttons"
						onSelect={this.handleSelected}
						tabIndex={20}
					/>
				</li>
			</ul>
		);
	},
});
