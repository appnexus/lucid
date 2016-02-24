import React from 'react';

import Checkbox from '../Checkbox';

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
					<label>Checkbox</label>
					<Checkbox
						isSelected={this.state.isSelected}
						onSelect={this.handleSelected}
						tabIndex={20}
					/>
				</li>
			</ul>
		);
	}
});
