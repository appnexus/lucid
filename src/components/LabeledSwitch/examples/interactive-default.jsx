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
							onSelect={this.handleSelectedAirplaneMode}
							style={style}
					>
						<LabeledSwitch.Label>Airplane Mode</LabeledSwitch.Label>
					</LabeledSwitch>
					<LabeledSwitch
							isSelected={this.state.bluetooth === true}
							onSelect={this.handleSelectedBluetooth}
							style={style}
					>
						<LabeledSwitch.Label>Bluetooth</LabeledSwitch.Label>
					</LabeledSwitch>
					<LabeledSwitch
							isSelected={this.state.cellularData === true}
							onSelect={this.handleSelectedCellularData}
							style={style}
					>
						<LabeledSwitch.Label>Cellular Data</LabeledSwitch.Label>
					</LabeledSwitch>
				</span>
			</section>
		);
	}
});
