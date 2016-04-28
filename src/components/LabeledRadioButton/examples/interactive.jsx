import React from 'react';
import { LabeledRadioButton } from '../../../index';

const style = {
	marginBottom: '3px'
};

export default React.createClass({
	getInitialState() {
		return {
			flavor: 'vanilla'
		};
	},

	handleSelectedChocolate() {
		this.setState({
			flavor: 'chocolate'
		});
	},

	handleSelectedStrawberry() {
		this.setState({
			flavor: 'strawberry'
		});
	},

	handleSelectedVanilla() {
		this.setState({
			flavor: 'vanilla'
		});
	},

	render() {
		return (
			<section>
				<span>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'vanilla'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedVanilla}
							style={style}
					>
						<LabeledRadioButton.Label>Vanilla</LabeledRadioButton.Label>
					</LabeledRadioButton>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'chocolate'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedChocolate}
							style={style}
					>
						<LabeledRadioButton.Label>Chocolate</LabeledRadioButton.Label>
					</LabeledRadioButton>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'strawberry'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedStrawberry}
							style={style}
					>
						<LabeledRadioButton.Label>Strawberry</LabeledRadioButton.Label>
					</LabeledRadioButton>
				</span>
			</section>
		);
	}
});
