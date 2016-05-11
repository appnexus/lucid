import React from 'react';
import { RadioButtonLabeled } from '../../../index';

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
					<RadioButtonLabeled
							isSelected={this.state.flavor === 'vanilla'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedVanilla}
							style={style}
					>
						<RadioButtonLabeled.Label>Vanilla</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
							isSelected={this.state.flavor === 'chocolate'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedChocolate}
							style={style}
					>
						<RadioButtonLabeled.Label>Chocolate</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
							isSelected={this.state.flavor === 'strawberry'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedStrawberry}
							style={style}
					>
						<RadioButtonLabeled.Label>Strawberry</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
				</span>
			</section>
		);
	}
});
