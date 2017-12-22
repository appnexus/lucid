import React from 'react';
import createClass from 'create-react-class';
import { IconSelect, ClockIcon } from '../../../index';

const hasId = subject => {
	return ({ id }) => id === subject;
};

const isNot = subject => {
	return ({ id }) => id !== subject;
};

const isPartial = subject => {
	return ({ id, isPartial }) => id === subject && isPartial;
};

export default createClass({
	getInitialState() {
		return {
			selectedIcons: [],
		};
	},

	handleSelect(id) {
		const selectedIcons = this.state.selectedIcons;

		// if partially selected, then set `isPartial` to false (making it fully selected)
		if (selectedIcons.find(isPartial('item1'))) {
			this.setState({
				selectedIcons: selectedIcons.filter(isNot(id)).concat({
					id,
					isPartial: false,
				}),
			});

			// else if fully selected, then remove from list (unselecting it)
		} else if (selectedIcons.find(hasId(id))) {
			this.setState({
				selectedIcons: selectedIcons.filter(isNot(id)),
			});

			// else, add it to the list with `isPartial` set to true (partially selecting it)
		} else {
			this.setState({
				selectedIcons: selectedIcons.concat({
					id,
					isPartial: true,
				}),
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
						isSelected: selectedIcons.find(hasId('item1')),
						isPartial: selectedIcons.find(isPartial('item1')),
						label: 'Foo Bar',
					},
					{
						id: 'item2',
						icon: <ClockIcon />,
						isSelected: selectedIcons.find(hasId('item2')),
						isPartial: selectedIcons.find(isPartial('item2')),
						label: 'Bax Tar',
					},
				]}
			/>
		);
	},
});
