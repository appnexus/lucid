import React from 'react';

import LabeledSwitch from '../LabeledSwitch';

const style = {
	marginBottom: '3px'
};

export default React.createClass({
	getInitialState() {
		return {
			airplaneMode: false,
			bluetooth: false,
			cellularData: false
		};
	},

	handleSelectedAirplaneMode(isSelected) {
		this.setState({
			airplaneMode: isSelected
		});
	},

	handleSelectedBluetooth(isSelected) {
		this.setState({
			bluetooth: isSelected
		});
	},

	handleSelectedCellularData(isSelected) {
		this.setState({
			cellularData: isSelected
		});
	},

	render() {
		return (
			<section>
				<span>
					<LabeledSwitch
							isSelected={this.state.airplaneMode === true}
							// Label={`Airplane Mode ${this.state.airplaneMode === true ? 'Activated' : 'Deactivated'}`}
							onSelect={this.handleSelectedAirplaneMode}
							style={style}
					>
						<LabeledSwitch.SelectedLabel>Airplane Mode Activated</LabeledSwitch.SelectedLabel>
						<LabeledSwitch.UnselectedLabel>Airplane Mode Deactivated</LabeledSwitch.UnselectedLabel>
					</LabeledSwitch>
					<LabeledSwitch
							isSelected={this.state.bluetooth === true}
							// Label={`Bluetooth ${this.state.bluetooth === true ? 'Enabled' : 'Disabled'}`}
							onSelect={this.handleSelectedBluetooth}
							style={style}
					>
						<LabeledSwitch.SelectedLabel>Bluetooth Enabled</LabeledSwitch.SelectedLabel>
						<LabeledSwitch.UnselectedLabel>Bluetooth Disabled</LabeledSwitch.UnselectedLabel>
					</LabeledSwitch>
					<LabeledSwitch
							isSelected={this.state.cellularData === true}
							// Label={`${this.state.cellularData ? 'Use' : 'Do Not Use'} Cellular Data`}
							onSelect={this.handleSelectedCellularData}
							style={style}
					>
						<LabeledSwitch.SelectedLabel>Use Cellular Data</LabeledSwitch.SelectedLabel>
						<LabeledSwitch.UnselectedLabel>Do Not Use Cellular Data</LabeledSwitch.UnselectedLabel>
					</LabeledSwitch>
				</span>
			</section>
		);
	}
});
