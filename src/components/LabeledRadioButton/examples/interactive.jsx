import React from 'react';

import LabeledRadioButton from '../LabeledRadioButton';

const style = {
	marginRight: '5px'
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
				<span style={{ display: 'flex' }}>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'vanilla'}
							Label='Vanilla'
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedVanilla}
							style={style}
					/>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'chocolate'}
							Label='Chocolate'
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedChocolate}
							style={style}
					/>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'strawberry'}
							Label='Strawberry'
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedStrawberry}
							style={style}
					/>
				</span>
			</section>
		);
	}
});
