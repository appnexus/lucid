import React from 'react';
import createClass from 'create-react-class';
import { Sidebar } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isExpanded: false,
		};
	},

	handleToggle() {
		this.setState({ isExpanded: !this.state.isExpanded });
	},

	render() {
		return (
			<section>
				<button onClick={this.handleToggle}>toggle</button>
				<Sidebar
					isExpanded={this.state.isExpanded}
					onToggle={this.handleToggle}
				>
					<Sidebar.Bar>
						Paleo williamsburg retro, mumblecore deserunt typewriter magna raw denim taxidermy. Quinoa incididunt hoodie, ea synth four loko everyday carry lomo vice humblebrag forage assumenda ad small batch reprehenderit.
					</Sidebar.Bar>
					<Sidebar.Primary>
						Migas esse paleo nesciunt, mollit velit franzen tempor YOLO iPhone thundercats. Keytar tilde raw denim shabby chic quinoa typewriter. Shabby chic tousled labore jean shorts, veniam XOXO mustache. Marfa dreamcatcher hammock cupidatat kitsch, selvage cornhole dolor. Odio salvia slow-carb hammock XOXO, nulla normcore jean shorts magna master cleanse tote bag ea. Pitchfork marfa tote bag shoreditch, retro selvage tempor 90's kogi adipisicing asymmetrical tousled. Pork belly asymmetrical nesciunt, keytar jean shorts mlkshk scenester sriracha man bun placeat tacos post-ironic officia art party.
					</Sidebar.Primary>
				</Sidebar>
			</section>
		);
	},
});
