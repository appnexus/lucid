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

	handleSelectedHipsum() {
		this.setState({
			flavor: 'hipsum',
		});
	},

	handleSelectedHipsum2() {
		this.setState({
			flavor: 'hipsum2',
		});
	},

	handleSelectedHipsum3() {
		this.setState({
			flavor: 'hipsum3',
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
						name="interactive-radio-buttons"
						onSelect={this.handleSelectedVanilla}
						style={style}
					>
						<RadioButtonLabeled.Label>Vanilla</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
						isSelected={this.state.flavor === 'chocolate'}
						name="interactive-radio-buttons"
						onSelect={this.handleSelectedChocolate}
						style={style}
					>
						<RadioButtonLabeled.Label>Chocolate</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
						isSelected={this.state.flavor === 'strawberry'}
						name="interactive-radio-buttons"
						onSelect={this.handleSelectedStrawberry}
						style={style}
					>
						<RadioButtonLabeled.Label>Strawberry</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
						isSelected={this.state.flavor === 'hipsum'}
						name="interactive-radio-buttons"
						onSelect={this.handleSelectedHipsum}
						style={style}
					>
						<RadioButtonLabeled.Label>
							Polaroid four dollar toast bespoke succulents. Kickstarter truffaut PBR&B fashion axe, lyft actually viral everyday carry iPhone tote bag mumblecore umami. Skateboard you probably haven't heard of them before they sold out, edison bulb paleo poutine jianbing blue bottle mixtape. Normcore farm-to-table coloring book cliche before they sold out. Roof party authentic hoodie paleo next level, bicycle rights selvage you probably haven't heard of them leggings venmo etsy cronut williamsburg. Dreamcatcher vice gastropub austin fam. Actually subway tile kickstarter, messenger bag shabby chic activated charcoal lomo.
						</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
						isSelected={this.state.flavor === 'hipsum2'}
						name="interactive-radio-buttons"
						onSelect={this.handleSelectedHipsum2}
						style={style}
					>
						<RadioButtonLabeled.Label>
							Unicorn helvetica glossier pop-up letterpress snackwave raw denim. Lomo blog tattooed helvetica seitan DIY. Tbh kombucha shabby chic cornhole, microdosing seitan snackwave gastropub celiac. Biodiesel 90's fixie drinking vinegar literally unicorn readymade fap, vape wolf direct trade kickstarter pickled disrupt fashion axe. Heirloom subway tile hell of, austin portland meditation PBR&B tacos raclette. Prism fanny pack banh mi trust fund unicorn, thundercats chicharrones salvia pour-over VHS. Distillery organic pork belly squid.
						</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled
						isSelected={this.state.flavor === 'hipsum3'}
						name="interactive-radio-buttons"
						onSelect={this.handleSelectedHipsum3}
						style={style}
					>
						<RadioButtonLabeled.Label>
							Heirloom keffiyeh schlitz cray. Keytar tumblr dreamcatcher art party polaroid, sriracha etsy pinterest typewriter. IPhone ugh williamsburg man bun waistcoat literally paleo direct trade. Taxidermy cold-pressed pabst green juice, freegan tumblr post-ironic everyday carry disrupt distillery. Hell of lumbersexual cliche, whatever tilde raclette pop-up blue bottle skateboard butcher meditation four dollar toast tattooed health goth pinterest. Poutine polaroid YOLO, biodiesel chambray gentrify microdosing kickstarter bushwick humblebrag yr cred intelligentsia you probably haven't heard of them. Blog meditation locavore tousled, edison bulb cronut occupy +1 you probably haven't heard of them echo park distillery chambray.
						</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
				</span>
			</section>
		);
	},
});
