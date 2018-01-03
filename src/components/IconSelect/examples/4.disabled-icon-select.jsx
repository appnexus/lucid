import React from 'react';
import createClass from 'create-react-class';
import { ClockIcon, IconSelect, Switch } from '../../../index';

const isNot = subject => {
	return object => object !== subject;
};

export default createClass({
	getInitialState() {
		return {
			selectedIcons: [],
			setDisabled: true,
		};
	},

	toggleDisabled() {
		this.setState({
			setDisabled: !this.state.setDisabled,
		});
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
		const { selectedIcons, setDisabled } = this.state;

		return (
			<div>
				<div style={{ clear: 'both' }}>
					<label>Toggle IconSelect</label>
					<Switch isSelected={setDisabled} onSelect={this.toggleDisabled} />
				</div>

				<IconSelect
					kind="multiple" // renders as checkboxes
					onSelect={this.handleSelect}
					isDisabled={setDisabled}
					items={[
						{
							id: 'item1',
							icon: <ClockIcon />,
							isSelected: selectedIcons.includes('item1'),
							label: 'Foo Bar',
							isDisabled: true,
						},
						{
							id: 'item2',
							icon: <ClockIcon />,
							isSelected: selectedIcons.includes('item2'),
							label: 'Bax Tar',
						},
					]}
				/>
			</div>
		);
	},
});
