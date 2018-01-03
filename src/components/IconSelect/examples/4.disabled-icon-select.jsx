import React from 'react';
import createClass from 'create-react-class';
import { IconSelect, ClockIcon, SwitchLabeled } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			selectedIcons: ['item2'],
			isDisabled: true,
		};
	},

	isSelected(id) {
		return this.state.selectedIcons.includes(id);
	},

	handleSelect(selectedId) {
		const selectedIcons = this.state.selectedIcons;

		// if selected, then remove from list
		if (this.isSelected(selectedId)) {
			this.setState({
				selectedIcons: selectedIcons.filter(id => id !== selectedId),
			});
		} else {
			// add it to list
			this.setState({
				selectedIcons: [...selectedIcons, selectedId],
			});
		}
	},

	handleToggleDisabled() {
		this.setState({
			isDisabled: !this.state.isDisabled,
		});
	},

	render() {
		const { isDisabled } = this.state;

		return (
			<section>
				<SwitchLabeled
					Label={`IconSelect ${isDisabled ? 'Disabled' : 'Enabled'}`}
					isSelected={!isDisabled}
					onSelect={this.handleToggleDisabled}
				/>

				<IconSelect
					isDisabled={isDisabled}
					onSelect={this.handleSelect}
					items={[
						{
							id: 'item1',
							icon: <ClockIcon />,
							isSelected: this.isSelected('item1'),
							label: 'Always Disabled',
							isDisabled: true,
						},
						{
							id: 'item2',
							icon: <ClockIcon />,
							isSelected: this.isSelected('item2'),
							label: 'Bax Tar',
						},
					]}
				/>
			</section>
		);
	},
});
