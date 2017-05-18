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

	handleSelectedHipsum2(isSelected) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'hipsum2')
				: _.without(this.state.flavors, 'hipsum2'),
		});
	},

	handleSelectedHipsum3(isSelected) {
		this.setState({
			flavors: isSelected
				? _.concat(this.state.flavors, 'hipsum3')
				: _.without(this.state.flavors, 'hipsum3'),
		});
	},

	render() {
		return (
			<section>
				<span>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'vanilla')}
						name="interactive-checkboxes"
						onSelect={this.handleSelectedVanilla}
						style={style}
					>
						<CheckboxLabeled.Label>Vanilla</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'chocolate')}
						name="interactive-checkboxes"
						onSelect={this.handleSelectedChocolate}
						style={style}
					>
						<CheckboxLabeled.Label>Chocolate</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'strawberry')}
						name="interactive-checkboxes"
						onSelect={this.handleSelectedStrawberry}
						style={style}
					>
						<CheckboxLabeled.Label>Strawberry</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'hipsum')}
						name="interactive-checkboxes"
						onSelect={this.handleSelectedHipsum}
						style={style}
					>
						<CheckboxLabeled.Label>
							Polaroid four dollar toast bespoke succulents. Kickstarter truffaut PBR&B fashion axe, lyft actually viral everyday carry iPhone tote bag mumblecore umami. Skateboard you probably haven't heard of them before they sold out, edison bulb paleo poutine jianbing blue bottle mixtape. Normcore farm-to-table coloring book cliche before they sold out. Roof party authentic hoodie paleo next level, bicycle rights selvage you probably haven't heard of them leggings venmo etsy cronut williamsburg. Dreamcatcher vice gastropub austin fam. Actually subway tile kickstarter, messenger bag shabby chic activated charcoal lomo.
						</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'hipsum2')}
						name="interactive-checkboxes"
						onSelect={this.handleSelectedHipsum2}
						style={style}
					>
						<CheckboxLabeled.Label>
							Unicorn helvetica glossier pop-up letterpress snackwave raw denim. Lomo blog tattooed helvetica seitan DIY. Tbh kombucha shabby chic cornhole, microdosing seitan snackwave gastropub celiac. Biodiesel 90's fixie drinking vinegar literally unicorn readymade fap, vape wolf direct trade kickstarter pickled disrupt fashion axe. Heirloom subway tile hell of, austin portland meditation PBR&B tacos raclette. Prism fanny pack banh mi trust fund unicorn, thundercats chicharrones salvia pour-over VHS. Distillery organic pork belly squid.
						</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled
						isSelected={_.includes(this.state.flavors, 'hipsum3')}
						name="interactive-checkboxes"
						onSelect={this.handleSelectedHipsum3}
						style={style}
					>
						<CheckboxLabeled.Label>
							Heirloom keffiyeh schlitz cray. Keytar tumblr dreamcatcher art party polaroid, sriracha etsy pinterest typewriter. IPhone ugh williamsburg man bun waistcoat literally paleo direct trade. Taxidermy cold-pressed pabst green juice, freegan tumblr post-ironic everyday carry disrupt distillery. Hell of lumbersexual cliche, whatever tilde raclette pop-up blue bottle skateboard butcher meditation four dollar toast tattooed health goth pinterest. Poutine polaroid YOLO, biodiesel chambray gentrify microdosing kickstarter bushwick humblebrag yr cred intelligentsia you probably haven't heard of them. Blog meditation locavore tousled, edison bulb cronut occupy +1 you probably haven't heard of them echo park distillery chambray.
						</CheckboxLabeled.Label>
					</CheckboxLabeled>
				</span>
			</section>
		);
	},
});
