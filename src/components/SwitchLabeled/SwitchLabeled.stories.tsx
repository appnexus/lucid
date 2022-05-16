import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import SwitchLabeled, { ISwitchLabeledProps } from './SwitchLabeled';

export default {
	title: 'Controls/SwitchLabeled',
	component: SwitchLabeled,
	subcomponents: { 'SwitchLabeled.Label': SwitchLabeled.Label },
	parameters: {
		docs: {
			description: {
				component: (SwitchLabeled as any).peek.description,
			},
		},
	},
	args: SwitchLabeled.defaultProps,
} as Meta;

export const Basic: Story<ISwitchLabeledProps> = (args) => {
	const [isSelected, setIsSelected] = useState(false);

	const handleSelected = () => {
		setIsSelected(!isSelected);
	};

	return (
		<SwitchLabeled
			{...args}
			Label='Default'
			onSelect={handleSelected}
			isSelected={isSelected}
		/>
	);
};

/* Interactive */
export const Interactive: Story<ISwitchLabeledProps> = (args) => {
	const style = {
		marginBottom: '3px',
	};

	const [state, setState] = useState({
		airplaneMode: false,
		bluetooth: false,
		cellularData: false,
	});

	const handleSelectedAirplaneMode = (isSelected: any) => {
		setState({
			...state,
			airplaneMode: isSelected,
		});
	};

	const handleSelectedBluetooth = (isSelected: any) => {
		setState({
			...state,
			bluetooth: isSelected,
		});
	};

	const handleSelectedCellularData = (isSelected: any) => {
		setState({
			...state,
			cellularData: isSelected,
		});
	};

	return (
		<section>
			<p>
				<em>
					(Use the styles on the parent container of <code>SwitchLabeled</code>{' '}
					components to ensure only the switches and their labels are clickable)
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
					{...args}
					isSelected={state.airplaneMode === true}
					onSelect={handleSelectedAirplaneMode}
					style={style}
				>
					<SwitchLabeled.Label>Airplane Mode</SwitchLabeled.Label>
				</SwitchLabeled>
				<SwitchLabeled
					{...args}
					isSelected={state.bluetooth === true}
					onSelect={handleSelectedBluetooth}
					style={style}
				>
					<SwitchLabeled.Label>Bluetooth</SwitchLabeled.Label>
				</SwitchLabeled>
				<SwitchLabeled
					{...args}
					isSelected={state.cellularData === true}
					onSelect={handleSelectedCellularData}
					style={style}
				>
					<SwitchLabeled.Label>Cellular Data</SwitchLabeled.Label>
				</SwitchLabeled>
			</span>
		</section>
	);
};

/* Interactive With Changing Labels */
export const InteractiveWithChangingLabels: Story<ISwitchLabeledProps> = (
	args
) => {
	const style = {
		marginBottom: '3px',
	};

	const [state, setState] = useState({
		airplaneMode: false,
		bluetooth: false,
		cellularData: false,
		spam: false,
	});

	const handleSelectedAirplaneMode = (isSelected: any) => {
		setState({
			...state,
			airplaneMode: isSelected,
		});
	};

	const handleSelectedBluetooth = (isSelected: any) => {
		setState({
			...state,
			bluetooth: isSelected,
		});
	};

	const handleSelectedCellularData = (isSelected: any) => {
		setState({
			...state,
			cellularData: isSelected,
		});
	};

	const handleSelectedSpam = (isSelected: any) => {
		setState({
			...state,
			spam: isSelected,
		});
	};

	const spamSwitchLabel = state.spam
		? 'Yes! I would like to receive updates, special offers, and other information from Xandr and its subsidiaries.'
		: 'No! Please keep your messages to yourself!';

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
					{...args}
					isSelected={state.airplaneMode === true}
					Label={`Airplane Mode ${
						state.airplaneMode === true ? 'Activated' : 'Deactivated'
					}`}
					onSelect={handleSelectedAirplaneMode}
					style={style}
				/>
				<SwitchLabeled
					{...args}
					isSelected={state.bluetooth === true}
					Label={`Bluetooth ${
						state.bluetooth === true ? 'Enabled' : 'Disabled'
					}`}
					onSelect={handleSelectedBluetooth}
					style={style}
				/>
				<SwitchLabeled
					{...args}
					isSelected={state.cellularData === true}
					Label={`${state.cellularData ? 'Use' : 'Do Not Use'} Cellular Data`}
					onSelect={handleSelectedCellularData}
					style={style}
				/>
			</span>
			<br />
			<SwitchLabeled
				{...args}
				isSelected={state.spam === true}
				onSelect={handleSelectedSpam}
				style={style}
			>
				<SwitchLabeled.Label>{spamSwitchLabel}</SwitchLabeled.Label>
			</SwitchLabeled>
		</section>
	);
};

/* Label As Prop */
export const LabelAsProp: Story<ISwitchLabeledProps> = (args) => {
	const style = {
		marginRight: '5px',
	};

	return (
		<section>
			<section
				style={{
					display: 'inline-flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<SwitchLabeled {...args} Label='Just text' style={style} />
				<SwitchLabeled
					{...args}
					Label={<span>HTML element</span>}
					style={style}
				/>
				<SwitchLabeled
					{...args}
					Label={[
						'Text in an array',
						'Only the first value in the array is used',
						'The rest of these should be ignored',
					]}
					style={style}
				/>
				<SwitchLabeled
					{...args}
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
};

/* States */
export const States: Story<ISwitchLabeledProps> = (args) => {
	const style = {
		marginBottom: '3px',
		marginRight: '13px',
	};

	return (
		<section
			style={{
				display: 'inline-flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
			}}
		>
			<SwitchLabeled {...args} style={style}>
				<SwitchLabeled.Label>(default props)</SwitchLabeled.Label>
			</SwitchLabeled>

			<section>
				<SwitchLabeled {...args} isSelected={true} style={style}>
					<SwitchLabeled.Label>Selected</SwitchLabeled.Label>
				</SwitchLabeled>
				<SwitchLabeled {...args} isDisabled={true} style={style}>
					<SwitchLabeled.Label>Disabled</SwitchLabeled.Label>
				</SwitchLabeled>
				<SwitchLabeled
					{...args}
					isDisabled={true}
					isSelected={true}
					style={style}
				>
					<SwitchLabeled.Label>Disabled & selected</SwitchLabeled.Label>
				</SwitchLabeled>
			</section>
		</section>
	);
};
