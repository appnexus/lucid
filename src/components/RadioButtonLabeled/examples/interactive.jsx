import React from 'react';
import { RadioButtonLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
};

export default React.createClass({
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

	handleSelectedHipsum() {
		this.setState({
			flavor: 'hipsum',
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
					<RadioButtonLabeled
							isSelected={this.state.flavor === 'hipsum'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedHipsum}
							style={style}
					>
						<RadioButtonLabeled.Label>Polaroid four dollar toast bespoke succulents. Kickstarter truffaut PBR&B fashion axe, lyft actually viral everyday carry iPhone tote bag mumblecore umami. Skateboard you probably haven't heard of them before they sold out, edison bulb paleo poutine jianbing blue bottle mixtape. Normcore farm-to-table coloring book cliche before they sold out. Roof party authentic hoodie paleo next level, bicycle rights selvage you probably haven't heard of them leggings venmo etsy cronut williamsburg. Dreamcatcher vice gastropub austin fam. Actually subway tile kickstarter, messenger bag shabby chic activated charcoal lomo.</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
				</span>
			</section>
		);
	},
});
