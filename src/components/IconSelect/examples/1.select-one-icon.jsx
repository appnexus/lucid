import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { IconSelect, ClockIcon } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			selectedIcon: null,
		};
	},

	handleSelect(id) {
		// when selected, set `selectedIcon` to item name
		this.setState({ selectedIcon: id });
	},

	render() {
		const items = [
			{
				id: 'item1',
				icon: <ClockIcon />,
				label: 'Foo Bar',
			},
			{
				id: 'item2',
				icon: <ClockIcon />,
				label: 'Bax Tar',
			},
		];

		return (
			<IconSelect
				kind="single" // renders as radio buttons
				selectedIcon={this.state.selectedIcon}
				onSelect={this.handleSelect}
				items={_.map(
					items,
					(item, index) =>
						(_.isEqual(item.id, this.state.selectedIcon)
							? {
									...item,
									isSelected: true,
								}
							: {
									...item,
									isSelected: false,
								})
				)}
			/>
		);
	},
});
