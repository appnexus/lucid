import React from 'react';

import LabeledCheckbox from '../LabeledCheckbox';

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
		console.log('woot');
		return (
			<section>
				<span>
					<LabeledCheckbox
							isSelected={this.state.flavor === 'vanilla'}
							Label='Vanilla'
							name='interactive-checkboxes'
							onSelect={this.handleSelectedVanilla}
							style={style}
					/>
					<LabeledCheckbox
							isSelected={this.state.flavor === 'chocolate'}
							Label='Chocolate'
							name='interactive-checkboxes'
							onSelect={this.handleSelectedChocolate}
							style={style}
					/>
					<LabeledCheckbox
							isSelected={this.state.flavor === 'strawberry'}
							Label='Strawberry'
							name='interactive-checkboxes'
							onSelect={this.handleSelectedStrawberry}
							style={style}
					/>
				</span>
			</section>
		);
	}
});
