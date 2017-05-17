import React from 'react';
import createClass from 'create-react-class';
import { SwitchLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
};

export default createClass({
	getInitialState() {
		return {
			airplaneMode: false,
			bluetooth: false,
			cellularData: false,
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

	render() {
		return (
			<section>
				<span>
					<SwitchLabeled
						isSelected={this.state.airplaneMode === true}
						onSelect={this.handleSelectedAirplaneMode}
						style={style}
					>
						<SwitchLabeled.Label>Airplane Mode</SwitchLabeled.Label>
					</SwitchLabeled>
					<SwitchLabeled
						isSelected={this.state.bluetooth === true}
						onSelect={this.handleSelectedBluetooth}
						style={style}
					>
						<SwitchLabeled.Label>Bluetooth</SwitchLabeled.Label>
					</SwitchLabeled>
					<SwitchLabeled
						isSelected={this.state.cellularData === true}
						onSelect={this.handleSelectedCellularData}
						style={style}
					>
						<SwitchLabeled.Label>Cellular Data</SwitchLabeled.Label>
					</SwitchLabeled>
				</span>
			</section>
		);
	},
});
