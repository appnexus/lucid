import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { RadioButton } from '../../../index';

const style = {
	listStyleType: 'none',
	display: 'flex',
	alignItems: 'center',
};

export default createClass({
	getInitialState() {
		return {
			isSelected: false,
		};
	},

	handleSelected(isSelected: boolean) {
		this.setState(
			_.assign({}, this.state, {
				isSelected,
			})
		);
	},

	render() {
		return (
			<ul>
				<li style={style}>
					<label>Enabled</label>
					<RadioButton
						isSelected={this.state.isSelected}
						name='interactive-radio-buttons'
						onSelect={this.handleSelected}
						tabIndex={20}
					/>
				</li>
			</ul>
		);
	},
});
