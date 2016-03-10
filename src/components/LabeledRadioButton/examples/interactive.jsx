import _ from 'lodash';
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
		this.setState(_.assign({}, this.state, {
			flavor: 'chocolate'
		}));
	},

	handleSelectedStrawberry() {
		this.setState(_.assign({}, this.state, {
			flavor: 'strawberry'
		}));
	},

	handleSelectedVanilla() {
		this.setState(_.assign({}, this.state, {
			flavor: 'vanilla'
		}));
	},

	render() {
		return (
			<section>
				<span style={{ display: 'flex' }}>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'vanilla'}
							label='Vanilla'
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedVanilla}
							style={style}
					/>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'chocolate'}
							label='Chocolate'
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedChocolate}
							style={style}
					/>
					<LabeledRadioButton
							isSelected={this.state.flavor === 'strawberry'}
							label='Strawberry'
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedStrawberry}
							style={style}
					/>
				</span>
			</section>
		);
	}
});
