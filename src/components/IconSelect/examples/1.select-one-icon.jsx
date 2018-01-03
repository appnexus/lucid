import React from 'react';
import createClass from 'create-react-class';
import { IconSelect, ClockIcon } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			selectedIcon: 'item2',
		};
	},

	handleSelect(id) {
		// when selected, set `selectedIcon`
		this.setState({ selectedIcon: id });
	},

	render() {
		return (
			<IconSelect
				kind="single" // renders as radio buttons
				onSelect={this.handleSelect}
				items={[
					{
						id: 'item1',
						icon: <ClockIcon />,
						isSelected: this.state.selectedIcon === 'item1',
						label: 'Foo Bar',
					},
					{
						id: 'item2',
						icon: <ClockIcon />,
						isSelected: this.state.selectedIcon === 'item2',
						label: 'Bax Tar',
					},
				]}
			/>
		);
	},
});
