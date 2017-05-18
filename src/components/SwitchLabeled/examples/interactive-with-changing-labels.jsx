import React from 'react';
import createClass from 'create-react-class';
import { SwitchLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
};

export default createClass({
	getInitialState() {
		return {
			airplaneMode: true,
			bluetooth: true,
			cellularData: true,
			spam: true,
		};
	},

	handleSelectedAirplaneMode(isSelected) {
		this.setState({
			airplaneMode: isSelected,
		});
	},

	handleSelectedBluetooth(isSelected) {
		this.setState({
			bluetooth: isSelected,
		});
	},

	handleSelectedCellularData(isSelected) {
		this.setState({
			cellularData: isSelected,
		});
	},

	handleSelectedSpam(isSelected) {
		this.setState({
			spam: isSelected,
		});
	},

	render() {
		const spamSwitchLabel = this.state.spam
			? 'Yes! I would like to receive updates, special offers, and other information from AppNexus and its subsidiaries.'
			: 'No! Please keep your wicked, dirty spam all to yourselves!';

		return (
			<section>
				<span>
					<SwitchLabeled
						isSelected={this.state.airplaneMode === true}
						Label={`Airplane Mode ${this.state.airplaneMode === true ? 'Activated' : 'Deactivated'}`}
						onSelect={this.handleSelectedAirplaneMode}
						style={style}
					/>
					<SwitchLabeled
						isSelected={this.state.bluetooth === true}
						Label={`Bluetooth ${this.state.bluetooth === true ? 'Enabled' : 'Disabled'}`}
						onSelect={this.handleSelectedBluetooth}
						style={style}
					/>
					<SwitchLabeled
						isSelected={this.state.cellularData === true}
						Label={`${this.state.cellularData ? 'Use' : 'Do Not Use'} Cellular Data`}
						onSelect={this.handleSelectedCellularData}
						style={style}
					/>
				</span>
				<br />
				<SwitchLabeled
					isSelected={this.state.spam === true}
					onSelect={this.handleSelectedSpam}
					style={style}
				>
					<SwitchLabeled.Label>{spamSwitchLabel}</SwitchLabeled.Label>
				</SwitchLabeled>
			</section>
		);
	},
});
