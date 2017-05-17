import React from 'react';
import createClass from 'create-react-class';
import { Checkbox } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isSelected: 0,
		};
	},

	handleSelected() {
		this.setState({
			...this.state,
			isSelected: (this.state.isSelected + 1) % 3,
		});
	},

	render() {
		return (
			<ul>
				<li>
					<label>Plain</label>
					<Checkbox
						isIndeterminate={this.state.isSelected === 1}
						isSelected={this.state.isSelected === 0}
						onSelect={this.handleSelected}
						tabIndex={20}
					/>
				</li>
				<li>
					<label>Disabled unselected</label>
					<Checkbox isSelected={false} isDisabled={true} tabIndex={20} />
				</li>
				<li>
					<label>Disabled selected</label>
					<Checkbox isSelected={true} isDisabled={true} tabIndex={20} />
				</li>
				<li>
					<label>Disabled indeterminate</label>
					<Checkbox isIndeterminate={true} isDisabled={true} tabIndex={20} />
				</li>
			</ul>
		);
	},
});
