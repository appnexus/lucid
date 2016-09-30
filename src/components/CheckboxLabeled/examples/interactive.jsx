import _ from 'lodash';
import React from 'react';
import { CheckboxLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
};

export default React.createClass({
	getInitialState() {
		return {
			flavors: [],
		};
	},

	handleSelectedChocolate(isSelected) {
		this.setState({
			flavors: isSelected
					? _.concat(this.state.flavors, 'chocolate')
					: _.without(this.state.flavors, 'chocolate'),
		});
	},

	handleSelectedStrawberry(isSelected) {
		this.setState({
			flavors: isSelected
					? _.concat(this.state.flavors, 'strawberry')
					: _.without(this.state.flavors, 'strawberry'),
		});
	},

	handleSelectedVanilla(isSelected) {
		this.setState({
			flavors: isSelected
					? _.concat(this.state.flavors, 'vanilla')
					: _.without(this.state.flavors, 'vanilla'),
		});
	},

	handleSelectedHipsum(isSelected) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'hipsum')
				: _.without(this.state.flavors, 'hipsum'),
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
					<CheckboxLabeled
							isSelected={_.includes(this.state.flavors, 'hipsum')}
							name='interactive-checkboxes'
							onSelect={this.handleSelectedHipsum}
							style={style}
					>
						<CheckboxLabeled.Label>Polaroid four dollar toast bespoke succulents. Kickstarter truffaut PBR&B fashion axe, lyft actually viral everyday carry iPhone tote bag mumblecore umami. Skateboard you probably haven't heard of them before they sold out, edison bulb paleo poutine jianbing blue bottle mixtape. Normcore farm-to-table coloring book cliche before they sold out. Roof party authentic hoodie paleo next level, bicycle rights selvage you probably haven't heard of them leggings venmo etsy cronut williamsburg. Dreamcatcher vice gastropub austin fam. Actually subway tile kickstarter, messenger bag shabby chic activated charcoal lomo.</CheckboxLabeled.Label>
					</CheckboxLabeled>
				</span>
			</section>
		);
	},
});
