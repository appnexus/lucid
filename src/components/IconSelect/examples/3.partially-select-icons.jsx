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

		if (selectedIcons.find(isPartial(id))) {
			// if it is already a partial, remove from the list
			return this.setState({
				selectedIcons: selectedIcons.filter(isNot(id)),
			});
		} else if (selectedIcons.find(hasId(id))) {
			// if already selected, set to partial
			return this.setState({
				selectedIcons: selectedIcons.map((item, index) => {
					if (item.id === id) {
						return {
							...item,
							isPartial: true,
						};
					}

					return item;
				}),
			});
		} else {
			// select icon
			this.setState({
				selectedIcons: selectedIcons.concat({
					id,
					isPartial: false,
				}),
			});
		}
	},

	handleFind(selection) {
		const selectedIcons = this.state.selectedIcons;

		if (typeof selectedIcons.find(selection) !== 'undefined') {
			return true;
		}

		return false;
	},

	render() {
		return (
			<IconSelect
				kind="multiple" // renders as checkboxes
				onSelect={this.handleSelect}
				items={[
					{
						id: 'item1',
						icon: <ClockIcon />,
						isSelected: this.handleFind(hasId('item1')),
						isPartial: this.handleFind(isPartial('item1')),
						label: 'Foo Bar',
					},
					{
						id: 'item2',
						icon: <ClockIcon />,
						isSelected: this.handleFind(hasId('item2')),
						isPartial: this.handleFind(isPartial('item2')),
						label: 'Bax Tar',
					},
				]}
			/>
		);
	},
});
