import React from 'react';
import createClass from 'create-react-class';
import SwitchLabeled from './SwitchLabeled';

export default {
	title: 'Controls/SwitchLabeled',
	component: SwitchLabeled,
	parameters: {
		docs: {
			description: {
				component: (SwitchLabeled as any).peek.description,
			},
		},
	},
};

/* Interactive Default */
export const InteractiveDefault = () => {
	const style = {
		marginBottom: '3px',
	};

	const Component = createClass({
		getInitialState() {
			return {
				airplaneMode: false,
				bluetooth: false,
				cellularData: false,
			};
		},

		handleSelectedAirplaneMode(isSelected: any) {
			this.setState({
				airplaneMode: isSelected,
			});
		},

		handleSelectedBluetooth(isSelected: any) {
			this.setState({
				bluetooth: isSelected,
			});
		},

		handleSelectedCellularData(isSelected: any) {
			this.setState({
				cellularData: isSelected,
			});
		},

		render() {
			return (
				<section>
					<p>
						<em>
							(Use the styles on the parent container of{' '}
							<code>SwitchLabeled</code> components to ensure only the switches
							and their labels are clickable)
						</em>
					</p>
					<span
						style={{
							display: 'inline-flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
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

	return <Component />;
};
InteractiveDefault.storyName = 'InteractiveDefault';

/* Interactive With Changing Labels */
export const InteractiveWithChangingLabels = () => {
	const style = {
		marginBottom: '3px',
	};

	const Component = createClass({
		getInitialState() {
			return {
				airplaneMode: true,
				bluetooth: true,
				cellularData: true,
				spam: true,
			};
		},

		handleSelectedAirplaneMode(isSelected: any) {
			this.setState({
				airplaneMode: isSelected,
			});
		},

		handleSelectedBluetooth(isSelected: any) {
			this.setState({
				bluetooth: isSelected,
			});
		},

		handleSelectedCellularData(isSelected: any) {
			this.setState({
				cellularData: isSelected,
			});
		},

		handleSelectedSpam(isSelected: any) {
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
					<span
						style={{
							display: 'inline-flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<SwitchLabeled
							isSelected={this.state.airplaneMode === true}
							Label={`Airplane Mode ${
								this.state.airplaneMode === true ? 'Activated' : 'Deactivated'
							}`}
							onSelect={this.handleSelectedAirplaneMode}
							style={style}
						/>
						<SwitchLabeled
							isSelected={this.state.bluetooth === true}
							Label={`Bluetooth ${
								this.state.bluetooth === true ? 'Enabled' : 'Disabled'
							}`}
							onSelect={this.handleSelectedBluetooth}
							style={style}
						/>
						<SwitchLabeled
							isSelected={this.state.cellularData === true}
							Label={`${
								this.state.cellularData ? 'Use' : 'Do Not Use'
							} Cellular Data`}
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

	return <Component />;
};
InteractiveWithChangingLabels.storyName = 'InteractiveWithChangingLabels';

/* Label As Prop */
export const LabelAsProp = () => {
	const style = {
		marginRight: '5px',
	};

	const Component = createClass({
		render() {
			return (
				<section>
					<section
						style={{
							display: 'inline-flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<SwitchLabeled Label='Just text' style={style} />
						<SwitchLabeled Label={<span>HTML element</span>} style={style} />
						<SwitchLabeled
							Label={[
								'Text in an array',
								'Only the first value in the array is used',
								'The rest of these should be ignored',
							]}
							style={style}
						/>
						<SwitchLabeled
							Label={[
								<span key='1'>HTML element in an array</span>,
								<span key='2'>
									Again only the first value in the array is used
								</span>,
								<span key='3'>The rest should not be rendered</span>,
							]}
							style={style}
						/>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};
LabelAsProp.storyName = 'LabelAsProp';

/* States */
export const States = () => {
	const style = {
		marginBottom: '3px',
		marginRight: '13px',
	};

	const Component = createClass({
		render() {
			return (
				<section
					style={{
						display: 'inline-flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
				>
					<SwitchLabeled style={style}>
						<SwitchLabeled.Label>(default props)</SwitchLabeled.Label>
					</SwitchLabeled>

					<section>
						<SwitchLabeled isSelected={true} style={style}>
							<SwitchLabeled.Label>Selected</SwitchLabeled.Label>
						</SwitchLabeled>
						<SwitchLabeled isDisabled={true} style={style}>
							<SwitchLabeled.Label>Disabled</SwitchLabeled.Label>
						</SwitchLabeled>
						<SwitchLabeled isDisabled={true} isSelected={true} style={style}>
							<SwitchLabeled.Label>Disabled & selected</SwitchLabeled.Label>
						</SwitchLabeled>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};
States.storyName = 'States';
