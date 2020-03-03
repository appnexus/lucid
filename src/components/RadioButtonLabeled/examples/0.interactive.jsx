import React from 'react';
import createClass from 'create-react-class';
import { RadioButtonLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
};

export default createClass({
	getInitialState() {
		return {
			flavor: 'vanilla',
		};
	},

	handleSelectedChocolate() {
		this.setState({
			flavor: 'chocolate',
		});
	},

	handleSelectedCaramel() {
		this.setState({
			flavor: 'saltedCaramel',
		});
	},

	handleSelectedMint() {
		this.setState({
			flavor: 'mintChip',
		});
	},

	handleSelectedStrawberry() {
		this.setState({
			flavor: 'strawberry',
		});
	},

	handleSelectedVanilla() {
		this.setState({
			flavor: 'vanilla',
		});
	},

	render() {
		return (
			<section>
				<span
					style={{
						display: 'inline-flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
				>
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
					<RadioButtonLabeled
						isSelected={this.state.flavor === 'saltedCaramel'}
						name='interactive-radio-buttons'
						onSelect={this.handleSelectedCaramel}
						style={style}
					>
						<RadioButtonLabeled.Label>Salted caramel</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
						isSelected={this.state.flavor === 'mintChip'}
						name='interactive-radio-buttons'
						onSelect={this.handleSelectedMint}
						style={style}
					>
						<RadioButtonLabeled.Label>
							Mint choc chip (the best)
						</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
				</span>
			</section>
		);
	},
});
