import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { CheckboxLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
};

export default createClass({
	getInitialState() {
		return {
			flavors: [],
		};
	},

	handleSelectedChocolate(isSelected: any) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'chocolate')
				: _.without(this.state.flavors, 'chocolate'),
		});
	},

	handleSelectedStrawberry(isSelected: any) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'strawberry')
				: _.without(this.state.flavors, 'strawberry'),
		});
	},

	handleSelectedVanilla(isSelected: any) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'vanilla')
				: _.without(this.state.flavors, 'vanilla'),
		});
	},

	handleSelectedHipsum(isSelected: any) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'hipsum')
				: _.without(this.state.flavors, 'hipsum'),
		});
	},

	handleSelectedHipsum2(isSelected: any) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'hipsum2')
				: _.without(this.state.flavors, 'hipsum2'),
		});
	},

	handleSelectedHipsum3(isSelected: any) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'hipsum3')
				: _.without(this.state.flavors, 'hipsum3'),
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
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'hipsum')}
						name='interactive-checkboxes'
						onSelect={this.handleSelectedHipsum}
						style={style}
					>
						<CheckboxLabeled.Label>Salted Caramel</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'hipsum2')}
						name='interactive-checkboxes'
						onSelect={this.handleSelectedHipsum2}
						style={style}
					>
						<CheckboxLabeled.Label>
							Mint chocolate chip (the best)
						</CheckboxLabeled.Label>
					</CheckboxLabeled>
				</span>
			</section>
		);
	},
});
