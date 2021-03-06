import React from 'react';
import createClass from 'create-react-class';
import { IconSelect, ClockIcon } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			selectedIcons: [{ id: 'item2', isPartial: true }],
		};
	},

	isSelected(id: any) {
		return this.state.selectedIcons.some(
			({ id: selectedId }: any) => id === selectedId
		);
	},

	isPartiallySelected(id: any) {
		return this.state.selectedIcons.some(
			({ id: selectedId, isPartial }: any) => id === selectedId && isPartial
		);
	},

	handleSelect(selectedId: any) {
		const selectedIcons = this.state.selectedIcons;

		if (this.isPartiallySelected(selectedId)) {
			// if partially selected, remove from the list
			this.setState({
				selectedIcons: selectedIcons.filter(({ id }: any) => id !== selectedId),
			});
		} else if (this.isSelected(selectedId)) {
			// if already selected, ensure isPartial is true
			this.setState({
				selectedIcons: selectedIcons.map(({ id, isPartial }: any) => ({
					id,
					isPartial: isPartial || id === selectedId,
				})),
			});
		} else {
			// add selected icon to list
			this.setState({
				selectedIcons: [...selectedIcons, { id: selectedId, isPartial: false }],
			});
		}
	},

	render() {
		return (
			<IconSelect
				onSelect={this.handleSelect}
				items={
					[
						{
							id: 'item1',
							icon: <ClockIcon />,
							isSelected: this.isSelected('item1'),
							isPartial: this.isPartiallySelected('item1'),
							label: 'Foo Bar',
						},
						{
							id: 'item2',
							icon: <ClockIcon />,
							isSelected: this.isSelected('item2'),
							isPartial: this.isPartiallySelected('item2'),
							label: 'Bax Tar',
						},
					] as any
				}
			/>
		);
	},
});
