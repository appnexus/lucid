import _ from 'lodash';
import React from 'react';
import { CheckboxLabeled } from '../../../index';

const style = {
	marginBottom: '3px'
};

export default React.createClass({
	getInitialState() {
		return {
			flavors: []
		};
	},

	handleSelectedChocolate(isSelected) {
		this.setState({
			flavors: isSelected
					? _.concat(this.state.flavors, 'chocolate')
					: _.without(this.state.flavors, 'chocolate')
		});
	},

	handleSelectedStrawberry(isSelected) {
		this.setState({
			flavors: isSelected
					? _.concat(this.state.flavors, 'strawberry')
					: _.without(this.state.flavors, 'strawberry')
		});
	},

	handleSelectedVanilla(isSelected) {
		this.setState({
			flavors: isSelected
					? _.concat(this.state.flavors, 'vanilla')
					: _.without(this.state.flavors, 'vanilla')
		});
	},

	render() {
		return (
			<section>
				<span>
					<CheckboxLabeled
							isSelected={_.includes(this.state.flavors, 'vanilla')}
							name='interactive-checkboxes'
							onSelect={this.handleSelectedVanilla}
							style={style}
					>
						<CheckboxLabeled.Label>Vanilla</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
							isSelected={_.includes(this.state.flavors, 'chocolate')}
							name='interactive-checkboxes'
							onSelect={this.handleSelectedChocolate}
							style={style}
					>
						<CheckboxLabeled.Label>Chocolate</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
							isSelected={_.includes(this.state.flavors, 'strawberry')}
							name='interactive-checkboxes'
							onSelect={this.handleSelectedStrawberry}
							style={style}
					>
						<CheckboxLabeled.Label>Strawberry</CheckboxLabeled.Label>
					</CheckboxLabeled>
				</span>
			</section>
		);
	}
});
