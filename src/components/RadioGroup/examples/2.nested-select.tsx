import React from 'react';
import createClass from 'create-react-class';
import { RadioGroup, RadioButtonLabeled, SingleSelect } from '../../../index';

const style = {
	marginRight: '15px',
};

const subSelection = {
	display: 'block',
	marginTop: '13px',
};

export default createClass({
	getInitialState() {
		return {
			height: null,
		};
	},

	handleSelectedTallSimon() {
		this.setState({
			height: 'Tall Simon',
		});
	},

	handleSelectedShortSimon() {
		this.setState({
			height: 'Short Simon',
		});
	},

	render() {
		return (
			<RadioGroup>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Alvin</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>
						Simon
						<RadioButtonLabeled
							isSelected={this.state.height === 'Tall Simon'}
							onSelect={this.handleSelectedTallSimon}
						>
							<RadioButtonLabeled.Label>Tall Simon</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
						<RadioButtonLabeled
							isSelected={this.state.height === 'Short Simon'}
							onSelect={this.handleSelectedShortSimon}
						>
							<RadioButtonLabeled.Label>Short Simon</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
					</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>
						Theodore
						<SingleSelect style={subSelection}>
							<SingleSelect.Option>Tall Theo</SingleSelect.Option>
							<SingleSelect.Option>Short Theo</SingleSelect.Option>
							<SingleSelect.Option>Average height Theo</SingleSelect.Option>
						</SingleSelect>
					</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);
	},
});

// begin-hide-from-docs
export const notes = `
You can nest items in the \`RadioGroup\` for sub-selections. Please work with a designer to style and define states for sub-selections.
`;
// end-hide-from-docs
