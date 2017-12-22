import React from 'react';
import createClass from 'create-react-class';
import { IconSelect, ClockIcon } from '../../../index';

const isNot = subject => {
	return object => object !== subject;
};

export default createClass({
	getInitialState() {
		return {
			selectedIcons: [],
		};
	},

	handleSelect(id) {
		const selectedIcons = this.state.selectedIcons;

		// if selected, then remove it from `selectedIcons`
		if (selectedIcons.includes(id)) {
			this.setState({
				selectedIcons: selectedIcons.filter(isNot(id)),
			});

			// else, add it to `selectedIcons`
		} else {
			this.setState({
				selectedIcons: selectedIcons.concat(id),
			});
		}
	},

	render() {
		const selectedIcons = this.state.selectedIcons;

		return (
			<IconSelect
				kind="multiple" // renders as checkboxes
				onSelect={this.handleSelect}
				items={[
					{
						id: 'item1',
						icon: <ClockIcon />,
						isSelected: selectedIcons.includes('item1'),
						label: 'Foo Bar',
					},
					{
						id: 'item2',
						icon: <ClockIcon />,
						isSelected: selectedIcons.includes('item2'),
						label: 'Bax Tar',
					},
				]}
			/>
		);
	},
});
