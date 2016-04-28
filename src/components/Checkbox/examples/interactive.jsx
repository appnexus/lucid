import React from 'react';
import { Checkbox } from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
			isSelected: true
		};
	},

	handleSelected(isSelected) {
		this.setState({
			...this.state,
			isSelected
		});
	},

	render() {
		return (
			<ul>
				<li>
					<label>Plain</label>
					<Checkbox
						isSelected={this.state.isSelected}
						onSelect={this.handleSelected}
						tabIndex={20}
					/>
				</li>
				<li>
					<label>Disabled unselected</label>
					<Checkbox
						isSelected={false}
						isDisabled={true}
						tabIndex={20}
					/>
				</li>
				<li>
					<label>Disabled selected</label>
					<Checkbox
						isSelected={true}
						isDisabled={true}
						tabIndex={20}
					/>
				</li>
			</ul>
		);
	}
});
